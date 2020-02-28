import createPartyService from "./../services/createPartyService.js"

export default class SettingsPage {
  constructor() {
    // this.getThePartyId();

    this.rangeSlider = document.getElementById("rs-range-line");
    this.rangeBullet = document.getElementById("rs-bullet");

    this.template();

    // this.rangeSlider();
    // this.createPartyService = createPartyService;
    // this.partyId = "";

  }

  getThePartyId() {
    this.partyId = createPartyService.partyId;
    console.log(createPartyService.partyId)
    document.querySelector('#myText').value = this.partyId;
  }

  template() {
    console.log(createPartyService)
    document.querySelector('#content').innerHTML += /*html*/ `
      <section id="settingsPage" class="page flexcontainer">
        <button class="idButton">Paty Game Id</button>

			  <input type="text" id="myText" value="${this.partyId}">

				<h3 id="antalRunder"  >Antal runder</h3>
        <div class="container">
        
        <div class="rangeSlider">
        <span id="rs-bullet" class="rs-label">0</span>
        <input id="rs-range-line" class="rs-range" type="range" value="0" min="0" max="200">
        </div>

        <div class="box-minmax">
        <span>0</span><span>200</span>
        </div>

        </div>


        <h3>vælg sprog</h3>
        <label class="toggleLang">
        <input type="checkbox" id="dabox" class="star">
        <span   class="sliderLang"></span>
        </label>
        
        <button class="btn btnSettings" name="addPlayers" onclick="navigateTo(this.name)">Fortsæt</button>

      </section>`
  }

  rangeSlider() {
    let rangeSlider = document.getElementById("rs-range-line");

    rangeSlider.addEventListener("input", this.showSliderValue, false);
  }

  showSliderValue() {
    let rangeBullet = document.getElementById("rs-bullet");
    rangeBullet.innerHTML = rangeSlider.value;
    var bulletPosition = (rangeSlider.value / rangeSlider.max);
    let theBulletPosition = bulletPosition * 578
    rangeBullet.style.left = `${theBulletPosition}px`;
  }


  showSliderValue() {
    this.rangeBullet.innerHTML = rangeSlider.value;
    var bulletPosition = (rangeSlider.value / rangeSlider.max);
    rangeBullet.style.left = (bulletPosition * 578) + "px";
  }
  //slider() {
  //let slider = document.getElementById("myRange");
  //let output = document.getElementById("demo");
  //output.innerHTML = slider.value;

  //slider.oninput = function () {
  /// output.innerHTML = this.value;
  //}
  // }

  myFunction() {
    let x = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = x;
  }

  myText(length) {
    let x = document.getElementById("idButton").value;
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  }
}