import GamePage from "./gamePage.js"
import _arrayNewQuestionService from "./../services/arrayNewQuestionService.js"
import _addQuestionToGameService from "./../services/addQuestionToGameService.js"


export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("questions");
    this.gameRef = _db.collection("games");
    this.partyRef = _db.collection("parties");

    // Maeby we should get the datafrom the database at put it in the new array before - for no overwrite
    // this.partyContentArray = _arrayNewQuestionService.partyContentArray;

    _addQuestionToGameService.fetchGames();

    this.template();
    this.createGameOptions();
    this.gamePage = new GamePage;

  }


  // Template over the page, that adds a dropdown menu with all the different games.
  // Underneath there is a input field where the user can add his or her own questions til the game.
  // Underneath again there is an article with the players own questions, sorted by game.
  template() {
    document.querySelector('#content').innerHTML += /*html*/ `
    <section id="addQuestions" class="page">
      <div for="addedQuestions" onclick="basket();createAddedQuestionsList()">Dit spilindhold<div id="numberOfRoundsAdded">${_arrayNewQuestionService.partyContentArray.length}</div></div>
      <article id="addedQuestionsArticle" class="hide">The Article
      </article>
      <form id="questionForm">
        <h2>Tilføj nye spørgsmål til spillet:</h2>
        <select class="inputfield" id="select-game" name="games"s onchange="gameInputSettings(this.value, 'newQuestion', 'inputForGames', '')" placeholder="Vælg spil..." required></select>
        
        <h2>Skriv indholdet her:</h2>
        <div id="inputForGames" class="flexcontainer">
        <input class="inputfield" type="text" id="newQuestion" placeholder="Tilføj spil indhold her...." required>
        </div>
        <button class="btn" id="adQuestion" type="button" name="button" onclick="createNewQuestion()">Tilføj</button>
      </form>
      <article id="appendUserQuestions">
        <h2>Tilføj indhold fra databasen</h2>
        <div id="list">
        </div>
        <div id="predefined">
        </div>
      </article>
      <button class="btn" onclick="generateGamePages()"> Tilføj spørgsmål og gå videre </button>
  
    </section>
    `;
  }


  // This function changes the innerHTML of an article with the id ${whereToPut}.
  // The content of this article depends on which game is selected in the select #${gameId}.
  // It also takes the parameters of ${inputId}, which is the inserted content for the question
  // ... and the ${preOrNot}, which tells if the action should happen on the page for adding new predefinded questions to the database
  // ... or if it should be on the page for adding question to the game. 
  async gameInputSettings(gameId, inputId, whereToPut, preOrNot) {

    let differetInputs = "";

    await this.gameRef.doc(`${gameId}`).get().then(function (doc) { // Get data for the selected game from the database-gameId-document
      let docData = doc.data()

      //-------------------------- if Truth or Dare --------------------------//

      if (gameId === 'vRD8Spl5fQ4AfTifPtRq') {
        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>

        <label class="smallInputfield" for="truth${preOrNot}">Sandhed</label><input id="truth${preOrNot}" name="truth" onchange="styleWhichValue(this.id, 'dare${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="dare${preOrNot}" name="dare" onchange="styleWhichValue(this.id, 'truth${preOrNot}')" class="hide displayNone" type="checkbox"><label class="smallInputfield" for="dare${preOrNot}">Konsekvens</label>
        `


        //-------------------------- if Quiz --------------------------//

      } else if (gameId === 'MEF7ah2clInWlmgNpg6M') {
        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>

        <!-- Inputfields for answer 1 -->
        <label class="bold displayBlock" for="answer1${preOrNot}">Svarmulighed 1</label>
        <input id="answer1${preOrNot}" name="answer1" class="inputfield" placeholder="Skriv svarmulighed..." type="text">
       
        <label class="smallInputfield" for="correct1${preOrNot}">Korrekt</label>
        <input id="correct1${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong1${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong1${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct1${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong1${preOrNot}">Forkert</label>


        <!-- Inputfields for answer 2 -->
        <label class="bold displayBlock" for="answer2${preOrNot}">Svarmulighed 2</label>
        <input id="answer2${preOrNot}" name="answer2" class="inputfield" placeholder="Skriv svarmulighed..." type="text">

        <label class="smallInputfield" for="correct2${preOrNot}">Korrekt</label>
        <input id="correct2${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong2${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong2${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct2${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong2${preOrNot}">Forkert</label>


        <!-- Inputfields for answer 3 -->
        <label class="bold displayBlock" for="answer3${preOrNot}">Svarmulighed 3</label>
        <input id="answer3${preOrNot}" name="answer3" class="inputfield" placeholder="Skriv svarmulighed..." type="text">

        <label class="smallInputfield" for="correct3${preOrNot}">Korrekt</label>
        <input id="correct3${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong3${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong3${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct3${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong3${preOrNot}">Forkert</label>

        
        <!-- Inputfields for answer 4 -->
        <label class="bold displayBlock" for="answer4${preOrNot}">Svarmulighed 4</label>
        <input id="answer4${preOrNot}" name="answer4" class="inputfield" placeholder="Skriv svarmulighed..." type="text">
        
        <label class="smallInputfield" for="correct4${preOrNot}">Korrekt</label>
        <input id="correct4${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong4${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong4${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct4${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong4${preOrNot}">Forkert</label>
    
        `


        //-------------------------- if True or False --------------------------//
      } else if (gameId === 'pfF2l2zwYDqcVCIjMlNr') {
        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>

        <label class="smallInputfield" for="truthfull${preOrNot}">Sandt</label>
        <input id="truthfull${preOrNot}" name="truthfull" onchange="styleWhichValue(this.id, 'false${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="false${preOrNot}" name="false" onchange="styleWhichValue(this.id, 'truthfull${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="false${preOrNot}">Falsk</label>
        `

        //-------------------------- if the other games --------------------------//
      } else {
        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>
        `
      }
    })
    document.querySelector(`#${whereToPut}`).innerHTML = differetInputs;
  }



  // This function creates the dropdown menu over games, by taking every new game id, and adding the game title to the menu.
  // GameRef refers back to the constructor, therefore the this.
  createGameOptions() {
    this.gameRef.get().then(snapshotData => {
      snapshotData.forEach(doc => {
        let game = doc.data();
        game.id = doc.id;

        let listOfGames = document.getElementById("select-game");

        listOfGames.add(new Option(game.gameTitle, game.id));
      });
    });
  }


  // This checkbox runs onclick on the addQuestions page. 
  // The function adds the predefined questions to the partyContentArray
  // ...and displays the qustion "none" afterwords.
  async checkbox(element, id) {
    element.classList.add('checkboxChecked');

    let questionSet = {};

    await this.questionRef.doc(`${id}`).get().then(function (doc) { // Finds the specific question document from the database
      let docData = doc.data()
      questionSet = { // Sets a object with values from the database document
        game: docData.game,
        questionContent: docData.questionContent,
        categories: docData.categories,
        addedId: `added${id}`,
      }
    })

    _arrayNewQuestionService.partyContentArray.push(questionSet); // Pushes the obejct with database-values into an the global partyContenArray
    _arrayNewQuestionService.highlightNumber() // Highlights the number of added questions

    element.style.display = "none";
    console.log(_arrayNewQuestionService.partyContentArray)
    element.classList.remove('checkboxChecked');
  }


  // This removeFromList function removes the specific question from the partyContentArray, so it´s not going to be added to the game
  removeFromList(element, id) {
    // Find the index of the question in the partyContentArray
    let index = _arrayNewQuestionService.partyContentArray.map(function (e) {
      return e.addedId // get the id of the question from the specific question-object
    }).indexOf(id);

    if (index > -1) { // If it exsists in the array (if it dosn´t the index will be -1)
      _arrayNewQuestionService.partyContentArray.splice(index, 1); // then remove it
    }

    _arrayNewQuestionService.highlightNumber(); // Highligth the new nuber of added questions

    element.style.display = 'none';

    if (id.substr(0, 5) == 'added') { // If the question is a predefined question (the Id starts with 'added')

      let preId = id.slice(5); // Then get the id from the predefined part (same id, just without 'added' infront of...
      document.querySelector(`#id${preId}`).style.display = "block"; // ... but 'id' in front of instead) And display it again
    }
  }

  // This basket function shows or hides the article with the questions added to the game.
  // It does this by toggeling the class 'hide'.
  basket() {
    document.querySelector('#addedQuestionsArticle').classList.toggle('hide');
  }
}