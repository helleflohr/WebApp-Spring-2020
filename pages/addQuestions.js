import Gamepage from "./gamePage.js"
import _categoryService from "./../services/categoryService.js"
import _arrayQuestionService from "./../services/arrayQuestionService.js"
let gamePage = new Gamepage;

// import questionInputService from "./../services/questionInputService.js"


export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("questions");
    this.gameRef = _db.collection("games");
    this.partyRef = _db.collection("parties");

    // Maeby we should get the datafrom the database at put it in the new array before - for no overwrite
    // this.partyContentArray = _arrayQuestionService.partyContentArray;
    this.games = [];
    this.questions = [];
    this.fetchGames();

    this.template();
    this.createGameOptions();

  }


  // Template over the page, that adds a dropdown menu with all the different games.
  // Underneath there is a input field where the user can add his or her own questions til the game.
  // Underneath again there is an article with the players own questions, sorted by game.
  template() {
    document.querySelector('#content').innerHTML += /*html*/ `
    <section id="addQuestions" class="page">
    <input id="addedQuestions" class="hide" type="checkbox" > 
    <label for="addedQuestions" onclick="basket();createAddedQuestionsList()">Kurven <div id="numberOfRoundsAdded">${_arrayQuestionService.partyContentArray.length}</div></label>
    <article id="addedQuestionsArticle" class="hide">The Article</article>
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
    <button class="btn" name="gamePage" onclick="navigateTo(this.name);addContentToPartyArr()"> Tilføj spørgsmål og gå videre </button>
    
    </section>
    `;
  }

  async gameInputSettings(gameId, inputId, whereToPut, preOrNot) {

    let differetInputs = "";
    await this.gameRef.doc(`${gameId}`).get().then(function (doc) {
      let docData = doc.data()

      if (gameId === 'vRD8Spl5fQ4AfTifPtRq') { //Sandhed eller konsekvens
        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>

        <label class="smallInputfield" for="truth${preOrNot}">Sandhed</label><input id="truth${preOrNot}" name="truth" onchange="styleWhichValue(this.id, 'dare${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="dare${preOrNot}" name="dare" onchange="styleWhichValue(this.id, 'truth${preOrNot}')" class="hide displayNone" type="checkbox"><label class="smallInputfield" for="dare${preOrNot}">Konsekvens</label>
        `
      } else if (gameId === 'MEF7ah2clInWlmgNpg6M') { //Quiz
        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>

        <label class="bold displayBlock" for="answer1${preOrNot}">Svarmulighed 1</label>
        <input id="answer1${preOrNot}" name="answer1" class="inputfield" placeholder="Skriv svarmulighed..." type="text">
       
        <label class="smallInputfield" for="correct1${preOrNot}">Korrekt</label>
        <input id="correct1${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong1${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong1${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct1${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong1${preOrNot}">Forkert</label>




        <label class="bold displayBlock" for="answer2${preOrNot}">Svarmulighed 2</label>
        <input id="answer2${preOrNot}" name="answer2" class="inputfield" placeholder="Skriv svarmulighed..." type="text">

        <label class="smallInputfield" for="correct2${preOrNot}">Korrekt</label>
        <input id="correct2${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong2${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong2${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct2${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong2${preOrNot}">Forkert</label>



        <label class="bold displayBlock" for="answer3${preOrNot}">Svarmulighed 3</label>
        <input id="answer3${preOrNot}" name="answer3" class="inputfield" placeholder="Skriv svarmulighed..." type="text">

        <label class="smallInputfield" for="correct3${preOrNot}">Korrekt</label>
        <input id="correct3${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong3${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong3${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct3${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong3${preOrNot}">Forkert</label>


        

        <label class="bold displayBlock" for="answer4${preOrNot}">Svarmulighed 4</label>
        <input id="answer4${preOrNot}" name="answer4" class="inputfield" placeholder="Skriv svarmulighed..." type="text">
        
        <label class="smallInputfield" for="correct4${preOrNot}">Korrekt</label>
        <input id="correct4${preOrNot}" name="correct" onchange="styleWhichValue(this.id, 'wrong4${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="wrong4${preOrNot}" name="wrong" onchange="styleWhichValue(this.id, 'correct4${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="wrong4${preOrNot}">Forkert</label>
    
        `
      } else if (gameId === 'pfF2l2zwYDqcVCIjMlNr') { //Sandt eller falsk
        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>

        <label class="smallInputfield" for="truthfull${preOrNot}">Sandt</label>
        <input id="truthfull${preOrNot}" name="truthfull" onchange="styleWhichValue(this.id, 'false${preOrNot}')" class="hide displayNone" type="checkbox">
        <input id="false${preOrNot}" name="false" onchange="styleWhichValue(this.id, 'truthfull${preOrNot}')" class="hide displayNone" type="checkbox">
        <label class="smallInputfield" for="false${preOrNot}">Falsk</label>
        `
      } else {

        differetInputs = /*html*/ `
        <input class="inputfield" type="text" id="${inputId}" placeholder='${docData.gamePlaceholder}' required>
        `
      }
      document.querySelector(`#${inputId}`).setAttribute("placeholder", docData.gamePlaceholder);

    })
    document.querySelector(`#${whereToPut}`).innerHTML = differetInputs;

  }


  // This function creates the new question by taking the information from the dropdown menu over games, 
  // and linking it with the value in the input field.
  // createNewQuestion() {

  //   let gameInput = document.querySelector("#select-game");
  //   let questionInput = document.querySelector("#newQuestion");
  //   let newUserQuestion = {
  //     game: gameInput.value,
  //     questionContent: questionInput.value
  //   }
  //   // this.questionRef.add(newUserQuestion);

  //   this.partyContentArray.push(newUserQuestion)
  //   console.log(this.partyContentArray)

  //   // this.fetchGames();
  //   this.highlightNumber()
  //   // document.querySelector('[for=addedQuestions]').innerHTML = `Kurven <div id="numberOfRoundsAdded">${this.partyContentArray.length}</div>`
  //   document.querySelector("#newQuestion").value = "";

  // }


  // This function creates the dropdown menu over games, by taking every new game id, and adding the game 
  // title to the menu. gameRef refers back to the constructor, therefore the this.
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


  // This function creates an empty array. It pushes a new object to the array, for each new game id. 
  fetchGames() {
    this.games = [];
    this.gameRef.get().then(snapshotData => {
      snapshotData.forEach(doc => {
        let game = doc.data();
        game.id = doc.id;
        this.games.push(game);
      })
      this.fetchQuestions();
    })

  }


  // This function creates an empty array. It pushes a new object to the array, for each new question id. 
  fetchQuestions() {
    this.questions = [];
    this.questionRef.get().then(snapshotData => {
      snapshotData.forEach(doc => {
        let question = doc.data();
        question.id = doc.id;
        this.questions.push(question);
      })
      this.createQuestionsList();
    })
  }


  // This function creates a list of all the games, and puts in all the questions, where the value of 
  // question.game is equeal to game.id. There by sorting the questions by games.
  createQuestionsList() {
    let listItem = "";


    this.games.forEach(game => {
      this.questions.forEach(question => {


        if (question.game == game.id) { // Checks if the question is a part of the "current" game
          if (!game.questions) { //If theres no questions for the game
            game.questions = []; // the array of questions is set to empty
          }

          game.questions.push(question); //Push the questions that is a part of the "current" game into a game array of questions
          // console.log(game.questions.length)


          if (game.questions.length == 1) { // If theres a question in the game array add it to the DOM
            listItem += /*html*/ `<article>
            <h3 class="bold">${game.gameTitle}</h3>
            </article>`

            // After the game headline add all the questions with the matching gameId
            this.questions.forEach(question => {
              if (question.game == game.id) {
                listItem += /*html*/ `
                <p id="${question.id}" class="label checkboxNotCheked" onclick="checkbox(this.id)">${question.questionContent}</p>
                `
              }
            })
          }

        }
      })
    })

    document.querySelector("#list").innerHTML = listItem;

  }

  createAddedQuestionsList() {
    let listItem = "";

    // Insert message if basket is empty
    if (_arrayQuestionService.partyContentArray.length === 0) {
      listItem += `Du har endnu ikke valgt nogle spørgsmål til spillet`
    }


    this.games.forEach(game => {
      for (let question of _arrayQuestionService.partyContentArray) {
        if (question.game === game.id) {

          listItem += /*html*/ `
          <h3 class="bold" id="${game.id}">${game.gameTitle}</h3>`


          _arrayQuestionService.partyContentArray.forEach(question => {
            if (question.game == game.id) {
              listItem += /*html*/ `
              <p id="${question.addedId}" class="label checkboxNotCheked" onclick="removeFromList(this.id)">${question.questionContent}</p>
              `

            }

          })

        }

      }
      // listItem = `<article>${listItem}</article>`
      // console.log(listItem)

      // ET FORSØG PÅ AT FJERNE OVERKSIFTER, HVOR DER IKKE ER NOGET INDHOLD
      // let gameHeadline = document.querySelector(`#${game.id}`);
      // console.log(gameHeadline.nextElementSibling)
      // if (gameHeadline.nextElementSibling == "<h3></h3>") {
      //   document.querySelector(`#${game.id}`).style.display = 'none';
      // } else {
      //   document.querySelector(`#${game.id}`).style.display = 'block';
      // }


    })
    document.querySelector("#addedQuestionsArticle").innerHTML = listItem;

  }

  addContentToPartyArr() {
    console.log('test')
    // this.partyRef.doc('UF8iwR41XmnUDSNPP6Mh').update({
    //   // Get docref from elsewere `${}`

    //   questions: _arrayQuestionService.partyContentArray

    // })

  }



  async checkbox(id) {
    document.querySelector(`#${id}`).classList.add('checkboxChecked');

    let questionSet = {};

    await this.questionRef.doc(`${id}`).get().then(function (doc) {
      let docData = doc.data()
      questionSet = {
        game: docData.game,
        questionContent: docData.questionContent,
        categories: docData.categories,
        addedId: `added${id}`
      }
    })

    _arrayQuestionService.partyContentArray.push(questionSet);
    this.highlightNumber()
    document.querySelector(`#${id}`).style.display = "none";
    console.log(_arrayQuestionService.partyContentArray)

  }

  removeFromList(id) {

    let preId = id.slice(5);
    document.querySelector(`#${preId}`).style.display = "block";

    let index = _arrayQuestionService.partyContentArray.map(function (e) {
      return e.addedId
    }).indexOf(id);
    console.log(index)
    if (index > -1) {
      _arrayQuestionService.partyContentArray.splice(index, 1);
    }
    this.highlightNumber()
    document.querySelector(`#${id}`).style.display = 'none';
  }

  basket() {
    let checkBox = document.querySelector('#addedQuestions');
    if (checkBox.checked == true) {
      document.querySelector('#addedQuestionsArticle').classList.add('hide');

    } else {

      document.querySelector('#addedQuestionsArticle').classList.remove('hide');
    }
  }

  // wait(ms) {
  //   var start = new Date().getTime();
  //   var end = start;
  //   while (end < start + ms) {
  //     end = new Date().getTime();
  //   }
  // }

  highlightNumber() {

    // this.wait(7000);
    document.querySelector('[for=addedQuestions]').innerHTML = `Kurven <div id="numberOfRoundsAdded"> ${_arrayQuestionService.partyContentArray.length}</div>`

    document.querySelector('#numberOfRoundsAdded').classList.add('highlightAnimation');

    // document.querySelector('#numberOfRoundsAdded').classList.add('highlightTransition');





    // let computedStyle = window.getComputedStyle(number),
    //   marginLeft = computedStyle.getPropertyValue('margin-left');
    // number.style.marginLeft = marginLeft;
    // number.classList.remove('horizTranslate');


  }

}