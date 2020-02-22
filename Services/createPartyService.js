class CreatePartyService {

    constructor() {

    }

    createParty() {
        let categoriesInput = document.querySelector("#wichCategories");
        let gameInput = document.querySelector("#whichGame");
        let questionInput = document.querySelector("#newPreQuestion");
        let newParty = {
            id: categoriesInput.value,
            players: [gameInput.value],
            questions: [questionInput.value],
            title: title
        }
        this.questionRef.add(newParty);
    }
}