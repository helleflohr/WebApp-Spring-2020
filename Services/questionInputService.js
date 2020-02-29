class QuestionInputService {

    // Some games require more information, (options for a quiz | true or false questions)
    // This service holdes some functions for getting data from these extra add-question-input-fields

    // It works for both the predefined and the user generated questions ...
    // ... so this service is imported in the AddPreQuestionService & the ArrayNewQuestionService

    constructor() {
        this.addedValue = "";
        this.answerValue = "";
        this.status = "";

        // Array for the quiz answers/options-data
        this.arrOfAnswers = [];

        // Object to hold the information for new Predefined questions
        this.newPredefinedQuestion = {};

        // Object to hold the information for new user created questions
        this.newUserQuestion = {};


    }

    // Style the two opisite options (for example: truth or dare)
    styleWhichValue(thisCheckbox, theOtherCheckbox) {
        // The clicked checkbox
        let checkBoxForThisCheckbox = document.querySelector(`#${thisCheckbox}`);
        let labelForThisCheckbox = document.querySelector(`[for=${thisCheckbox}]`);

        // The opisite checkbox
        let otherCheckbox = document.querySelector(`#${theOtherCheckbox}`);
        let labelForOtherCheckbox = document.querySelector(`[for=${theOtherCheckbox}]`);

        if (checkBoxForThisCheckbox.checked == true) { // Based on which checkbox is checked ...

            // ... change the color of the labels ...
            labelForThisCheckbox.style.background = 'var(--secundary_color_dark)';
            labelForOtherCheckbox.style.background = 'var(--secundary_color_light)';

            // ... and set the other checkbox to false
            otherCheckbox.checked = false;

            // Set the name for the checkbox to the addedValue variable
            this.addedValue = checkBoxForThisCheckbox.name
        }
    }

    // If the game is a quiz this function will run, to get the data from the input fields
    getDataFromQuiz(number, preOrNot) {

        // Every answer/option has an id which starts with 'answer', then the number of the answer (1-4), and then which page it is on
        // Same applies for the connected correct and wrong checkboxes.

        let input = document.querySelector(`#answer${number}${preOrNot}`);
        let correct = document.querySelector(`#correct${number}${preOrNot}`);
        let wrong = document.querySelector(`#wrong${number}${preOrNot}`);

        if (correct.checked == true) { // If the option status is correct

            this.status = correct.name;

        } else if (wrong.checked == true) { // If the option status is wrong
            this.status = wrong.name;
        }

        this.answerValue = input.value // Add the option-content to the variable answerValue ...

        // ... before connecting the option value with the option status in an object.
        let differentOptions = {
            option: this.answerValue,
            status: this.status
        }

        this.arrOfAnswers.push(differentOptions); // Object is pushed into array of answers

    }

    // This function declares if extra information for a game is needed, and if yes, then what
    whichParameters(whichPage, gameSelectId) {

        let gameInput = document.querySelector(`#${gameSelectId}`); // The input field for games

        //-------------------------- if Truth or dare --------------------------//
        if (gameInput.value == 'vRD8Spl5fQ4AfTifPtRq') {

            //The object which should get an new property is based on which page
            if (whichPage == "") {
                this.newUserQuestion.truthOrDare = this.addedValue // Add the prop 'truthOrDare' with the value addedValue to the obejct 
            } else if (whichPage == 'PredefinedPage') {
                this.newPredefinedQuestion.truthOrDare = this.addedValue
            }

        }

        //-------------------------- if True or false --------------------------//
        if (gameInput.value == 'pfF2l2zwYDqcVCIjMlNr') {
            if (whichPage == "") {
                this.newUserQuestion.trueOrFalse = this.addedValue
            } else if (whichPage == 'PredefinedPage') {
                this.newPredefinedQuestion.trueOrFalse = this.addedValue
            }
        }

        //-------------------------- if Quiz --------------------------//
        if (gameInput.value == 'MEF7ah2clInWlmgNpg6M') {

            // Get the data from all four quiz-answers/options
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