// Liste des 100 questions disponibles
const allQuestions = [
    {
        question: "Question 1 : Que signifie liaison LS ?",
        options: ["Liaisons soutenu", "Liaison sureté", "Liaison standard", "Liaison stable"],
        correct: "Liaison standard"
    },
    {
        question: "Question 2 : A quoi sert la normalisation ?",
        options: ["Passer d'un type de liaison à un autre type", "Modifier la structure moléculaire", "Améliorer la résistance mécanique", "Détendre les contraintes résiduelles"],
        correct: "Détendre les contraintes résiduelles"
    },
    // Ajoutez ici les 98 autres questions sous la même forme
];

// Fonction pour mélanger les questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Sélectionner 20 questions aléatoires parmi les 100
const randomQuestions = shuffle(allQuestions).slice(0, 20);

// Générer le QCM dans le formulaire
const form = document.getElementById('qcmForm');
randomQuestions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-block');
    
    const questionTitle = document.createElement('h3');
    questionTitle.innerText = question.question;
    questionDiv.appendChild(questionTitle);

    question.options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'question' + index;
        input.value = option;
        label.appendChild(input);
        label.append(option);
        questionDiv.appendChild(label);
    });

    form.appendChild(questionDiv);
});

// Fonction pour soumettre et corriger le QCM
function submitQuiz() {
    const formData = new FormData(form);
    let score = 0;

    randomQuestions.forEach((question, index) => {
        const userAnswer = formData.get('question' + index);
        if (userAnswer === question.correct) {
            score++;
        }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Vous avez obtenu ${score} / 20.`;
}
