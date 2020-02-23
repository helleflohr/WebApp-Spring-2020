import _categoryService from "./../services/categoryService.js"

export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("userQuestions");
    this.gameRef = _db.collection("games");
    this.questionLi = "";

    this.template();
    this.createGameOptions();
    this.createQuestionsList();

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
    <button class="btn" name="playersReady" onclick="navigateTo(this.name)"> Videre </button>
    </section>
    `;
  }

  createNewQuestion() {

    let gameInput = document.querySelector("#select-game");
    let questionInput = document.querySelector("#newQuestion");
    let newUserQuestion = {
      game: gameInput.value,
      questionContent: questionInput.value
    }
    this.questionRef.add(newUserQuestion);
    this.createQuestionsList();
    document.querySelector("#newQuestion").reset();
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


  addGameTitle(game) {

    this.questionLi += /*html*/ `
    <li>${game.gameTitle}</li>`
    console.log(this.questionLi);
  }

  createQuestionsList() {
    let questionLi = "";


    this.gameRef.onSnapshot(snapshotData => {
      snapshotData.forEach(doc => {
        let game = doc.data();
        game.id = doc.id;
        questionLi += /*html*/ `
      <li class="game bold">${game.gameTitle}</li>`

        this.questionRef.onSnapshot(snapshotData => {
          snapshotData.forEach(doc => {
            let myQuestions = doc.data();
            myQuestions.id = doc.id;
            // console.log(myQuestions);
            if (myQuestions.game == game.id) {
              questionLi += /*html*/ `
           <li>
                <label for="${myQuestions.id}">${game.gameTitle} ${myQuestions.questionContent}</label>
                <input type="checkbox" id="${myQuestions.id}" name="${myQuestions.questionContent}" value="${myQuestions.id}">
           </li> `
            }
          })
          document.querySelector(".game").innerHTML = questionLi
        })
        document.querySelector("#list").innerHTML = questionLi

        // HEJ HELLE, jeg har ændret i label... skrev game.gameTitle ind i tagget.
      })
    })
  }



  // createQuestionsList() {
  //   let questionLi = "";
  //   let gameTitles = "Hi5 ";
  //   this.questionRef.onSnapshot(snapshotData => {
  //     snapshotData.forEach(doc => {


  //       let myQuestions = doc.data();
  //       myQuestions.id = doc.id;


  //       let theGameRef = _db.collection("games").doc(`${myQuestions.game}`);

  //       theGameRef.get().then(function (docs) {
  //         gameTitles = docs.data().gameTitle;

  //         console.log(gameTitles)
  //         return gameTitles;
  //       })
  //       console.log(gameTitles)

  //       questionLi += /*html*/ `
  //           <li>${gameTitles}<label for="${myQuestions.id}">${myQuestions.questionContent}</label> <input type="checkbox" id="${myQuestions.id}" name="${myQuestions.questionContent}" value="${myQuestions.id}"> </li>    
  //           <br>
  //           `
  //       console.log(questionLi);
  //     });


  //     document.querySelector("#list").innerHTML = questionLi
  //   });
  // }
}