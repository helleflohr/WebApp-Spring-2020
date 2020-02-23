import _categoryService from "./../services/categoryService.js"

export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("userQuestions");
    this.gameRef = _db.collection("games");

    this.games = this.arrayGames();
    this.questions = this.arrayQuestions();

    this.template();
    this.createGameOptions();
    //this.createQuestionsList(games, questions);
    this.createQuestionsList();
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
    <button class="btn" name="playersReady" onclick="navigateTo(this.name)"> Videre </button>
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
    this.createQuestionsList();
    document.querySelector("#newQuestion").reset();
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


  // This function creates an array 


  arrayGames() {
    let arrayGames = [];
    this.gameRef.get().then(snapshotData => {
      snapshotData.forEach(doc => {
        let game = doc.data();
        game.id = doc.id;
        arrayGames.push(game);
      })
    })
    return arrayGames;
  }

  arrayQuestions() {
    let arrayQuestions = [];
    this.questionRef.get().then(snapshotData => {
      snapshotData.forEach(doc => {
        let question = doc.data();
        question.id = doc.id;
        arrayQuestions.push(question);
      })
    })
    return arrayQuestions;
  }

  createQuestionsList() {
    let listItem = "";

    console.log(this.games);
    console.log(this.questions);

    this.games.forEach(game => {
      listItem += /*html*/ `
      <li>${game.gameTitle}</li>`
      this.questions.forEach(question => {
        if (question.game == game.id) {
          listitem += /*html*/ `
        <li>${question.questionContent}</li>`
        }
      })

    })

    document.querySelector("#list").innerHTML = listItem;
  }

}


// createQuestionsList() {
//   let questionLi = "";

//   this.gameRef.get().then(snapshotData => {
//     snapshotData.forEach(doc => {
//       let game = doc.data();
//       game.id = doc.id;
//       questionLi += /*html*/ `
//     <li class="game bold">${game.gameTitle}</li>`

//       this.questionRef.get().then(snapshotData => {
//         snapshotData.forEach(doc => {
//           let myQuestions = doc.data();
//           myQuestions.id = doc.id;
//           // console.log(myQuestions);
//           if (myQuestions.game == game.id) {
//             questionLi += /*html*/ `
//          <li>
//               <label for="${myQuestions.id}">${game.gameTitle} ${myQuestions.questionContent}</label>
//               <input type="checkbox" id="${myQuestions.id}" name="${myQuestions.questionContent}" value="${myQuestions.id}">
//          </li> `
//           }
//         })
//         document.querySelector("#list").innerHTML = questionLi
//       })


//       // HEJ HELLE, jeg har ændret i label... skrev game.gameTitle ind i tagget.
//     })
//   })
// }