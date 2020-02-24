class JoinPartyService {
    constructor() {
        this.partyRef = _db.collection("parties");
        this.theGroupId = ""
        this.dbId = ""

    }

    // Checks if the inserted group ID excists in the database
    joinParty(nextPage) {
        let inputField = document.querySelector('#joinPartyId');
        this.partyRef.onSnapshot(snapshotData => {
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

    // Ad players from the inputfields into the parties collection in the database
    addPlayers() {
        console.log(this.dbId)
        let me = document.querySelector('#myName');
        let myFriends = document.querySelectorAll('.myFriends');

        let listOfPlayers = [];
        listOfPlayers.push(me.value);
        for (const friend of myFriends) {
            listOfPlayers.push(friend.value);

        }

        this.partyRef.doc(`${this.dbId}`).update({

            players: listOfPlayers

        })

    }

}
const joinPartyService = new JoinPartyService();
export default joinPartyService;