// Tabs Color Change
let tabLabels = document.getElementsByClassName('tab-label');
let radioButtons = document.getElementsByClassName('tab');
let abstractFactoryBtn = document.getElementById('abstract-factory');

window.onload = function () {
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked == true) {
            tabLabels[i].style.backgroundColor = '#070708';
            tabLabels[i].style.color = 'white';
            tabLabels[i].style.border = '1px solid white';
            break;
        }
    }
}

for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function (e) {
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked == true) {
                tabLabels[i].style.backgroundColor = '#070708';
                tabLabels[i].style.color = 'white';
                tabLabels[i].style.border = '1px solid white';
            }
            else {
                tabLabels[i].style.backgroundColor = '#fff';
                tabLabels[i].style.color = '#333';
            }
        }
   })
}

function loadFormsPage(type){
    console.log(type);

    //fetch(__dirname + "/views/help.html");
    // window.location.href = __dirname + '/views/help.html';

    var fs = require('fs');
    fs.readFile( __dirname + '/views/help.html', function (err, data) {
        if (err) {
            throw err; 
        }
    //console.log(data.toString());
    });
}



