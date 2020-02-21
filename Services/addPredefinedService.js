class AddPredefinedService {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.createQuestion();
    }

    createQuestion() {
        let categoriesInput = document.querySelector("#wichCategories");
        let gameInput = document.querySelector("#whichGame");
        let questionInput = document.querySelector("#newPreQuestion");
        console.log(categoriesInput.value, gameInput.value, questionInput.value);

        let newPredefinedQuestion = {
            categories: [categoriesInput.value],
            game: gameInput.value,
            questionContent: questionInput.value
        }

        questionRef.add(newPredefinedQuestion);


    }

    template() {
        console.log(this.questionRef);
        //     document.querySelector('#test').innerHTML += /*html*/ `
        //    <p>${this.questionRef}</p>
        //     `;
    }


}

const _addQuestionService = new AddPredefinedService();
export default _addQuestionService;