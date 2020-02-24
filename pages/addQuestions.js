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
        <br><select id="select-game" name="games" required>
        
        <br><h2>Skriv indholdet her:</h2>
        <br><input type="text" id="newQuestion" placeholder="Tilføj spil indhold her...." required>
        
        <br><button class="btn" type="button" name="button" onclick="createNewQuestion()">Tilføj</button>
      </form>
      <article id="appendUserQuestions">
      <h2>Liste over indhold</h2>
      <ul id="list">
      </ul>
    </article>
    <button class="btn" name="playersReady" onclick="navigateTo(this.name);addContentToPartyArr()"> Videre </button>
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
    this.questionRef.add(newUserQuestion);

    this.partyContentArray.push(newUserQuestion)

    this.fetchGames();
    document.querySelector("#newQuestion").value = "";
  }


  // This function creates the dropdown menu over games, by taking every new game id, and adding the game 
  // title to the menu. gameRef refers back to the constructor, therefore the this.
  createGameOptions() {
    this.gameRef.onSnapshot(snapshotData => {
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
      <li class="bold">${game.gameTitle}</li>`
      this.questions.forEach(question => {
        if (question.game == game.id) {
          listItem += /*html*/ `
        <li>${question.questionContent}</li>`
        }
      })

    })

    document.querySelector("#list").innerHTML = listItem;
    console.log(listItem)
  }

  addContentToPartyArr() {

    this.partyRef.doc('UF8iwR41XmnUDSNPP6Mh').update({
      // Get docref from elsewere `${}`

      questions: this.partyContentArray

    })
  }

}