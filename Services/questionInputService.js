class QuestionInputService {

    // This service is imported to AddPreQuestionService & ArrayNewQuestionService

    constructor() {
        this.addedValue = "";
        this.answerValue = "";
        this.status = "";
        this.arrOfAnswers = [];

        this.newPredefinedQuestion = {};
        this.newUserQuestion = {};


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

        let differentOptions = {
            option: this.answerValue,
            status: this.status
        }
        this.arrOfAnswers.push(differentOptions);

    }

    whichParameters(whichPage, gameSelectId) {
        let gameInput = document.querySelector(`#${gameSelectId}`);

        if (gameInput.value == 'vRD8Spl5fQ4AfTifPtRq') { //Sandhed eller konsekvens
            if (whichPage == "") {
                this.newUserQuestion.truthOrDare = this.addedValue
            } else if (whichPage == 'PredefinedPage') {
                this.newPredefinedQuestion.truthOrDare = this.addedValue
            }

        }
        if (gameInput.value == 'pfF2l2zwYDqcVCIjMlNr') { //Sandt eller falsk
            if (whichPage == "") {
                this.newUserQuestion.trueOrFalse = this.addedValue
            } else if (whichPage == 'PredefinedPage') {
                this.newPredefinedQuestion.trueOrFalse = this.addedValue
            }
        }
        if (gameInput.value == 'MEF7ah2clInWlmgNpg6M') { //Quiz
            this.getDataFromQuiz('1', `${whichPage}`);
            this.getDataFromQuiz('2', `${whichPage}`);
            this.getDataFromQuiz('3', `${whichPage}`);
            this.getDataFromQuiz('4', `${whichPage}`);

            if (whichPage == "") {
                this.newUserQuestion.answerOptions = this.arrOfAnswers;
            } else if (whichPage == 'PredefinedPage') {
                this.newPredefinedQuestion.answerOptions = this.arrOfAnswers;
            }
        }
    }



}
const _questionInputService = new QuestionInputService();
export default _questionInputService;