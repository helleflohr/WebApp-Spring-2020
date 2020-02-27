// import _addQuestionService from "./../services/addPredefinedService.js"
import questionInputService from "./../services/questionInputService.js"

export default class AddPredefinedPage {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.categoryRef = _db.collection("categories");
        this.gameRef = _db.collection("games");
        this.choosenCategoriesArr = [];
        this.whichParameter = "";
        // this.newPredefinedQuestion = {};

        this.createCategoryOptions();
        this.createGameOptions();
        this.template();

    }

    // The HTML with input filds to define new content
    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="addPredefinded" class="page collectionOfItems">
        <h2>Tilføj prædefinerede spørgsmål</h2>
        <div class="flexcontainer" id="wichCategories">
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
                <input type="checkbox" id="the${category.id}" onchange="highlightChoosen(this.id)" name="${category.contentCategory}" class="displayNone hide" value="${category.id}">
                <label class="smallInputfield" for="the${category.id}">${category.contentCategory}</label>
               
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
                // document.querySelector(`[for=${tags[i].id}]`).style.background = 'var(--secundary_color_dark)'
            }
            checkBox.checked = false;
        }
    }

    highlightChoosen(checkboxId) {

        let checkBox = document.getElementById(`${checkboxId}`);
        console.log(checkBox)
        let label = document.querySelector(`[for=${checkboxId}]`);

        if (checkBox.checked == true) {

            label.style.background = 'var(--secundary_color_dark)'
        } else {
            label.style.background = 'var(--secundary_color_light)'
        }
    }




    // Ad a predefined question to the database
    createQuestion() {

        this.choosenCategories();

        console.log(this.choosenCategoriesArr)
        console.log(questionInputService.addedValue)
        // let categoriesInput = document.querySelector("#wichCategories");
        let gameInput = document.querySelector("#whichGame");
        let questionInput = document.querySelector("#newPreQuestion");
        questionInputService.newPredefinedQuestion = {
            categories: this.choosenCategoriesArr,
            game: gameInput.value,
            questionContent: questionInput.value
        }
        questionInputService.whichParameters('PredefinedPage', 'this.newPredefinedQuestion');
        this.questionRef.add(questionInputService.newPredefinedQuestion);
        questionInput.value = "";
    }

}