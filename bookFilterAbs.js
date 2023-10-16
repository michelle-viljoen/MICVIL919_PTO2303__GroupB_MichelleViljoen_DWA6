import { authors, books, genres, BOOKS_PER_PAGE } from './data.js';

// THIS DEALS WITH DISPLAYING THE FILTERED BOOKS ON THE PAGE

class BookFilter {
    constructor(dataSearchForm, dataListItems, dataHeaderOverlay, dataSearchCancel, dataHeaderSearch, dataListMessage, books, authors, genres) {
      this.dataSearchForm = dataSearchForm;
      this.dataListItems = dataListItems;
      this.dataHeaderOverlay = dataHeaderOverlay;
      this.dataSearchCancel = dataSearchCancel;
      this.dataHeaderSearch = dataHeaderSearch;
      this.dataListMessage = dataListMessage;
      this.books = books;
      this.authors = authors;
      this.genres = genres;
  
      this.attachEventHandlers();
    }
  
    filterBooks(books, filters) {
      const filteredBooks = this.books.filter((book) => {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || this.authors[book.author].toLowerCase() === filters.author.toLowerCase();
        const genreMatch = filters.genre === 'any' || book.genres.includes(Object.keys(this.genres).find(key => this.genres[key].toLowerCase() === filters.genre.toLowerCase()));

        return titleMatch && authorMatch && genreMatch;
      
      });

      this.displayFilteredBooks(filteredBooks)
      
    }
  
    displayFilteredBooks(filteredBooks) {
        console.log(filteredBooks.length)
      if (filteredBooks.length === 0) {
        this.dataListItems.innerHTML = ''
        const noMatchFound = document.querySelector('[data-list-message]');
        noMatchFound.style.display = 'block';
        this.dataHeaderOverlay.close(); // Close the overlay when there are no matches
      } else {
        this.dataHeaderOverlay.close();
        this.displayBooksList(filteredBooks);
      }
    }
  
    displayBooksList(books) {
      const bookFragment = document.createDocumentFragment();
      for (const book of books) {
        const elementNew = document.createElement('button');
        elementNew.classList = 'preview';
        elementNew.setAttribute('data-preview', book.id);
        elementNew.innerHTML = `
          <img class="preview__image" src="${book.image}" />
          <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${this.authors[book.author]}</div>
          </div>`;
        bookFragment.appendChild(elementNew);
      }
      this.dataListItems.innerHTML = ''; // Clear the existing book list
      this.dataListItems.appendChild(bookFragment);
    
    }
  
    attachEventHandlers() {
      this.dataSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = event.target.querySelector('[data-search-title]').value.toLowerCase();
        const author = event.target.querySelector('[data-search-authors]').value.toLowerCase();
        const genre = event.target.querySelector('[data-search-genres]').value.toLowerCase();
  
        const filters = { title, author, genre };
        const filteredBooks = this.filterBooks(books, filters);
        this.displayFilteredBooks(filteredBooks);
      });
  
      this.dataHeaderSearch.addEventListener('click', () => this.dataHeaderOverlay.show());
      this.dataSearchCancel.addEventListener('click', () => this.dataHeaderOverlay.close());
    }
  }
  
  export { BookFilter };
  