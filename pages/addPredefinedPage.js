// import _addQuestionService from "./../services/addPredefinedService.js"
import questionInputService from "./../services/questionInputService.js"
export default class AddPredefinedPage {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.categoryRef = _db.collection("categories");
        this.gameRef = _db.collection("games");
        this.choosenCategoriesArr = [];
        this.whichParameter = "";

        this.createCategoryOptions();
        this.createGameOptions();
        this.template();
        // questionInputService.styleTruthOrDare();


    }

    // The HTML with input filds to define new content
    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="addPredefinded" class="page collectionOfItems">
        <h2>Tilføj prædefinerede spørgsmål</h2>
        <div name="" id="wichCategories">
        </div>
        <br>
        <select name="whichGame" id="whichGame" onchange="gameInputSettings(this.value, 'newPreQuestion', 'preInputfield', 'PredefinedPage')" class="inputfield">
        </select>
        <br>
        <div id="preInputfield" class="flexcontainer">
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

    //Connect the choosen categories to the question
    choosenCategories() {
        this.choosenCategoriesArr = [];
        let theDivWithInputs = document.querySelector("#wichCategories");
        let tags = theDivWithInputs.getElementsByTagName("input");
        for (let i = 0, n = tags.length; i < n; i = i + 1) {
            let checkBox = document.getElementById(`${tags[i].id}`);
            if (checkBox.checked == true) {
                this.choosenCategoriesArr.push(`${tags[i].id}`)
            }
            checkBox.checked = false;
        }
    }

    whichParameters() {
        let gameInput = document.querySelector("#whichGame");
        if (gameInput.value == 'vRD8Spl5fQ4AfTifPtRq') { //Sandhed eller konsekvens
            newPredefinedQuestion.truthOrDare = questionInputService.truthOrDare
        }
        // if (gameInput.value == 'vRD8Spl5fQ4AfTifPtRq') { //Sandhed eller konsekvens
        //     newPredefinedQuestion.truthOrDare = questionInputService.truthOrDare
        // }
    }


    // Ad a predefined question to the database
    createQuestion() {

        this.choosenCategories();

        console.log(this.choosenCategoriesArr)
        console.log(questionInputService.truthOrDare)
        // let categoriesInput = document.querySelector("#wichCategories");
        let gameInput = document.querySelector("#whichGame");
        let questionInput = document.querySelector("#newPreQuestion");
        let newPredefinedQuestion = {
            categories: this.choosenCategoriesArr,
            game: gameInput.value,
            questionContent: questionInput.value
        }
        this.whichParameters();
        this.questionRef.add(newPredefinedQuestion);
    }

}