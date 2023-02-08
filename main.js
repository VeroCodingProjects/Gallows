const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const gallowImages = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "https://t3.ftcdn.net/jpg/01/84/91/74/360_F_184917449_2UTmC5D609xMxaAyqGDzfNUt64CnOdFG.jpg", "https://fsb.zobj.net/crop.php?r=yDx9wB7yqfbxfzAok8T8bXK7tvVg7P24mhDNXvW32TKa1Vt9giET2X0_OQCBlI4gVTXFM3ShDs4xziVel1j0l1R1UY-xbs-wihPXPU4QW7FIGBvrBBGnkf-U-tn5oEylzKRJLNhcVeUBr3jisoCJOT5dOKKISBC2gAJznCClBiX2REVOTkQbbHtVBug"];
let encryptedWord = [];
let startPage = document.getElementById("word-input");
let gallowsPage = document.getElementById("word-guessing");
let wordToGuess;
let mismatchedLetters = 0;

// at each point in the game, the second player can reset the game
restart.onclick = () => {
    location.reload(); 
}

// determines if the word is complete or still encrypted
// depending on the situation, one image is displayed
function allLettersMatch(encryptedWord) {
    let allLetters = 1;
    for (let i = 0; i <= encryptedWord.length; ++i) {
        if (encryptedWord[i] == " _ ") {
            allLetters = 0;
        }
    }
    if (allLetters == 1) {
        mismatchedLetters = 8;
        gameOver(mismatchedLetters);
    }
}

// if the id of the clicked button matches one letter of the word
// the letter will be displayed
// we return the truth of the condition in order to change/not change the image
function completeWord(id) {
    let letterMatch = 0;
    for (let i = 0; i < wordToGuess.length; ++i) {
        if (wordToGuess[i].toLowerCase() == id.toLowerCase()) {
            encryptedWord[i] = id;
            letterMatch = 1;
        };
    }
    return letterMatch;
}

// if all the letters in the word are matched, the game will be over
// if all the lifes are wasted, the game is also over
function countLifes(letterMatch) {
    if (letterMatch == 0) {
        ++mismatchedLetters;
        if (mismatchedLetters == 8) {
            mismatchedLetters = 9;
            gameOver(mismatchedLetters);
        }
    }
    allLettersMatch(encryptedWord);
}

// displayes the letters of the alphabet as buttons
// adds functionality to the buttons
function displayAlphabet() {
    for (let i = 0; i < alphabet.length; ++i) {
        const currentButton = document.createElement("button");
        letters.appendChild(currentButton);
        currentButton.innerHTML = alphabet[i];
        currentButton.id = alphabet[i];
        currentButton.addEventListener("click", ()=> playerGuess(currentButton.id));
        currentButton.className = "btn btn-light";
    }
}

// for each wrong letter, the man is closer to his death
function displayImages(mismatchedLetters) {
    images.src = gallowImages[mismatchedLetters];
}

// for each letter in the word, a " _ " will be displayed
function encryptLetters(wordToGuess) {
    for (let i = 0; i < wordToGuess.length; ++i) {
        encryptedWord.push(" _ ");
    }
}

// displaying only the reset button and the last image if the game is over
function gameOver(mismatchedLetters) {
    displayImages(mismatchedLetters);
    encrypted.style.display = "none";
    letters.style.display = "none";
}

// if the button was clicked once, it will be hidden
function markButton(id) {
    document.getElementById(id).style.display = "none";
}

// this is the main function of the game
// for each clicked button:
// the encrypted word will be completed if it is the case
// hides the clicked button
// checks the status of the game
// displays the proper image
function playerGuess(letter) {
    encrypted.innerHTML = "";
    let matchingLetters = completeWord(letter);
    markButton(letter);
    statusWord();
    countLifes(matchingLetters);
    displayImages(mismatchedLetters);
}

// hides the page of the player one and displays the elements needed to start the game
function startGame(startPage) {
    wordToGuess = startPage.input.value;
    switchDisplay();
    encryptLetters(wordToGuess);
    statusWord();
    displayAlphabet();
    displayImages(mismatchedLetters);
}

// rewrites the word at each button press if a letter is found
function statusWord() {
    for (let i = 0; i < encryptedWord.length; ++i) {
        encrypted.innerText += encryptedWord[i];
    }   
}

// hides the startPage tab and startd the game for gallowsPage
function switchDisplay() {
    startPage.style.display = "none";
    gallowsPage.style.display = "block";
}