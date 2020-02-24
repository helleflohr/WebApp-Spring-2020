export default class HomeWarningPage {
    constructor() {
        this.template();

    }

    // HTML-template for the home "page" with the warning
    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="home" class="page" >
        <button class="collectionOfItems btn" name="createPartyPage" onclick="navigateTo(this.name)">
     Drik ansvarligt folkens!
     <b class="bold">Mor er her ikke</b> til at sige I skal huske at drikke vand, så ved brug af dette spil, accepterer du at brug af spillet foregår under eget ansvar.
    
         </button>
        </article>
        `;
    }
}