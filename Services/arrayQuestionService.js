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
            <input id="info" class="hide" type="checkbox" onclick="showRules()"><label id="infoLabel" class="btn" for="info"></label>
            <section class="hide" id="rules"><h2>Regler for ${this.curGame}</h2>
            <p>${this.curRule}</p></section>
                
            <div class="${gameId}">${gameData.gametitle} <br>${partyContentArray.questionContent}</div>
            `




            })
        });
        document.querySelector('#gameContainer').innerHTML = questionList;

    }


}
const _arrayQuestionService = new ArrayQuestionService;
export default _arrayQuestionService;