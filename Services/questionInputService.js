class QuestionInputService {
    constructor() {
        this.addedValue = "";
        this.answerValue = "";
        this.status = "";
        this.arrOfAnswers = [];


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



}
const questionInputService = new QuestionInputService();
export default questionInputService;