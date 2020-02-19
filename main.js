// Improting pages
// import LoginPage from "./pages/login.js";

// Importing services
import spaService from "./Services/spa.js"

// Importing services
import _categoryService from "./Services/categoryService.js"

// Declaring and initiating pages

// Initiating services
spaService.init();

// onclick handlers
window.pageChange = () => spaService.pageChange();

_categoryService.read();