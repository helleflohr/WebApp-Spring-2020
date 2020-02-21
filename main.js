// Improting pages
import LoginPage from "./pages/loginPage.js"
import AddPredefinedPage from "./pages/addPredefinedPage.js"
import HomeWarningPage from "./pages/homeWarning.js"


// Importing services
import spaService from "./services/spa.js"
import _categoryService from "./services/categoryService.js"
import authService from "./services/loginService.js";




// Declaring and initiating pages
let loginPage = new LoginPage();
let addPredefinedPage = new AddPredefinedPage();
let homeWarning = new HomeWarningPage();


// Initiating services
authService.init();
spaService.init();




_categoryService.read();


loginPage.template();
homeWarning.template();
addPredefinedPage.template();

// onclick handlers
window.pageChange = () => spaService.pageChange();
window.createQuestion = () => addPredefinedPage.createQuestion();