import createPartyService from "./../services/createPartyService.js"

export default class SettingsPage {
  constructor() {
    this.template();
    this.slider();
    // this.createPartyService = createPartyService;

  }

  template() {
    console.log(createPartyService)
    document.querySelector('#content').innerHTML += /*html*/ `
        <section id="settingsPage" class="page flexcontainer">

				  <input type="text" id="myText" value="${createPartyService.theId()}">



				  <div class="toggle">
				  <input type="checkbox" class="check">
				  <b class="b switch"></b>
				  <b class="b track"></b>
				</div>

				<h1>Antal runder</h1>

				<div class="slidecontainer">
					<br>
				  <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
						<br>
				  <p>Value: <span id="demo"></span></p>
            <br>
            <button class="btn" type="button" name="addPlayers" onclick="navigateTo(this.name)">Klar!</button>

				</div>
        </section>`
  }

  slider() {
    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function () {
      output.innerHTML = this.value;
    }
  }

  myFunction() {
    var x = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = x;
  }

  myText(length) {
    var x = document.getElementById("myText").value;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }




  /*Slider med antal runder*/


}