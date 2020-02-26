class QuestionInputService {
    constructor() {


    }
    styleTruthOrDare(thisCheckbox, theOtherCheckbox) {
        let checkBoxForThisCheckbox = document.querySelector(`#${thisCheckbox}`);
        let labelForThisCheckbox = document.querySelector(`[for=${thisCheckbox}]`);
        let otherCheckbox = document.querySelector(`#${theOtherCheckbox}`);
        let labelForOtherCheckbox = document.querySelector(`[for=${theOtherCheckbox}]`);

        if (checkBoxForThisCheckbox.checked == true) {
            labelForThisCheckbox.style.background = 'var(--secundary_color_dark)';

            labelForOtherCheckbox.style.background = 'var(--secundary_color_light)';
            otherCheckbox.checked = false;
        } else if (otherCheckbox.checked == true) {
            labelForOtherCheckbox.style.background = 'var(--secundary_color_dark)';

            labelForThisCheckbox.style.background = 'var(--secundary_color_light)';
            checkBoxForThisCheckbox.checked = false;
        }


    }

    // getTruthOrDare(checkboxTrue, checkboxDare) {



    //     /* <input id="truth" type="checkbox"><label for="truth">Sandhed</label>
    //             <input id="dare" type="checkbox"><label for="dare">Konsekvens</label> */
    // }
}
const questionInputService = new QuestionInputService();
export default questionInputService;