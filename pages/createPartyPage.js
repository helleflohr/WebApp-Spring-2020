export default class CreatePartyPage {
    constructor() {
        this.template();
    }

    template() {
        document.querySelector('#content').innerHTML = /*html*/ `
        <article id="createPartyPage" class="page">
        <a href="#addPredefinded">Link</a>
         </article>
         `;
    }
}