document.addEventListener("DOMContentLoaded", function () {
    let paragraphs = [
        { text: "The quick brown fox jumps over the lazy dog.", time: 50 },
        { text: "This is a longer paragraph designed.", time: 100 },
        { text: "Typing games help improve speed and accuracy, making you more efficient at keyboard usage.", time: 100 },
        { text: "Practice makes perfect, and consistent effort leads to better results in typing speed and precision.", time: 100 }
    ];

    let currentIndex = 0;
    let timeRemaining;
    let startTime;
    let timer;
    let inputField = document.getElementById("inputText");
    let paragraphDisplay = document.getElementById("paragraph");
    let resultDiv = document.getElementById("result");
    let timerDiv = document.getElementById("timer");
    let startButton = document.getElementById("startButton");
    let restartButton = document.getElementById("restartButton");

    function startGame() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        loadParagraph();
    }

    function restartGame() {
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('welcomeScreen').style.display = 'block';
        currentIndex = 0;
    }

    function loadParagraph() {
        if (currentIndex >= paragraphs.length) {
            resultDiv.innerHTML = "🎉 Congratulations! You've completed all levels!";
            inputField.disabled = true;
            return;
        }

        let currentParagraph = paragraphs[currentIndex];
        timeRemaining = currentParagraph.time;
        paragraphDisplay.innerHTML = currentParagraph.text
            .split(" ")
            .map(word => `<span>${word}</span>`)
            .join(" ");
        inputField.value = "";
        resultDiv.innerHTML = "";
        timerDiv.textContent = timeRemaining;
        inputField.disabled = false;
        startTime = null;
        clearInterval(timer);
        
        fadeInElement(paragraphDisplay);
        slideInElement(inputField);
    }

    function startCountdown() {
        timer = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                timerDiv.textContent = timeRemaining;
                pulseTimer();
            } else {
                clearInterval(timer);
                resultDiv.innerHTML = "⏳ Time's up! Try again.";
                inputField.disabled = true;
            }
        }, 1000);
    }

    function fadeInElement(element) {
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.transition = "opacity 1s";
            element.style.opacity = 1;
        }, 100);
    }

    function slideInElement(element) {
        element.style.transform = "translateY(50px)";
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.transition = "transform 0.5s ease-out, opacity 0.5s";
            element.style.transform = "translateY(0)";
            element.style.opacity = 1;
        }, 200);
    }

    function pulseTimer() {
        timerDiv.style.animation = "pulse 0.5s";
        setTimeout(() => timerDiv.style.animation = "", 500);
    }

    function highlightText() {
        let userWords = inputField.value.split(" ");
        let correctWords = paragraphs[currentIndex].text.split(" ");
        let spans = paragraphDisplay.getElementsByTagName("span");

        for (let i = 0; i < spans.length; i++) {
            if (userWords[i] === undefined) {
                spans[i].className = "";
            } else if (userWords[i] === correctWords[i]) {
                spans[i].className = "correct";
            } else {
                spans[i].className = "incorrect";
            }
        }
    }

    inputField.addEventListener("input", function () {
        if (!startTime) {
            startTime = new Date();
            startCountdown();
        }

        highlightText();

        if (inputField.value === paragraphs[currentIndex].text) {
            let endTime = new Date();
            let timeTaken = (endTime - startTime) / 1000;
            let wordsPerMinute = (paragraphs[currentIndex].text.split(" ").length / timeTaken) * 60;
            resultDiv.innerHTML = `✅ Completed! <br> ⏳ Time Taken: ${timeTaken.toFixed(2)} seconds <br> ⚡ Typing Speed: ${wordsPerMinute.toFixed(2)} WPM`;
            clearInterval(timer);
            currentIndex++;

            setTimeout(loadParagraph, 2000);
        }
    });

    startButton.addEventListener("mouseover", function () {
        startButton.style.backgroundColor = "#ffcc00";
    });
    startButton.addEventListener("mouseout", function () {
        startButton.style.backgroundColor = "white";
    });

    restartButton.addEventListener("mouseover", function () {
        restartButton.style.backgroundColor = "#ff6666";
    });
    restartButton.addEventListener("mouseout", function () {
        restartButton.style.backgroundColor = "white";
    });

    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("restartButton").addEventListener("click", restartGame);
});
