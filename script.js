const typingText = document.querySelector(".typing-text p");
inpfeild = document.querySelector(".wrapper .input-feild")
mistakeTag = document.querySelector(".mistakes span")
timeTag = document.querySelector(".time span b")
wpmTag = document.querySelector(".wpm span ")
cpmTag = document.querySelector(".cpm span ")
TryAgainBtn = document.querySelector("button")

let timer,
    maxTime = 60,
    timLeft = maxTime,
    charIndex = mistakes = isTyping = 0;



function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerText = "";

    paragraphs[randomIndex].split("").forEach(span => {
        let spantag = `<span>${span}</span>`;
        typingText.innerHTML += spantag
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpfeild.focus());
    typingText.addEventListener("click", () => typingText.focus());

}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpfeild.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;

        }
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect")

        } else {

            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");

            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;

        }

        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timLeft)) * 60);

        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inpfeild.value = "";
        clearInterval(timer);
    }

}
function initTimer() {
    if (timLeft > 0) {
        timLeft--; 
        timeTag.innerText = timLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph();
    inpfeild.value = "";
    clearInterval(timer);
    timLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;

}
inpfeild.addEventListener("input", initTyping)
TryAgainBtn.addEventListener("click", resetGame)
