export default class HomeWarningPage {
    constructor() {
        this.template();

    }

    // HTML-template for the home "page" with the warning
    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="home" class="page" >
        <div class="collectionOfItems btn" id="warning" >
     <h1>Drik ansvarligt folkens!</h1><br>
     <b class="bold">Mor er her ikke</b> til at sige I skal huske at drikke vand, så ved brug af dette spil, accepterer du at brug af spillet foregår under eget ansvar.
         </div>
         <button class="btn" name="settingsPage" onclick="navigateTo(this.name)">Start</button>
        </article>
        `;
    }
}