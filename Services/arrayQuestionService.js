class ArrayQuestionService {
    constructor() {
        this.gameInput = document.querySelector("#select-game");
        this.questionInput = document.querySelector("#newQuestion");
        this.gameRef = _db.collection('games');

        this.partyContentArray = [];
    }

    createNewQuestion() {
        let newUserQuestion = {
            game: this.gameInput.value,
            questionContent: this.questionInput.value
        }
        this.partyContentArray.push(newUserQuestion)
        console.log(this.partyContentArray)

        this.highlightNumber()
        document.querySelector("#newQuestion").value = "";
        console.log(this.partyContentArray)

    }

}
const _arrayQuestionService = new ArrayQuestionService;
export default _arrayQuestionService;