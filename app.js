var Library = function() {};

Library.prototype.myBookArr = new Array();

Library.prototype.addBook = function(book) {
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].title === book.title) {
      alert(this.myBookArr[i].title +" has not been successfully added to the library because it already exists.");
      return false;
    }
  }
    this.myBookArr.push(book);
    alert(this.myBookArr[i].title + " has been successfully added to the library.");
    return true;
};

Library.prototype.removeBookByTitle = function(title) {
    for(i = 0; i < this.myBookArr.length; i++) {
      if(this.myBookArr[i].title === title) {
        this.myBookArr.splice(i, 1);
          alert(title + " has been removed from the library.");
            return true;
      }
    }
    alert(title + " does not match any books in the library.");
      return false;
  };

Library.prototype.removeBookByAuthor = function(authorName) {
  for (i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].authorName === authorName) {
        this.myBookArr.splice(i, 1);
          alert(authorName + " has been removed as an author from the library.");
            return true;
      }
    }
    alert(authorName + " does not match any authors in the library.");
      return false;
  };

Library.prototype.getRandomBook = function() {
  var length = this.myBookArr.length;
    return length > 0 ? this.myBookArr[Math.floor(Math.random() * length)] : null;
};

Library.prototype.getBookByTitle = function(title) {
  var selection = [];
    for (i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title === title) {
        selection.push(this.myBookArr[i]);
    }
  }
  return selection;
};

Library.prototype.getBooksByAuthor = function(authorName) {
  var selection = [];
    var reg = new RegExp(authorName, "gi");
      for (i = 0; i < this.myBookArr.length; i++) {
        if(this.myBookArr[i].authorName.match(reg)) {
          selection.push(this.myBookArr[i]);
    }
  }
  return selection;
};

Library.prototype.addBooks = function(books) {
    counter = 0;
      for (var i in books) {

        if (this.addBook(books[i])) {
          counter++;
        }
     }
     return counter;
};

Library.prototype.getAuthors = function() {
  var authorNameArr = [];
    for(i = 0; i < this.myBookArr.length; i++) 
      loop1:
  {
    for(x = 0; x < authorNameArr.length; x++) {
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
   return length > 0 ? this.myBookArr[Math.floor(Math.random() * length)].authorName : null;

};

var Book = function(oArgs){

  this.title = oArgs.title;
  this.authorName = oArgs.authorName;
  this.numPages = oArgs.numPages;
  this.date = new Date(oArgs.date);  
};

window.gLib = new Library();
window.gLibDenver = new Library("Denver");


window.gBookOne = new Book(oArgs = {title: "It", authorName: "Steven King", numPages: 390, date: "03/12/1987"})
window.gBookTwo = new Book(oArgs = {title: "Where the Wild Things Are", authorName: "Maurice Sendak", numPages: 40, date: "04/09/1969"})
window.gBookThree = new Book(oArgs = {title: "The Giving Tree", authorName: "Shel Silverstein", numPages: 64, date: "10/07/1964"})
window.gBookFour = new Book(oArgs = {title: "The Alchemist", authorName: "Paolo Coelho", numPages: 208, date: "06/29/1988"})
window.gBookFive = new Book(oArgs = {title: "The Four Agreements", authorName: "Miguel Ruiz", numPages: 192, date: "09/10/1997"})
window.gBookSix = new Book(oArgs = {title: "Walden", authorName: "Henry Thoreau", numPages: 221, date: "06/01/1942"})
window.gBookSeven = new Book(oArgs = {title: "Through Painted Deserts", authorName: "Donald Miller", numPages: 256, date: "03/10/2005"})
window.gBookEight = new Book(oArgs = {title: "Blue Like Jazz", authorName: "Donald Miller", numPages: 242, date: "10/23/2003"})
window.gBookNine = new Book(oArgs = {title: "Love Does", authorName: "Bob Goff", numPages: 218, date: "10/12/2012"})
window.gBookTen = new Book(oArgs = {title: "Zen and the Art of Motorcycle Maintenance", authorName: "Robert Pirsig", numPages: 418, date: "12/10/1974"})
window.gBookEleven = new Book(oArgs = {title: "The Catcher in the Rye", authorName: "J.D. Salinger", numPages: 214, date: "05/19/1945"})
window.gBookTwelve = new Book(oArgs = {title: "Let My People Go Surfing", authorName: "Yvon Chouinard", numPages: 259, date: "06/15/2005"})
