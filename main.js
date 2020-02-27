// Improting pages
import LoginPage from "./pages/loginPage.js"
import AddPredefinedPage from "./pages/addPredefinedPage.js"
import HomeWarningPage from "./pages/homeWarning.js"
import AddQuestions from "./pages/addQuestions.js"
import CreatePartyPage from "./pages/createPartyPage.js"
import AddPlayersPage from "./pages/addPlayersPage.js"
import YouAreReadyPage from "./pages/youAreReadyPage.js"
import SettingsPage from "./pages/settingsPage.js"
import GamePage from "./pages/gamePage.js"

// Importing services
import spaService from "./services/spa.js"
import _categoryService from "./services/categoryService.js"
import authService from "./services/loginService.js";
import createPartyService from "./../services/createPartyService.js"
import joinPartyService from "./../services/joinPartyService.js"



// Declaring and initiating pages
let loginPage = new LoginPage();
let addPredefinedPage = new AddPredefinedPage();
let homeWarning = new HomeWarningPage();
let addQuestions = new AddQuestions();
let createPartyPage = new CreatePartyPage();
let addPlayersPage = new AddPlayersPage();
let youAreReadyPage = new YouAreReadyPage();
let settingsPage = new SettingsPage();
let gamePage = new GamePage();

// Initiating services
authService.init();
spaService.init();

// Currently not in use
_categoryService.read();


// onclick handlers
window.pageChange = () => spaService.pageChange();
window.createQuestion = () => addPredefinedPage.createQuestion();
// window.checkedCategory = (id) => addPredefinedPage.checkedOrNot(id)
window.createNewQuestion = () => addQuestions.createNewQuestion();
window.navigateTo = (hash) => spaService.navigateTo(hash);
window.addAnotherPlayer = (whereToAdd) => addPlayersPage.addAnotherPlayer(whereToAdd);
window.joinParty = (hash) => joinPartyService.joinParty(hash);
window.createParty = (hash) => createPartyService.createParty(hash);
window.addPlayers = () => joinPartyService.addPlayers();
window.showRules = () => gamePage.showRules();
window.showAdd = () => gamePage.showAdd();
window.logout = () => authService.logout();
window.addContentToPartyArr = () => addQuestions.addContentToPartyArr();
window.checkbox = (id, question) => addQuestions.checkbox(id, question);
window.getThePartyId = () => settingsPage.getThePartyId();
window.basket = () => addQuestions.barsket();
window.createAddedQestionsList = ()=> addQuestions.createAddedQestionsList();
window.highlightNumber = ()=> addQuestions.highlightNumber();
// window.chekRangeSlider =()=> settingsPage.chekRangeSlider();

let rangeSlider = document.getElementById("myRange");
let rangeBullet = document.getElementById("demo");

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue(){
    rangeBullet.innerHTML = rangeslider.value;
    console.log(rangeslider.value)
    let bulletPositon = rangeSlider.value / rangeSlider.max;
    rangeBullet.style.left = bulletPositon * 578 +  "px";
}