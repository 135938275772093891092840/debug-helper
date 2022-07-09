var input;
var expected;
var actual;


var form = document.getElementById('textform');


document.getElementById("section").style.display = "none";


form.addEventListener('submit', (event) => {
    event.preventDefault();

    form.style.display = "none";
    document.getElementById("section").style.display = "flex";

    userInputElement = document.getElementById("userInput").value;

    input = userInputElement;

    process();
});




//Reference
var expectedDisplay = document.getElementById('expected');
var actualDisplay = document.getElementById('actual');

//Working with input
function process() {
    var expectedStartingIndex = input.indexOf("Expected:")
    var actualStartingIndex = input.indexOf("Actual:")

    expected = input.slice(expectedStartingIndex+9,actualStartingIndex)

    actual = input.slice(actualStartingIndex+7,input.length)

    var expectedArray = [];
    var expectedLineArray = [];

    var skipDurationExpected = 0;
    var sameLineCountExpected = 0;

    for (let i=0; i<expected.length; i++) {
        if (skipDurationExpected == 0) {
            if (expected[i] == "%") {
                if (expected[i+1] == "0") {
                    if (expected[i+2] == "A") {
                        expectedArray.push(expectedLineArray);
                        skipDurationExpected = 2;
                        expectedLineArray = [];
                    }
                }
            } else {
                expectedLineArray.push(expected[i]) 
            }

        } else {
            skipDurationExpected--;
        }

        if (i == expected.length-1) {
            expectedArray.push(expectedLineArray);
            expectedLineArray = [];
        }
    }

    for (let i=0; i<expectedArray.length; i++) {
        let line = document.createElement("p");

        for (let j=0; j<expectedArray[i].length; j++) {
            let text;

            if (expectedArray[i][j] == " ") {
                text = document.createTextNode("\xa0")
            } else {
                text = document.createTextNode(expectedArray[i][j])
            }

            line.appendChild(text);
        }
        
        expectedDisplay.appendChild(line)
    }

    var actualArray = [];
    var actualLineArray = [];

    var skipDurationActual = 0;
    var sameLineCountActual = 0;

    for (let i=0; i<actual.length; i++) {
        if (skipDurationActual == 0) {
            if (actual[i] == "%") {
                if (actual[i+1] == "0") {
                    if (actual[i+2] == "A") {
                        actualArray.push(actualLineArray);
                        skipDurationActual = 2;
                        actualLineArray = [];
                    }
                }
            } else {
                actualLineArray.push(actual[i]) 
            }

        } else {
            skipDurationActual--;
        }

        if (i == actual.length-1) {
            actualArray.push(actualLineArray);
            actualLineArray = [];
        }
    }

    for (let i=0; i<actualArray.length; i++) {
        let line = document.createElement("p");

        for (let j=0; j<actualArray[i].length; j++) {
            let text;

            if (actualArray[i][j] == " ") {
                text = document.createTextNode("\xa0")
            } else {
                text = document.createTextNode(actualArray[i][j])
            }

            if (actualArray[i][j] != expectedArray[i][j]) {
                line.style.cssText = "background-color:#EB4747;"
            }

            line.appendChild(text);
        }
        
        actualDisplay.appendChild(line)
    }
}

