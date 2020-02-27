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
import questionInputService from "./services/questionInputService.js"
import _arrayQuestionService from "./services/arrayQuestionService.js"
import addQuestionToGameService from "./services/addQuestionToGameService.js"
// import SwipeService from ".services/swipeService.js"



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
// SwipeService.init(idOfSwiperContainer);


// Currently not in use
_categoryService.read();


// onclick handlers
window.pageChange = () => spaService.pageChange();
window.createQuestion = () => addPredefinedPage.createQuestion();
window.navigateTo = (hash) => spaService.navigateTo(hash);
window.addAnotherPlayer = (whereToAdd) => addPlayersPage.addAnotherPlayer(whereToAdd);
window.joinParty = (hash) => joinPartyService.joinParty(hash);
window.createParty = (hash) => createPartyService.createParty(hash);
window.addPlayers = () => joinPartyService.addPlayers();
window.showRules = (name) => gamePage.showRules(name);
window.showAdd = () => gamePage.showAdd();
window.logout = () => authService.logout();
window.checkbox = (id) => addQuestions.checkbox(id);
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
window.basket = () => addQuestions.basket();
window.createAddedQuestionsList = () => addQuestionToGameService.createAddedQuestionsList();
window.highlightNumber = () => _arrayQuestionService.highlightNumber();
window.removeFromList = (id) => addQuestions.removeFromList(id);
window.gameInputSettings = (gameId, inputId, whereToPut, preOrNot) => addQuestions.gameInputSettings(gameId, inputId, whereToPut, preOrNot);
window.styleWhichValue = (truthId, dareId) => questionInputService.styleWhichValue(truthId, dareId);
window.createNewQuestion = () => _arrayQuestionService.createNewQuestion();
window.gameName = () => gamePage.gameName();
window.highlightChoosen = (checkboxId) => addPredefinedPage.highlightChoosen(checkboxId);
window.getDataFromQuiz = (number, preOrNot) => questionInputService.getDataFromQuiz(number, preOrNot);




// Swipe
const _C = document.querySelector('#gameContainer'),
    // N = _C.children.length,
    N = 3,
    NF = 30,
    TFN = {
        'linear': function (k) {
            return k
        },
        'ease-in': function (k, e = 1.675) {
            return Math.pow(k, e)
        },
        'ease-out': function (k, e = 1.675) {
            return 1 - Math.pow(1 - k, e)
        },
        'ease-in-out': function (k) {
            return .5 * (Math.sin((k - .5) * Math.PI) + 1)
        }
    };

let i = 0,
    x0 = null,
    locked = false,
    w, ini, fin, rID = null,
    anf;

function stopAni() {
    cancelAnimationFrame(rID);
    rID = null
};

function ani(cf = 0) {
    _C.style.setProperty('--i', ini + (fin - ini) * TFN['ease-out'](cf / anf));

    if (cf === anf) {
        stopAni();
        return
    }

    rID = requestAnimationFrame(ani.bind(this, ++cf))
};

function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e
};

function lock(e) {
    x0 = unify(e).clientX;
    locked = true
};

function drag(e) {
    e.preventDefault();

    if (locked) {
        let dx = unify(e).clientX - x0,
            f = +(dx / w).toFixed(2);

        _C.style.setProperty('--i', i - f)
    }
};

function move(e) {
    if (locked) {
        let dx = unify(e).clientX - x0,
            s = Math.sign(dx),
            f = +(s * dx / w).toFixed(2);

        ini = i - s * f;

        if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
            i -= s;
            f = 1 - f
        }

        fin = i;
        anf = Math.round(f * NF);
        ani();
        x0 = null;
        locked = false;
    }
};

function size() {
    w = window.innerWidth
};

size();
_C.style.setProperty('--n', N);

addEventListener('resize', size, false);

_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', lock, false);

_C.addEventListener('mousemove', drag, false);
_C.addEventListener('touchmove', drag, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);