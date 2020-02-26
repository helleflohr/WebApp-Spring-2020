class QuestionInputService {
    constructor() {


    }
    styleTruthOrDare(checkboxTrue, checkboxDare) {
        let checkBoxForTrue = document.querySelector(`#${checkboxTrue}`);
        console.log(checkBoxForTrue)
        let trueLabel = document.querySelector(`[for=${checkboxTrue}]`);
        console.log(trueLabel)
        let checkBoxForDare = document.querySelector(`#${checkboxDare}`);
        let dareLabel = document.querySelector(`[for=${checkboxDare}]`);
        console.log(checkBoxForTrue.checked)
        if (checkBoxForTrue.checked == true) {
            console.log(checkBoxForTrue.checked)
            console.log('true er checked')
            trueLabel.style.background = '#125451';
            dareLabel.style.background = '#000001';
            checkBoxForDare.checked = false;
        }

    }

    // getTruthOrDare(checkboxTrue, checkboxDare) {



    //     /* <input id="truth" type="checkbox"><label for="truth">Sandhed</label>
    //             <input id="dare" type="checkbox"><label for="dare">Konsekvens</label> */
    // }
}
const questionInputService = new QuestionInputService();
export default questionInputService;