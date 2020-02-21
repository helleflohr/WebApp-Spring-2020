export default class HomeWarningPage {
    constructor() {
        this.template();

    }

    template() {


        document.querySelector('#content').innerHTML += /*html*/ `
        <article id="home" class="page">
        <a href="#addPredefinded">Drik ansvarligt gutter</a>
        </article>
        `;

    }
}