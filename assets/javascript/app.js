let score = 0;
let currentQuestion = 0;
let timer = 3;
let done = false;
let questions = [
    {
        title: 'BMW',
        answers: ['BMW', 'Mercedes', 'VW', 'Porsche'],
        correct: 0
    },
    {
        title: 'Mitsubishi',
        answers: ['Subaru', 'Honda', 'Mitsubishi', 'Suzuki'],
        correct: 2
    },
    {
        title: 'Pontiac',
        answers: ['Saturn', 'Cadilac', 'Tesla', 'Pontiac'],
        correct: 3
    },
    {
        title: 'Porsche',
        answers: ['Ferrari', 'Porsche', 'Lambourghini', 'Abarth'],
        correct: 1
    },
    {
        title: 'Renault',
        answers: ['Puegeot', 'Citreon', 'Renault', 'Mazda'],
        correct: 2
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
    
    if(timer === 0) {
        showSummary();
    }
});

function startTimer() {
    setTimer();
    // timer = 30;
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
    setTimer();
}

function restart() {
    $(".summary").hide();
    $(".quiz").show();
    score = 0;
    currentQuestion = 0;
    timer = 30;
    done = false;
    showQuestion();
}

function setTimer() {
    if (done) {
        clearInterval();
  } else {
    setInterval(function () {
        $(".counter").html(timer);
        timer--;
    }, 1000);
  }
}