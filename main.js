// Improting pages
import LoginPage from "./pages/loginPage.js"
import AddPredefinedPage from "./pages/addPredefinedPage.js"
import HomeWarningPage from "./pages/homeWarning.js"
import AddQuestions from "./pages/addQuestions.js"
import CreatePartyPage from "./pages/createPartyPage.js"


// Importing services
import spaService from "./services/spa.js"
import _categoryService from "./services/categoryService.js"
import authService from "./services/loginService.js";
import CreatePartyPage from "./pages/createPartyPage.js"




// Declaring and initiating pages
let loginPage = new LoginPage();
let addPredefinedPage = new AddPredefinedPage();
let homeWarning = new HomeWarningPage();
let addQuestions = new AddQuestions();
let createPartyPage = new CreatePartyPage();


// loginPage.template();
// homeWarning.template();
// addPredefinedPage.template();
// addQuestions.template();
// createPartyPage.template();



// Initiating services
authService.init();
spaService.init();




_categoryService.read();


// onclick handlers
window.pageChange = () => spaService.pageChange();
window.createQuestion = () => addPredefinedPage.createQuestion();
window.createNewQuestion = () => addQuestions.createNewQuestion();
window.checkedCategory = (id) => addPredefinedPage.checkedOrNot(id)