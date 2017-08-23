﻿
var Library = function(newInstance) {
  this.myBookArr = new Array();
  this.storageArr = new Array();
};

Library.prototype.init = function() {
  localStorage.clear();
  this._populateBooks();
  this._bindEvents();
};

Library.prototype._populateBooks = function() {
  this.addBooks([gBookOne, gBookTwo, gBookThree, gBookFour, gBookFive, gBookSix, gBookSeven, gBookEight, gBookNine, gBookTen, gBookEleven, gBookTwelve]);
};

Library.prototype._bindEvents = function() {
  var bookInputs = "#title-input, #author-input, #page-input, #date-input";
  $("button.add-book-btn").on("click", $.proxy(this._handleAddBook, this));
  $("button.rem-book-tit-btn").on("click", $.proxy(this._handleRemBookTit, this));
  $("button.rem-book-auth-btn").on("click", $.proxy(this._handleRemBookAuth, this));
  $("button.rand-book").on("click", $.proxy(this._handleGetRandBook, this));
  $("button.get-tit-btn").on("click", $.proxy(this._handleGetBookByTit, this));
  $("button.get-auth-btn").on("click", $.proxy(this._handleGetBooksByAuth, this));
  $("button.add-books-btn").on("click", $.proxy(this._handleAddBooks, this));
  $("button.get-auths").on("click", $.proxy(this._handleGetAuths, this));
  $("button.rand-auth").on("click", $.proxy(this._handleGetRandAuths, this));
};

Library.prototype._checkLocalStorage = function() {
  if (typeof(Storage) !== "undefined") {
    return JSON.parse(localStorage.getItem("myBookArr"));
  } else {
    return false;
  }
};

Library.prototype._handleRemBookTit = function() {
  var title = $("#title-input").val();
  this.removeBookByTitle(title);
  return true;
};

Library.prototype._handleRemBookAuth = function() {
  var authorName = $("#author-input").val();
  this.removeBookByAuthor(authorName);
};

Library.prototype._handleGetRandBook = function() {
  var randomBook = this.getRandomBook();
  console.log(randomBook);
  $("#res-inp").empty()
  $("#res-inp").append(
    "<tr>",
    "<td>" + randomBook.title + "</td>",
    "<td>" + randomBook.authorName + "</td>",
    "<td>" + randomBook.numPages + "</td>",
    "<td>" + randomBook.date + "</td>",
    "</tr>"
  ).css('color', '#045BB3');
  return true;
};

Library.prototype._handleGetBookByTit = function() {
  var title = $("#search-inp").val();
  var find = this.getBookByTitle(title);
  $("#res-inp").empty();
  $.each(find, function(index, value) {
    $("#res-inp").append(
      "<tr>",
      "<td>" + value.title + "</td>",
      "<td>" + value.authorName + "</td>",
      "<td>" + value.numPages + "</td>",
      "<td>" + value.date + "</td>",
      "</tr>"
    ).css('color', '#B30404');
    return true;
  });
};

Library.prototype._handleGetBooksByAuth = function() {
  var authorName = $("#search-inp").val();
  var find = this.getBooksByAuthor(authorName);
  $("#res-inp").empty();
  $.each(find, function(index, value) {
    $("#res-inp").append(
      "<tr>",
      "<td>" + value.title + "</td>",
      "<td>" + value.authorName + "</td>",
      "<td>" + value.numPages + "</td>",
      "<td>" + value.date + "</td>",
      "</tr>"
    ).css('color', '#EEDC38');
    return true;
  });
};

Library.prototype._handleAddBook = function(oArgs) {
  var newBook = new Book(oArgs);
  newBook.title = $("#title-input").val();
  newBook.authorName = $("#author-input").val();
  newBook.numPages = $("#page-input").val();
  newBook.date = $("#date-input").val();
  this.addBook(newBook);
};

Library.prototype._handleAddBooks = function(newBookArr) {
  newBookArr = [];
  $("ul.add-books-ul li").each(function() {
    var newBookObj = buildBookObj($(this));
    newBookArr.push(newBookObj);
  });

  this.addBooks(newBookArr);
}

function buildBookObj(jLi) {
  return {
    title: $(jLi).find("input:nth-child(1)").val(),
    authorName: $(jLi).find("input:nth-child(2)").val(),
    numPages: $(jLi).find("input:nth-child(3)").val(),
    date: $(jLi).find("input:nth-child(4)").val(),
  };
};

Library.prototype._handleGetAuths = function() {
  var getAuths = this.getAuthors();
  $("#res-inp").empty();
  $("#res-inp").append(
    "<tr>",
    "<td>" + "</td>",
    "<td>" + getAuths + "</td>",
    "<td>" + "</td>",
    "<td>" + "</td>",
    "</tr>"
  ).css('color', '#5BB304');
  return true;
};

Library.prototype._handleGetRandAuths = function() {
  var randomAuth = this.getRandomAuthorName();
  $("#res-inp").empty();
  $("#res-inp").append(
    "<tr>",
    "<td>" + "</td>",
    "<td>" + randomAuth.authorName + "</td>",
    "<td>" + "</td>",
    "<td>" + "</td>",
    "</tr>"
  ).css('color', '#5B3285');
  return true;
};


window.gLib = new Library();

Library.prototype.stageLibrary = function() {
  $("#input-table").empty();
  $.each(this.myBookArr, function(index, value) {
    $("#input-table").append(
      "<tr>",
      "<td>" + value.title + "</td>",
      "<td>" + value.authorName + "</td>",
      "<td>" + value.numPages + "</td>",
      "<td>" + value.date + "</td>",
      "</tr>"
    ).css('color', 'black');
    return true;
  });
}

Library.prototype.addBook = function(book) {
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].title === book.title) {
      //alert(this.myBookArr[i].title +" has not been successfully added to the library because it already exists.");
      return false;
    }
  }
  this.myBookArr.push(book);
  //alert(this.myBookArr[i].title + " has been successfully added to the library.");
  this.setStorage();
  this.stageLibrary();
  console.log(book.title + " has been added");
  return true;
};

Library.prototype.removeBookByTitle = function(title) {
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase()) > -1 && title) { //title.toLowerCase.indexOf(title.toLowerCase()) > -1 && title) {
      this.myBookArr.splice(i, 1);
      alert(title + " has been removed from the library.");
      this.setStorage();
      console.log(title + " has been removed");
      this.stageLibrary();
      return true;
    }
  }
  alert(title + " does not match any books in the library.");
  return false;
};

Library.prototype.removeBookByAuthor = function(authorName) {
  var check = false;
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].authorName.toLowerCase().indexOf(authorName.toLowerCase()) > -1 && authorName) {
      this.myBookArr.splice(i, 1);
      check = true;
      alert(authorName + " has been removed as an author from the library.");
      console.log(authorName + " has been removed");
      this.setStorage();
      this.stageLibrary();
    }
  }
  //    alert(authorName + " does not match any authors in the library.");
  return false;
};

Library.prototype.getRandomBook = function() {
  var length = this.myBookArr.length;
  return length > 0 ? this.myBookArr[Math.floor(Math.random() * length)] : null;
};

Library.prototype.getBookByTitle = function(title) {
  var selection = [];
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase()) > -1 && title) {
      selection.push(this.myBookArr[i]);
    }
  }
  return selection;
};

Library.prototype.getBooksByAuthor = function(authorName) {
  var selection = [];
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].authorName.toLowerCase().indexOf(authorName.toLowerCase()) > -1 && authorName) {
      selection.push(this.myBookArr[i]);
    }
  }
  return selection;
};

Library.prototype.addBooks = function(books) {
  var counter = 0;
  for (var i in books) {

    if (this.addBook(books[i])) {
      counter++;
    }
  }
  return counter;
};

Library.prototype.getAuthors = function() {
  var authorNameArr = [];
  for (i = 0; i < this.myBookArr.length; i++)
    loop1: {
      for (x = 0; x < authorNameArr.length; x++) {
        if (this.myBookArr[i].authorName === authorNameArr[x]) {
          console.log(this.myBookArr[i].authorName);
          break loop1;
        }
      }
      authorNameArr.push(this.myBookArr[i].authorName);
    }
  return authorNameArr;
};

Library.prototype.getRandomAuthorName = function() {
  var length = this.myBookArr.length;
  return length > 0 ? this.myBookArr[Math.floor(Math.random() * length)] : null;

};

var Book = function(oArgs) {

  this.title = oArgs.title;
  this.authorName = oArgs.authorName;
  this.numPages = oArgs.numPages;
  this.date = new Date(oArgs.date);
};

window.gBookOne = new Book({
  title: "Gonzo",
  authorName: "Hunter S. Thompson",
  numPages: 240,
  date: "10/01/2007"
});
window.gBookTwo = new Book({
  title: "On the Road",
  authorName: "Jack Kerouac",
  numPages: 320,
  date: "10/05/1957"
});
window.gBookThree = new Book({
  title: "A Farewell to Arms",
  authorName: "Ernest Hemingway",
  numPages: 355,
  date: "05/07/1929"
});
window.gBookFour = new Book({
  title: "The Alchemist",
  authorName: "Paolo Coelho",
  numPages: 208,
  date: "06/29/1988"
});
window.gBookFive = new Book({
  title: "Fight Club",
  authorName: "Chuck Palahniuk",
  numPages: 208,
  date: "08/17/1996"
});
window.gBookSix = new Book({
  title: "Walden",
  authorName: "Henry Thoreau",
  numPages: 221,
  date: "06/01/1942"
});
window.gBookSeven = new Book({
  title: "The Road",
  authorName: "Cormac McCarthy",
  numPages: 287,
  date: "09/26/2006"
});
window.gBookEight = new Book({
  title: "Blue Like Jazz",
  authorName: "Donald Miller",
  numPages: 242,
  date: "10/23/2003"
});
window.gBookNine = new Book({
  title: "Atlas Shrugged",
  authorName: "Ann Rand",
  numPages: 1168,
  date: "10/10/1957"
});
window.gBookTen = new Book({
  title: "Zen and the Art of Motorcycle Maintenance",
  authorName: "Robert Pirsig",
  numPages: 418,
  date: "12/10/1974"
});
window.gBookEleven = new Book({
  title: "The Catcher in the Rye",
  authorName: "J.D. Salinger",
  numPages: 214,
  date: "05/19/1945"
});
window.gBookTwelve = new Book({
  title: "Let My People Go Surfing",
  authorName: "Yvon Chouinard",
  numPages: 259,
  date: "06/15/2005"
});

Library.prototype.setStorage = function() {
  if (typeof(Storage) !== "undefined") {
    localStorage["myBookArr"] = JSON.stringify(this.myBookArr);
  } else {
    return false;
  }
};

$(document).ready(function() {
  window.gLib.init();
});
