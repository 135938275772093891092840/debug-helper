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

    var actualArray = [];
    var actualLineArray = [];

    var skipDurationActual = 0;

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

    for (let i=0; i<expectedArray.length; i++) {
        let line = document.createElement("p");
    
        if (expectedArray[i].length == 0) {
            let line = document.createElement("br")
            expectedDisplay.appendChild(line);
        } else {
            for (let j=0; j<expectedArray[i].length; j++) {
                let textContent; 
    
                let textBg = document.createElement("span");
    
                if (expectedArray[i][j] == " ") {
                    textContent = document.createTextNode("\xa0")
                } else {
                    textContent = document.createTextNode(expectedArray[i][j])
                }
                
                textBg.appendChild(textContent)
                
                if (expectedArray[i][j] != expectedArray[i][j]) {
                        textBg.style.cssText = "background-color:#EB4747;"
                } 
    
                line.appendChild(textBg);
            }
        }
        
        expectedDisplay.appendChild(line)
    }

    for (let i=0; i<actualArray.length; i++) {
        let line = document.createElement("p");

        if (actualArray[i].length == 0) {
            let line = document.createElement("br")
            actualDisplay.appendChild(line);
        } else {
            for (let j=0; j<actualArray[i].length; j++) {
                let textContent; 
    
                let textBg = document.createElement("span");
    
                if (actualArray[i][j] == " ") {
                    textContent = document.createTextNode("\xa0")
                } else {
                    textContent = document.createTextNode(actualArray[i][j])
                }
                
                textBg.appendChild(textContent)
                
                if (actualArray[i][j] != expectedArray[i][j]) {
                        textBg.style.cssText = "background-color:#EB4747;"
                } 
    
                line.appendChild(textBg);
            }
        }
        
        actualDisplay.appendChild(line)
    }
}

