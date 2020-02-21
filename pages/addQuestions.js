import _categoryService from "./../services/categoryService.js"

export default class AddQuestions {
  constructor() {
    this.questionRef = _db.collection("userQuestions");
    this.categoryRef = _db.collection("categories");
    this.gameRef = _db.collection("games");

    // this.createCategoryOptions();
    this.createGameOptions();
    this.template();


  }


  createNewQuestion() {
    // let categoriesInput = document.querySelector("#select-category");
    let gameInput = document.querySelector("#select-game");
    let questionInput = document.querySelector("#newQuestion");
    let newUserQuestion = {
      // categories: [categoriesInput.value],
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
        
        <br><button type="button" name="button" onclick="createNewQuestion()">Tilføj</button>
      </form>
    </section>
    <section>
      <h2>Mit indhold</h2>
      <table>
        <thead>
          <tr>
            <th>Spil</th>
            <th>Indhold</th>
          </tr>
        </thead>
        <tbody id="tableBody">
      
        </tbody>
      </table> 
    </section>
    `;

  }

  // createCategoryOptions() {
  //   this.categoryRef.onSnapshot(snapshotData => {
  //     snapshotData.forEach(doc => {

  //       let category = doc.data();
  //       category.id = doc.id;

  //       let categoriyCheckboxes = document.querySelector("#select-category");

  //       categoriyCheckboxes.innerHTML += /*html*/ `
  //           <input type="checkbox" id="${category.id}" name="${category.contentCategory}" value="${category.id}">
  //           <label for="${category.id}">${category.contentCategory}</label>

  //           <br>
  //           `

  //       // let listOfCategories = document.getElementById("wichCategories");

  //       // listOfCategories.add(new Option(category.contentCategory, category.id));
  //     });

  //   });
  // }
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





  //   appendCategory() {
  //     let htmlTemplate = "";
  //     for (let category of this.categories) {
  //       htmlTemplate += `
  //             <option value="${category.id}">${category.name}</option>
  //           `;
  //     }

  //     document.querySelector('#select-category').innerHTML += htmlTemplate;
  //   }



  //   template() {
  //     document.querySelector('#content').innerHTML += /*html*/ `
  //     <section id="addQuestions" class="page">
  //         <form id="questionForm">
  //         <h2>Tilføj nye spørgsmål til spillet:</h2>
  //         <select id="select-game" name="games" onchange="gameSelected(this.value)" required>
  //         <select id="select-category" name="category" onchange="categorySelected(this.value)" required>

  //         <input type="text" id="spørgsmål" placeholder="Tilføj spil indhold her...." required>

  //         <button type="button" name="button" onclick="createNewQuestion()">Tilføj</button>
  //       </form>
  //       </section>`
  //   }

  // 
}