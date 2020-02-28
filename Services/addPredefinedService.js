import _questionInputService from "./../services/questionInputService.js"
class AddPredefinedService {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.choosenCategoriesArr = [];
    }

    // Ad a predefined question to the database
    createQuestion() {

        this.choosenCategories();

        let gameInput = document.querySelector("#whichGame");
        let questionInput = document.querySelector("#newPreQuestion");
        _questionInputService.newPredefinedQuestion = {
            categories: this.choosenCategoriesArr,
            game: gameInput.value,
            questionContent: questionInput.value
        }
        _questionInputService.whichParameters('PredefinedPage', 'whichGame');
        this.questionRef.add(_questionInputService.newPredefinedQuestion);
        questionInput.value = "";
    }


    //Connect the choosen categories to the question
    choosenCategories() {
        this.choosenCategoriesArr = [];
        let theDivWithInputs = document.querySelector("#wichCategories");
        let tags = theDivWithInputs.getElementsByTagName("input");
        for (let i = 0, n = tags.length; i < n; i = i + 1) {
            let checkBox = document.getElementById(`${tags[i].id}`);
            if (checkBox.checked == true) {
                let theIdForElements = tags[i].id
                let thePureCategoryIdFromFireBase = theIdForElements.substr(3);
                this.choosenCategoriesArr.push(`${thePureCategoryIdFromFireBase}`)

                checkBox.checked = false;
                this.highlightChoosenCategories(`${tags[i].id}`)
            }
        }
    }

    highlightChoosenCategories(checkboxId) {

        let checkBox = document.getElementById(`${checkboxId}`);
        let label = document.querySelector(`[for=${checkboxId}]`);

        if (checkBox.checked == true) {
            label.style.background = 'var(--secundary_color_dark)'
        } else {
            label.style.background = 'var(--secundary_color_light)'
        }
    }
}

const _addPreQuestionService = new AddPredefinedService();
export default _addPreQuestionService;