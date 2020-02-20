// Improting pages
import LoginPage from "./pages/loginPage.js"
import AddPredefinedPage from "./pages/addPredefinedPage.js"


// Importing services
import spaService from "./services/spa.js"

// Importing services
import _categoryService from "./services/categoryService.js"
import authService from "./services/loginService.js";



// Declaring and initiating pages
let loginPage = new LoginPage();
let addPredefinedPage = new AddPredefinedPage();

// Initiating services
authService.init();
spaService.init();



loginPage.template();
console.log(loginPage)
_categoryService.read();

addPredefinedPage.template();

// onclick handlers
window.pageChange = () => spaService.pageChange();