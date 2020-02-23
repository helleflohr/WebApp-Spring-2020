class AddPredefinedService {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.createQuestion();
    }

    // Create a question in the database based on the input from the input fields  DOUBLE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
}

const _addQuestionService = new AddPredefinedService();
export default _addQuestionService;