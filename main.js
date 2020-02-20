// Improting pages
import LoginPage from "./pages/loginPage.js"


// Importing services
import spaService from "./services/spa.js"

// Importing services
import _categoryService from "./services/categoryService.js"
import authService from "./services/loginService.js";



// Declaring and initiating pages
let loginPage = new LoginPage();

// Initiating services
spaService.init();
authService.init();

loginPage.template();
_categoryService.read();

// onclick handlers
window.pageChange = () => spaService.pageChange();