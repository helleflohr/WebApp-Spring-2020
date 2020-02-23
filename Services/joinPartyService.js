class JoinPartyService {
    constructor() {
        this.partyRef = _db.collection("parties");
        this.theGroupId = ""
        this.dbId = ""

    }
    joinParty(nextPage) {

        let inputField = document.querySelector('#joinPartyId');
        this.partyRef.onSnapshot(snapshotData => {
            snapshotData.forEach(doc => {

                let party = doc.data();
                party.id = doc.id;


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

    addPlayers() {
        console.log(this.dbId)
        let me = document.querySelector('#myName');
        let myFriends = document.querySelectorAll('.myFriends');

        let listOfPlayers = [];
        listOfPlayers.push(me.value);
        for (const friend of myFriends) {
            listOfPlayers.push(friend.value);

        }

        // document.querySelector('#playerInput').forEach() {
        //     listOfPlayers.push(value)
        // }

        console.log(listOfPlayers)

        this.partyRef.doc(`${this.dbId}`).update({

            players: listOfPlayers

        })

    }

}
const joinPartyService = new JoinPartyService();
export default joinPartyService;