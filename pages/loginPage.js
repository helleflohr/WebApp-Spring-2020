export default class LoginPage {
    constructor() {
        this.template();
    }

    template() {

        document.querySelector('#content').innerHTML += /*html*/ `
        <section id="login" class="page flexcontainer">
    <button class="btn" name="home" onclick="navigateTo(this.name)">Hurtigt i gang</button>
        <article id="firebaseui-auth-container"></article>
        </section>`
    }
}