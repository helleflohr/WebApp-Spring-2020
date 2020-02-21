import _categoryService from "./../services/categoryService.js"

export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("userQuestions");
    this.categoryRef = _db.collection("categories");
    this.gameRef = _db.collection("games");
    this.table = document.getElementById("tableBody");


    this.createGameOptions();
    this.appendUserQuestions();
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
    </section>
    <section>
      
      <table>
        <thead>
          <tr>
          <th><h2>Mit indhold</h2></th>
          </tr>
        </thead>
        <tbody id="tableBody">
      
        </tbody>
      </table> 
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

  appendUserQuestions() {
    this.questionRef.onSnapshot(snapshotData => {
      snapshotData.forEach(doc => {
        let questions = doc.data();
        questions.id = doc.id;
        let row = table.insertRow(0);

        let listOfQuestions = document.getElementById("tableBody");
        listOfQuestions.add(new row(questions.questionContent))
      });
    })

  }


}