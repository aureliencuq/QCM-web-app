const questions = [
    {
        question: "Quelle(s) couleur(s) sont présentes dans le drapeau français ?", 
        answers: [
            { text: "Rouge", correct: true },
            { text: "Vert", correct: false },
            { text: "Bleu", correct: true },
            { text: "Jaune", correct: false }
        ],
        type: "multiple"  // Réponses multiples possibles
    },
    {
        question: "Quelle est la capitale de la France ?", 
        answers: [
            { text: "Paris", correct: true },
            { text: "Lyon", correct: false },
            { text: "Marseille", correct: false }
        ],
        type: "single"  // Une seule réponse correcte
    },
    {
        question: "Quels sont les continents ?", 
        answers: [
            { text: "Asie", correct: true },
            { text: "Europe", correct: true },
            { text: "Océanie", correct: true },
            { text: "Antarctique", correct: true },
            { text: "Atlantique", correct: false }
        ],
        type: "multiple"  // Réponses multiples possibles
    },
    {
        question: "Quel est le plus grand océan du monde ?", 
        answers: [
            { text: "Atlantique", correct: false },
            { text: "Pacifique", correct: true },
            { text: "Indien", correct: false }
        ],
        type: "single"  // Une seule réponse correcte
    }
];

// Variables pour suivre l'état du quiz
let currentQuestionIndex = 0;
let score = 0;

// Afficher la question actuelle
function showQuestion(question) {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';  // Réinitialise les réponses
    
    question.answers.forEach((answer, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        
        if (question.type === "single") {
            input.type = 'radio';  // Réponse unique
            input.name = 'answer';  // Groupement des boutons radio
        } else if (question.type === "multiple") {
            input.type = 'checkbox';  // Réponses multiples
        }

        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(answer.text));
        answerButtonsElement.appendChild(label);
        answerButtonsElement.appendChild(document.createElement('br'));  // Retour à la ligne
    });
}

// Vérification des réponses pour la question actuelle
function checkAnswer(question) {
    const answerButtonsElement = document.getElementById('answer-buttons');
    const selectedAnswers = [];

    // Récupère les réponses sélectionnées (radio ou checkbox)
    const inputs = answerButtonsElement.querySelectorAll('input');
    
    inputs.forEach(input => {
        if (input.checked) {
            selectedAnswers.push(parseInt(input.value));
        }
    });

    // Comparer les réponses sélectionnées avec les bonnes réponses
    let isCorrect = true;

    if (question.type === "single") {
        // Vérifie qu'une seule réponse est correcte
        isCorrect = selectedAnswers.length === 1 && question.answers[selectedAnswers[0]].correct;
    } else if (question.type === "multiple") {
        // Vérifie que toutes les bonnes réponses sont sélectionnées et aucune mauvaise
        question.answers.forEach((answer, index) => {
            if (answer.correct && !selectedAnswers.includes(index)) {
                isCorrect = false;  // Une bonne réponse n'a pas été sélectionnée
            } else if (!answer.correct && selectedAnswers.includes(index)) {
                isCorrect = false;  // Une mauvaise réponse a été sélectionnée
            }
        });
    }

    return isCorrect;
}

// Soumission de la réponse pour la question actuelle
function submitAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = checkAnswer(currentQuestion);

    if (isCorrect) {
        alert("Bonne réponse !");
        score++;
    } else {
        alert("Mauvaise réponse, essayez encore.");
    }

    currentQuestionIndex++;

    // Passe à la question suivante ou termine le quiz
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

// Afficher les résultats du quiz
function showResults() {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    
    questionElement.innerText = `Quiz terminé ! Votre score est de ${score}/${questions.length}.`;
    answerButtonsElement.innerHTML = '';  // Efface les boutons de réponses
    const resetButton = document.createElement('button');
    resetButton.innerText = "Recommencer";
    resetButton.onclick = resetQuiz;
    answerButtonsElement.appendChild(resetButton);
}

// Réinitialisation du quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questions[currentQuestionIndex]);
}

// Lancer le quiz
showQuestion(questions[currentQuestionIndex]);
