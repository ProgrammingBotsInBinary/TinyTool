// Tabs Color Change
let tabLabels = document.getElementsByClassName('tab-label');
let radioButtons = document.getElementsByClassName('tab');

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
