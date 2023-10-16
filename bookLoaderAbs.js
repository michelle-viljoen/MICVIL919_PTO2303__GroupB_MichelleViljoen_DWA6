import { authors, books, genres, BOOKS_PER_PAGE } from './data.js';

 class BookLoader {
    constructor(books, dataListButton, dataListItems, displayFunction, increment) {
      this.books = books;
      this.dataListButton = dataListButton;
      this.dataListItems = dataListItems;
      this.displayFunction = displayFunction;
      this.increment = increment;
      this.startIndex = 0;
      this.endIndex = increment;
      this.remainingBooks = books.length - increment;
  
      this.setupButton();
      this.attachEventHandlers();
    }
  
    setupButton() {
      this.updateShowMore();
      this.checkButtonStatus();
    }
  
    updateShowMore() {
      this.dataListButton.innerText = `Show more (${this.remainingBooks})`;
    }
  
    checkButtonStatus() {
      this.dataListButton.disabled = this.remainingBooks <= 0;
    }
  
    loadMoreBooks() {
        this.startIndex = this.endIndex;
        this.endIndex += this.increment;
    
        this.displayFunction(this.books, this.startIndex, this.endIndex);
    
        if (this.endIndex >= this.books.length) {
          this.remainingBooks = 0;
          this.updateShowMore();
          this.dataListButton.disabled = true;
        } else {
          this.remainingBooks = this.books.length - this.endIndex;
          this.updateShowMore();
          this.checkButtonStatus();
        }
    }
  
    attachEventHandlers() {
      this.dataListButton.addEventListener('click', () => this.loadMoreBooks());
    }
  }

  export {BookLoader}