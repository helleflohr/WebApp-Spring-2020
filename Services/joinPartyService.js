import createPartyService from "./../services/createPartyService.js"
// import loaderService from "./../services/loader.js"
class JoinPartyService {
    constructor() {
        this.partyRef = _db.collection("parties");
        this.theGroupId = createPartyService.partyId;
        this.dbId = ""

        this.listOfPlayers = [];

    }


    getThePartyId() {
        this.theGroupId = createPartyService.partyId;
        console.log(createPartyService.partyId)
        // document.querySelector('#myText').value = this.partyId;
    }
    // Checks if the inserted group ID excists in the database
    joinParty(nextPage) {
        let inputField = document.querySelector('#joinPartyId');
        this.partyRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {

                let party = doc.data();
                party.id = doc.id;

                // If the group excist, then continue
                if (inputField.value === party.theUniqueId) {
                    navigateTo(nextPage);
                    // console.log(inputField.value)
                    this.theGroupId = inputField.value;
                    this.dbId = party.id;
                    // let theGroupId = inputField.value;
                    console.log(this.dbId)
                }
            })
        })
    }
    createQuestion() {
        let categoriesInput = document.querySelector("#wichCategories");
        let gameInput = document.querySelector("#whichGame");
        let questionInput = document.querySelector("#newPreQuestion");
        let newPredefinedQuestion = {
            categories: [categoriesInput.value],
            game: gameInput.value,
            questionContent: questionInput.value
        }
        this.questionRef.add(newPredefinedQuestion);
    }


    addPlayers() {
        navigateTo('addQuestions');
        // loaderService.show(true);
        let myFriends = document.querySelectorAll('.myFriends');
        let moreFriends = document.querySelectorAll('.moreFriends');

        for (const friend of myFriends) {
            this.listOfPlayers.push(friend.value);
        }
        for (const friend of moreFriends) {
            this.listOfPlayers.push(friend.value);
        }
        // loaderService.show(false);
    }

    // Ad players from the inputfields into the parties collection in the database
    async addPlayersOld() {
        navigateTo('addQuestions');

        console.log(this.dbId)
        // this.getThePartyId();
        console.log(this.theGroupId)


        // MÅSKE I STEDET FOR AWAIT NEDENFOR - HVIS DET KAN KOMME TIL AT VIRKE - VIRKER IKKE NU
        // Create a query against the collection.
        // let query = this.partyRef.where("theUniqueId", "==", this.theGroupId);

        // query.get().then(snapshotData => {
        //     snapshotData.forEach(doc => {

        //         let party = doc.data();
        //         party.id = doc.id;
        //         console.log(this.theGroupId)
        //         this.dbId = party.id;
        //     })


        // console.log(query.data())
        // this.dbId = query.id;



        await this.partyRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {

                let party = doc.data();
                party.id = doc.id;
                console.log(this.theGroupId)
                // If the group excist, then continue
                if (this.theGroupId === party.theUniqueId) {
                    // console.log(inputField.value)
                    this.dbId = party.id;
                    // let theGroupId = inputField.value;
                    console.log(this.dbId)
                }
            })
        })
        console.log(this.dbId)

        let me = document.querySelector('#myName');
        let myFriends = document.querySelectorAll('.myFriends');
        let moreFriends = document.querySelectorAll('.moreFriends');
        console.log(myFriends)

        let listOfPlayers = [];
        listOfPlayers.push(me.value);
        for (const friend of myFriends) {
            listOfPlayers.push(friend.value);
        }
        for (const friend of moreFriends) {
            listOfPlayers.push(friend.value);
        }
        console.log(this.dbId)
        this.partyRef.doc(`${this.dbId}`).update({

            players: listOfPlayers

        })


    }

}
const joinPartyService = new JoinPartyService();
export default joinPartyService;