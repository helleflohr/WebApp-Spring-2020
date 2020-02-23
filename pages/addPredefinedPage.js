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



    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="addPredefinded" class="page collectionOfItems">
        <div name="" id="wichCategories">
        </div>
        <br>
        <select name="whichGame" id="whichGame">
        </select>
        <br>
        <input type="text" id="newPreQuestion">
        <br>
        <button class="btn" type="button" onclick='createQuestion()'>Tilføj spørgsmål til databasen</button>
        </article>
        `;

    }

    createCategoryOptions() {
        this.categoryRef.onSnapshot(snapshotData => {
            snapshotData.forEach(doc => {

                let category = doc.data();
                category.id = doc.id;

                let categoriyCheckboxes = document.querySelector("#wichCategories");

                categoriyCheckboxes.innerHTML += /*html*/ `
                <input type="checkbox" id="${category.id}" name="${category.contentCategory}" value="${category.id}">
                <label for="${category.id}">${category.contentCategory}</label>
               
                <br>
                `

            });

        });
    }
    createGameOptions() {
        this.gameRef.onSnapshot(snapshotData => {
            snapshotData.forEach(doc => {
                let game = doc.data();
                game.id = doc.id;

                let listOfGames = document.getElementById("whichGame");

                listOfGames.add(new Option(game.gameTitle, game.id));


            });

        });
    }

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


}