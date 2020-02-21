// import _addQuestionService from "./../services/addPredefinedService.js"
export default class AddPredefinedPage {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.categoryRef = _db.collection("categories");
        this.gameRef = _db.collection("games");

        this.categoriesInput = document.querySelector("#wichCategories");
        this.gameInput = document.querySelector("#whichGame");
        this.questionInput = document.querySelector("#newPreQuestion");


        this.createOptions(this.categoryRef, 'wichCategories', 'contentCategory')
        this.createCategoryOptions();
        this.createGameOptions();
        this.template();


    }

    createQuestion() {

        let newPredefinedQuestion = {
            categories: [this.categoriesInput],
            game: this.gameInput.value,
            questionContent: this.questionInput.value
        }
        this.questionRef.add(newPredefinedQuestion);
    }



    template() {
        // this.categoriesInput.target.options[categoriesInput.target.selectedIndex].value

        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="addPredefinded" class="page">
        <select name="" id="wichCategories">
        </select>
        <br>
        <select name="whichGame" id="whichGame" value="">
        </select>
        <br>
        <input type="text" id="newPreQuestion" value="">
        <br>
        <button type="button" onclick='this.createQuestion()'>Tilføj spørgsmål til databasen</button>
        </article>
        `;
        console.log(document.querySelector("#wichCategories").value);

    }

    createCategoryOptions() {
        this.categoryRef.onSnapshot(snapshotData => {
            snapshotData.forEach(doc => {

                let category = doc.data();
                category.id = doc.id;

                // this.categoriesInput.innerHTML += /*html*/ `
                // <option onclick="setSelectValue(this.value, this.name)" value="${category.id}" name="${category.contentCategory}">${category.contentCategory}</option>
                // `


                // console.log(category)
                let listOfCategories = document.getElementById("wichCategories");

                listOfCategories.add(new Option(category.contentCategory, category.id));
            });

        });
    }

    setSelectValue(value, name) {
        this.categoriesInput.val = value;
        this.categoriesInput.name = name;
        console.log(this.categoriesInput.val, this.categoriesInput.name)
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

    createOptions(theRef, selectID, databaseTitle) {
        theRef.onSnapshot(snapshotData => {
            //  let categories = [];
            snapshotData.forEach(doc => {
                let database = doc.data();
                database.id = doc.id;
                let listOfOptions = document.getElementById(`${selectID}`);
                databaseTitle = database.databaseTitle
                console.log(databaseTitle)
                listOfOptions.add(new Option(databaseTitle, database.id));


            });

        });
    }


}