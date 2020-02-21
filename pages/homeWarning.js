export default class HomeWarningPage {
    constructor() {
        this.template();

    }

    template() {


        document.querySelector('#content').innerHTML += /*html*/ `
       <article id="home" class="page">
        <a href="#createPartyPage">
        <p>Drik ansvarligt gutter</p>
        <p>I drikker på eget ansvar, det skal vi ikke have noget med at gøre da!</p></a>
        </article>
        `;

    }
}