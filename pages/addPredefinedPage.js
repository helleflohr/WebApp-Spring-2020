// import _addQuestionService from "./../services/addPredefinedService.js"
export default class AddPredefinedPage {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.categoryRef = _db.collection("categories");
        this.gameRef = _db.collection("games");

        this.createCategoryOptions();
        this.createGameOptions();
        this.template();


    }

    // The HTML with input filds to define new content
    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="addPredefinded" class="page collectionOfItems">
        <h2>Tilføj prædefinerede spørgsmål</h2>
        <div name="" id="wichCategories">
        </div>
        <br>
        <select name="whichGame" id="whichGame" onchange="gameInputSettings(this.value, 'newPreQuestion', 'preInputfield')" class="inputfield">
        </select>
        <br>
        <div id="preInputfield">
        <input type="text" id="newPreQuestion" placeholder="Tilføj spil indhold her...." class="inputfield">
        </div>
        <br>
        <button class="btn" type="button" onclick='createQuestion()'>Tilføj spørgsmål til databasen</button>
        </article>
        `;

    }

    // Get options from the database for the category-selectbox
    createCategoryOptions() {
        this.categoryRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {

                let category = doc.data();
                category.id = doc.id;

                let categoriyCheckboxes = document.querySelector("#wichCategories");
                categoriyCheckboxes.innerHTML += /*html*/ `
                <input type="checkbox" id="${category.id}" name="${category.contentCategory}" class="inputfield" value="${category.id}">
                <label for="${category.id}">${category.contentCategory}</label>
               
                <br>
                `
            });
        });
    }

    // Get options from the database for the games-selectbox
    createGameOptions() {
        this.gameRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {
                let game = doc.data();
                game.id = doc.id;

                let listOfGames = document.getElementById("whichGame");
                listOfGames.add(new Option(game.gameTitle, game.id));
            });
        });
    }

    // Try to combine the two functions above
    // createOptions(theRef, selectID, databaseTitle) {
    //     theRef.onSnapshot(snapshotData => {
    //         //  let categories = [];
    //         snapshotData.forEach(doc => {
    //             let database = doc.data();
    //             database.id = doc.id;
    //             let listOfOptions = document.getElementById(`${selectID}`);
    //             // databaseTitle = database.databaseTitle
    //             // console.log(database.databaseTitle)
    //             listOfOptions.add(new Option(database.databaseTitle, database.id));
    //         });
    //     });
    // }

    // Ad a predefined question to the database
    createQuestion() {
        let categoriesInput = document.querySelector("#wichCategories");
        let gameInput = document.querySelector("#whichGame");
        let questionInput = document.querySelector("#newPreQuestion");
        let newPredefinedQuestion = {
            categories: [categoriesInput.value],
            game: gameInput.value,
            questionContent: questionInput.value
        }
        this.questionRef.add(newPredefinedQuestion);
    }

}