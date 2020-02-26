class QuestionInputService {
    constructor() {
        this.truthOrDare = "";


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

            this.truthOrDare = checkBoxForThisCheckbox.name

        } else if (otherCheckbox.checked == true) {
            labelForOtherCheckbox.style.background = 'var(--secundary_color_dark)';

            labelForThisCheckbox.style.background = 'var(--secundary_color_light)';
            checkBoxForThisCheckbox.checked = false;
        }

        console.log(this.truthOrDare)

    }


}
const questionInputService = new QuestionInputService();
export default questionInputService;