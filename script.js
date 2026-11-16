const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");

const quizOverlay = document.getElementById("quizOverlay");
const quizForm = document.getElementById("quizForm");

const feedback = document.getElementById("feedback");
const submitBtn = document.getElementById("submitBtn");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

let unlocked = false;
let currentQuestion = 1;
let checkingAnswer = false;

// Correct answers
const answers = {
    q1: "C",
    q2: "B",
    q3: "A"
};

// Open quiz or letter
openBtn.addEventListener("click", function() {

    if (!unlocked) {
        quizOverlay.hidden = false;
    } else {
        toggleLetter();
    }

});

// Check selected answer
quizForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (checkingAnswer) return;

    const questionName = "q" + currentQuestion;

    const selected = document.querySelector(
        `input[name="${questionName}"]:checked`
    );

    const activeQuestion = document.getElementById(
        "question" + currentQuestion
    );

    // Require an answer
    if (!selected) {

        feedback.textContent =
            "Please choose an answer first! 💗";

        activeQuestion.classList.add("shake-question");

        setTimeout(() => {
            activeQuestion.classList.remove("shake-question");
        }, 400);

        return;
    }

    const selectedLabel = selected.closest("label");

    // Correct answer
    if (selected.value === answers[questionName]) {

        checkingAnswer = true;

        selectedLabel.classList.add("correct");

        feedback.textContent = "Correct! Well done! 💕";

        submitBtn.disabled = true;

        setTimeout(function() {

            if (currentQuestion < 3) {

                activeQuestion.classList.remove("active");

                currentQuestion++;

                const nextQuestion = document.getElementById(
                    "question" + currentQuestion
                );

                nextQuestion.classList.add("active");

                // Update progress
                progressText.textContent =
                    `Question ${currentQuestion} of 3`;

                progressFill.style.width =
                    (currentQuestion / 3 * 100) + "%";

                feedback.textContent = "";

                submitBtn.textContent = "Check Answer 💕";

                submitBtn.disabled = false;

                checkingAnswer = false;

            } else {

                // All questions completed
                quizOverlay.hidden = true;

                unlocked = true;

                document.getElementById("status").textContent =
                    "You answered everything correctly! Your letter is unlocked! ♡";

                openBtn.textContent = "💌 Open My Letter";

                checkingAnswer = false;

            }

        }, 800);

    } else {

        // Wrong answer animation
        selectedLabel.classList.remove("wrong");

        void selectedLabel.offsetWidth;

        selectedLabel.classList.add("wrong");

        feedback.textContent =
            "Oops! That's incorrect. Try again! 💗";

    }

});

// Remove red marking when another answer is selected
quizForm.addEventListener("change", function(event) {

    if (event.target.type === "radio") {

        const activeQuestion = document.getElementById(
            "question" + currentQuestion
        );

        activeQuestion.querySelectorAll("label").forEach(label => {
            label.classList.remove("wrong");
        });

        feedback.textContent = "";

    }

});

// Open and close letter
function toggleLetter() {

    envelope.classList.toggle("open");

    if (envelope.classList.contains("open")) {

        openBtn.textContent = "💗 Close Letter";

    } else {

        openBtn.textContent = "💌 Open My Letter";

    }

}

// Click envelope to open or close
envelope.addEventListener("click", function() {

    if (unlocked) {
        toggleLetter();
    }

});