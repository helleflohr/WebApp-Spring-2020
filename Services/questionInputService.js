class QuestionInputService {
    constructor() {
        this.addedValue = "";
        this.answerValue = "";
        this.status = "";
        this.arrOfAnswers = [];

        this.newPredefinedQuestion = {};
        this.questionSet = {};


    }
    styleWhichValue(thisCheckbox, theOtherCheckbox) {
        let checkBoxForThisCheckbox = document.querySelector(`#${thisCheckbox}`);
        let labelForThisCheckbox = document.querySelector(`[for=${thisCheckbox}]`);
        let otherCheckbox = document.querySelector(`#${theOtherCheckbox}`);
        let labelForOtherCheckbox = document.querySelector(`[for=${theOtherCheckbox}]`);

        if (checkBoxForThisCheckbox.checked == true) {
            labelForThisCheckbox.style.background = 'var(--secundary_color_dark)';

            labelForOtherCheckbox.style.background = 'var(--secundary_color_light)';
            otherCheckbox.checked = false;

            this.addedValue = checkBoxForThisCheckbox.name

        } else if (otherCheckbox.checked == true) {
            labelForOtherCheckbox.style.background = 'var(--secundary_color_dark)';

            labelForThisCheckbox.style.background = 'var(--secundary_color_light)';
            checkBoxForThisCheckbox.checked = false;
        }

        console.log(this.addedValue)

    }

    getDataFromQuiz(number, preOrNot) {
        let input = document.querySelector(`#answer${number}${preOrNot}`);
        let correct = document.querySelector(`#correct${number}${preOrNot}`);
        let wrong = document.querySelector(`#wrong${number}${preOrNot}`);

        if (correct.checked == true) {

            this.status = correct.name;

        } else if (wrong.checked == true) {
            this.status = wrong.name;
        }

        this.answerValue = input.value
        console.log(this.status, this.answerValue)

        let differentOptions = {
            option: this.answerValue,
            status: this.status
        }
        this.arrOfAnswers.push(differentOptions);

    }

    whichParameters(whichPage, wichObject) {
        let gameInput = document.querySelector("#whichGame");

        if (gameInput.value == 'vRD8Spl5fQ4AfTifPtRq') { //Sandhed eller konsekvens
            this.newPredefinedQuestion.truthOrDare = this.addedValue
        }
        if (gameInput.value == 'pfF2l2zwYDqcVCIjMlNr') { //Sandt eller falsk
            this.newPredefinedQuestion.trueOrFalse = this.addedValue
        }
        if (gameInput.value == 'MEF7ah2clInWlmgNpg6M') { //Quiz
            this.getDataFromQuiz('1', `${whichPage}`);
            this.getDataFromQuiz('2', `${whichPage}`);
            this.getDataFromQuiz('3', `${whichPage}`);
            this.getDataFromQuiz('4', `${whichPage}`);

            wichObject.answerOptions = this.arrOfAnswers;
            // newPredefinedQuestion
        }
    }



}
const questionInputService = new QuestionInputService();
export default questionInputService;