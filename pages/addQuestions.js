import _categoryService from "./../services/categoryService.js"

export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("userQuestions");
    this.categoryRef = _db.collection("categories");
    this.gameRef = _db.collection("games");
    this.table = document.getElementById("tableBody");


    this.createGameOptions();
    this.createQuestionsList();
    this.template();


  }


  createNewQuestion() {

    let gameInput = document.querySelector("#select-game");
    let questionInput = document.querySelector("#newQuestion");
    let newUserQuestion = {
      game: gameInput.value,
      questionContent: questionInput.value
    }
    this.questionRef.add(newUserQuestion);
    console.log()
  }



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
    </section>
    
    `;

  }


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


  createQuestionsList() {
    let questionLi = "";
    this.questionRef.onSnapshot(snapshotData => {
      snapshotData.forEach(doc => {

        let myQuestions = doc.data();
        myQuestions.id = doc.id;

        questionLi = document.querySelector("#list");

        questionLi.innerHTML += /*html*/ `
            <li> <label for="${myQuestions.id}">${myQuestions.questionContent}</label> <input type="checkbox" id="${myQuestions.id}" name="${myQuestions.questionContent}" value="${myQuestions.id}"> </li>
                   
            
                
            <br>
            `
      });

    });
  }


}