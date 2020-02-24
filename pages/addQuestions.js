// Helle
import _categoryService from "./../services/categoryService.js"

export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("userQuestions");
    this.gameRef = _db.collection("games");
    this.partyRef = _db.collection("parties");

    // Maeby we should get the datafrom the database at put it in the new array before - for no overwrite
    this.partyContentArray = [];
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
        <form id="questionForm">
        <h2>Tilføj nye spørgsmål til spillet:</h2>
        <select class="inputfield" id="select-game" name="games" placeholder="Vælg spil..." required>
        
        <h2>Skriv indholdet her:</h2>
        <input class="inputfield" type="text" id="newQuestion" placeholder="Tilføj spil indhold her...." required>
        
        <button class="btn" type="button" name="button" onclick="createNewQuestion()">Tilføj</button>
      </form>
      <article id="appendUserQuestions">
      <h2>Liste over indhold</h2>
      <div id="list">
      </div>
    </article>
    <button class="btn" name="gamePage" onclick="navigateTo(this.name);addContentToPartyArr()"> Tilføj spørgsmål og gå videre </button>
    </section>
    `;
  }


  // This function creates the new question by taking the information from the dropdown menu over games, 
  // and linking it with the value in the input field.
  createNewQuestion() {

    let gameInput = document.querySelector("#select-game");
    let questionInput = document.querySelector("#newQuestion");
    let newUserQuestion = {
      game: gameInput.value,
      questionContent: questionInput.value
    }
    // this.questionRef.add(newUserQuestion);

    this.partyContentArray.push(newUserQuestion)

    this.fetchGames();
    document.querySelector("#newQuestion").value = "";
  }


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
      listItem += /*html*/ `
      <h3 class="bold">${game.gameTitle}</h3>`
      this.questions.forEach(question => {
        if (question.game == game.id) {
          listItem += /*html*/ `
        
        <input class="checkbox" type="checkbox" id="${question.id}" name="${question.questionContent}" value="${question.id}" onclick="checkbox(this.id)">
        <label class="label checkboxNotCheked" for="${question.id}">${question.questionContent}</label>
        `
        }
      })
    })

    document.querySelector("#list").innerHTML = listItem;
  }

  addContentToPartyArr() {

    this.partyRef.doc('UF8iwR41XmnUDSNPP6Mh').update({
      // Get docref from elsewere `${}`

      questions: this.partyContentArray

    })
  }
  checkbox(id) {
    let checkBox = document.querySelector(`#${id}`);
    if (checkBox.checked == true) {
      document.querySelector(`[for=${id}]`).classList.add('checkboxChecked')

    } else {

      document.querySelector(`[for=${id}]`).classList.remove('checkboxChecked')
    }
  }

}