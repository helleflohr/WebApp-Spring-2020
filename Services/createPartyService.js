class CreatePartyService {

    constructor() {
        this.partyRef = _db.collection("parties");
        this.partyId = "id";

    }

    createParty() {
        console.log(this.partyId)
        this.generateId();
        // this.generateId();
        let newParty = {
            theUniqueId: this.partyId,
            players: [],
            questions: [],
            title: ""
        }
        console.log(this.partyId)
        this.partyRef.add(newParty);
        // return this.partyId;
        this.theId();
        console.log(this.partyId)
    }

    generateId() {
        // https://gist.github.com/gordonbrander/2230317
        let uniqueId = Date.now() + Math.random().toString(36).substr(2, 6);
        uniqueId = uniqueId.slice(9);
        this.partyId = uniqueId;
        console.log(this.partyId)

    }

    theId() {
        console.log(this.partyId)
        return this.partyId;
    }


}

const createPartyService = new CreatePartyService();
export default createPartyService;

// createCategoryOptions() {
//     this.categoryRef.onSnapshot(snapshotData => {
//         snapshotData.forEach(doc => {

//             let category = doc.data();
//             category.id = doc.id;

//             let categoriyCheckboxes = document.querySelector("#wichCategories");

//             categoriyCheckboxes.innerHTML += /*html*/ `
//             <input type="checkbox" id="${category.id}" name="${category.contentCategory}" value="${category.id}">
//             <label for="${category.id}">${category.contentCategory}</label>

//             <br>
//             `

//             // let listOfCategories = document.getElementById("wichCategories");

//             // listOfCategories.add(new Option(category.contentCategory, category.id));
//         });

//     });
// }