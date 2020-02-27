import questionInputService from "./questionInputService.js"
// Imports the array with added questions to the game
class ArrayQuestionService {
    constructor() {
        this.gameInput = document.querySelector("#select-game");
        this.questionInput = document.querySelector("#newQuestion");
        this.gameRef = _db.collection('games');

        this.partyContentArray = [];

        this.theIdRef = "";
    }

    highlightNumber() {
        document.querySelector('[for=addedQuestions]').innerHTML = `Kurven <div id="numberOfRoundsAdded"> ${_arrayQuestionService.partyContentArray.length}</div>`
        document.querySelector('#numberOfRoundsAdded').classList.add('highlightAnimation');
    }

    generateIdForOwnQuestions() {

        // https://gist.github.com/gordonbrander/2230317
        // Geerer et "unikt" id til de egne tilføjede spil
        // Date.now returns the number of milliseconds since 01.01.1970.
        // + a ramdom number from 0 up to 1
        // toString(36) takes a binary number and translates it to text by Base 36
        // substr(2) gets the rest of the string besides the 2 first caracters (this including a dot which is not welcome in our id)
        let uniqueId = Date.now() + Math.random().toString(36).substr(2);

        // So now we get an id with numbers (from milliseconds sice 1970) and some text (from a random generated number)
        this.theIdRef = uniqueId;

    }

    createNewQuestion() {
        this.generateIdForOwnQuestions();

        // console.log(this.gameInput.value)
        let gameInput = document.querySelector("#select-game");
        let questionInput = document.querySelector("#newQuestion");
        questionInputService.newUserQuestion = {
            game: gameInput.value,
            questionContent: questionInput.value,
            idRef: `i${this.theIdRef}`
        }


        questionInputService.whichParameters('', 'this.newUserQuestion', 'select-game');

        this.partyContentArray.push(questionInputService.newUserQuestion)
        console.log(this.partyContentArray)

        this.highlightNumber()
        document.querySelector("#newQuestion").value = "";
        console.log(this.partyContentArray)

    }

}
const _arrayQuestionService = new ArrayQuestionService;
export default _arrayQuestionService;