export default class AddPredefinedPage {
    constructor() {
        this.template();
    }

    template() {
        document.querySelector('#content').innerHTML += /*html*/ `
        <input type="text">
        <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
        </select>
        `
    }
}