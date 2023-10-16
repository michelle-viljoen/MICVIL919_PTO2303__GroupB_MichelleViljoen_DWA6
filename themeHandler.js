import { authors, books, genres, BOOKS_PER_PAGE } from './data.js';

// THIS CLASS ALLOWS THE CHANGING OF DISPLAY THEMES TO OCCUR SUCCESSFULLY

class ThemeHandler {
    constructor(style, themeChoice, settingsForm) {
      this.style = style;
      this.themeChoice = themeChoice;
      this.settingsForm = settingsForm;
  
      this.setupInitialTheme();
      this.attachEventHandlers();
    }
  
    setupInitialTheme() {
      const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const chooseTheme = darkTheme ? 'night' : 'day';
      this.applyTheme(chooseTheme);
    }
  
    applyTheme(theme) {
      document.documentElement.style.setProperty('--color-dark', this.style[theme].dark);
      document.documentElement.style.setProperty('--color-light', this.style[theme].light);
    }
  
    handleThemeChange() {
      const theme = this.themeChoice.value;
      this.applyTheme(theme);
      document.querySelector('[data-settings-overlay]').close();
    }
  
    attachEventHandlers() {
      this.settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.handleThemeChange();
      });
    }
  }

  export {ThemeHandler}