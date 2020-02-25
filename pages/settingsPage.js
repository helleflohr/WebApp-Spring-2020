import createPartyService from "./../services/createPartyService.js"

export default class SettingsPage {
  constructor() {
    // this.getThePartyId();
    this.template();
    this.slider();
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

				  <input type="text" id="myText" value="${this.partyId}">



				  <div class="toggle">
				  <input type="checkbox" class="check">
				  <b class="b switch"></b>
				  <b class="b track"></b>
				</div>

				<h1>Antal runder</h1>
        <div class="container">
  
        <h1>Range Slider Picture</h1>
        <div class="slidecontainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        <p>Value: <span id="demo"></span></p>
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
    let x = document.getElementById("myText").value;
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

  } }
  

  /*Slider med antal runder*/

  let slider = document.getElementById("myRange");
 let output = document.getElementById("demo");
  output.innerHTML = slider.value;
  
  slider.oninput = function() {
    output.innerHTML = this.value;
  }
  





    