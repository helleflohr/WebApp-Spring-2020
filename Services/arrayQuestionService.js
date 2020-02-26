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

    gameName() {
        let questionList = "";
        this.partyContentArray.forEach(async question => {
            let gameId = question.game;

            console.log(gameId);
            await this.gameRef.doc(`${gameId}`).get().then(doc => {
                let gameData = doc.data()
                questionList += /*html*/ `
                
            <div class="${gameId}">${gameData.gametitle} <br>${partyContentArray.questionContent}</div>
            `

            })
        });
        document.querySelector('#gameContainer').innerHTML = questionList;

    }


}
const _arrayQuestionService = new ArrayQuestionService;
export default _arrayQuestionService;