export default class HomeWarningPage {
    constructor() {
        this.template();

    }

    template() {


        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="home" class="page" >
        <button class="collectionOfItems btn" name="createPartyPage" onclick="navigateTo(this.name)">
     <h1>Drik ansvarligt gutter</h1>
         Husk at drikke vand, for det er jer der skal passe på jer selv
         </button>
        </article>
        `;

    }
}