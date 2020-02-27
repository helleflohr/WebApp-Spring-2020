// Imports the array with added questions to the game
class ArrayQuestionService {
    constructor() {
        this.gameInput = document.querySelector("#select-game");
        this.questionInput = document.querySelector("#newQuestion");
        this.gameRef = _db.collection('games');

        this.partyContentArray = [];
    }

    highlightNumber() {
        document.querySelector('[for=addedQuestions]').innerHTML = `Kurven <div id="numberOfRoundsAdded"> ${_arrayQuestionService.partyContentArray.length}</div>`
        document.querySelector('#numberOfRoundsAdded').classList.add('highlightAnimation');
    }

    createNewQuestion() {
        // console.log(this.gameInput.value)
        let gameInput = document.querySelector("#select-game");
        let questionInput = document.querySelector("#newQuestion");
        let newUserQuestion = {
            game: gameInput.value,
            questionContent: questionInput.value
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