// Improting pages
import LoginPage from "./pages/loginPage.js"
import AddPredefinedPage from "./pages/addPredefinedPage.js"
import HomeWarningPage from "./pages/homeWarning.js"
import AddQuestions from "./pages/addQuestions.js"


// Importing services
import spaService from "./services/spa.js"
import _categoryService from "./services/categoryService.js"
import authService from "./services/loginService.js";




// Declaring and initiating pages
let loginPage = new LoginPage();
let addPredefinedPage = new AddPredefinedPage();
let homeWarning = new HomeWarningPage();
let addQuestions = new AddQuestions();


// Initiating services
authService.init();
spaService.init();




_categoryService.read();


loginPage.template();
homeWarning.template();
addPredefinedPage.template();
addQuestions.template();

// onclick handlers
window.pageChange = () => spaService.pageChange();
window.createQuestion = () => addPredefinedPage.createQuestion();
window.createNewQuestion = () => addQuestions.createNewQuestion();