let score = 0;
let game = 0;
let currentQuestion = 0;
let timer = 30;
let done = false;
let questions = [
    {
        title: 'The Ultimate Driving Machine',
        answers: ['BMW', 'Mercedes', 'VW', 'Porsche'],
        correct: 0
    },
    {
        title: 'Zoom Zoom',
        answers: ['Subaru', 'Honda', 'Mazda', 'Suzuki'],
        correct: 2
    },
    {
        title: 'Innovation For All',
        answers: ['Saturn', 'Cadilac', 'Tesla', 'Nissan'],
        correct: 3
    },
    {
        title: 'F1 World Chanpions',
        answers: ['Ferrari', 'Porsche', 'Lambourghini', 'Abarth'],
        correct: 0
    },
    {
        title: 'New Rules',
        answers: ['Puegeot', 'Koenigsegg', 'Renault', 'McLaren'],
        correct: 3
    },
]

$(document).ready(function () {

    $(".counter").hide();

    $(".start a").click(function (e) {
        e.preventDefault();
        startTimer();
        $(".start").hide();
        $(".counter").show();
        $(".quiz").show();
        $(".quiz a").hide();
        showQuestion();
    });

    $(".quiz ul").on("click", "li", function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        $(".quiz a").show();
    });

    $(".quiz a").click(function (e) {
        e.preventDefault();
        if ($("li.selected").length) {
            let guess = parseInt($("li.selected").attr("id"));
            checkAnswer(guess);
            $(".quiz a").hide();
        } else {
            alert('Please choose an answer')
        }

    });

    $(".summary a").click(function (e) {
        e.preventDefault();
        restart();
    });

});

function startTimer() {
    if (game > 0) {
        timer = 30;
    }
    setTimer();
    timer = 30;
    game ++;
    
}

function showQuestion() {
    let question = questions[currentQuestion];
    $(".quiz h2").text(question.title);
    $(".quiz ul").html("");
    for (let i = 0; i < question.answers.length; i++) {
        $(".quiz ul").append(`
        <li id="${i}">
        ${question.answers[i]}
        </li>
        `);
    }
}

function checkAnswer(guess) {
    let question = questions[currentQuestion];
    if (question.correct === guess) {
        score++;
    } else {

    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showSummary();
    } else {
        showQuestion();
    }
}

function showSummary() {
    $(".quiz").hide();
    $(".summary").show();
    $(".summary p").text("Congrats you got " + score + " out of " + questions.length + " correct!");
    done = true;
    $(".counter").hide();
}

function restart() {
    $(".summary").hide();
    $(".start").show();
    score = 0;
    currentQuestion = 0;
    timer = 30;
}

function setTimer() {
    
    setInterval(function () {
        if (timer <= 0) {
            showSummary();
        }
        $(".counter").html(timer);
        timer--;
    }, 1000);
  
}