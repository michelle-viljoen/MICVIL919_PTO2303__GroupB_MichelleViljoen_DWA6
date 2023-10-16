import { authors, books, genres, BOOKS_PER_PAGE } from './data.js';
  
// THIS BRINGS UP MORE DETAILS ABOUT EACH BOOK WHEN AN INDIVIDUAL BOOK IS CLICKED ON

 class BookDetailsHandler {
    constructor(dataListItems, dataListActive, dataListImage, dataListBlur, dataListTitle, dataListSubtitle, dataListDescription, dataListCancel, books, authors) {
      this.dataListItems = dataListItems;
      this.dataListActive = dataListActive;
      this.dataListImage = dataListImage;
      this.dataListBlur = dataListBlur;
      this.dataListTitle = dataListTitle;
      this.dataListSubtitle = dataListSubtitle;
      this.dataListDescription = dataListDescription;
      this.dataListCancel = dataListCancel;
      this.books = books;
      this.authors = authors;
  
      this.attachEventHandlers();
    }
  
    handleBookClick(event) {
      if (event.target.classList.contains('preview')) {
        const previewId = event.target.getAttribute('data-preview');
        const active = this.books.find((singleBook) => singleBook.id === previewId);
  
        if (active) {
          this.dataListActive.open = true;
          this.dataListImage.src = active.image;
          this.dataListBlur.src = active.image;
          this.dataListTitle.innerText = active.title;
          this.dataListSubtitle.innerText = `${this.authors[active.author]} (${new Date(active.published).getFullYear()})`;
          this.dataListDescription.innerText = active.description;
  
          this.dataListCancel.addEventListener('click', () => (this.dataListActive.open = false));
        }
      }
    }
  
    attachEventHandlers() {
      this.dataListItems.addEventListener('click', (event) => this.handleBookClick(event));
    }
  }

  export { BookDetailsHandler }

