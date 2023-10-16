import { authors, books, genres, BOOKS_PER_PAGE } from './data.js';

// THIS CODE DEALS WITH HOW THE BOOKS ARE DISPLAYED IN THE DOM

class BookDisplayManager {
    constructor(DomAppend, authors) {
      this.DomAppend = DomAppend;
      this.authors = authors;
    }
  
    createBookElement(book) {
      const element = document.createElement('button');
      element.classList = 'preview';
      element.setAttribute('data-preview', book.id);
      element.innerHTML = /* html */
        `<img class="preview__image" src="${book.image}" />
         <div class="preview__info">
             <h3 class="preview__title">${book.title}</h3>
             <div class="preview__author">${this.authors[book.author]}</div>
         </div>`;
      return element;
    }
  
    displayBooks(bookList, startIndex, endIndex) {
      const fragment = document.createDocumentFragment();
  
      for (let i = startIndex; i < endIndex && i < bookList.length; i++) {
        const book = bookList[i];
        const element = this.createBookElement(book);
        fragment.appendChild(element);
      }
  
      this.DomAppend.appendChild(fragment);
    }
  }
  
export {BookDisplayManager}