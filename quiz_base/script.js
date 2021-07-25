let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// events
document
	.querySelector(".scoreArea button")
	.addEventListener("click", resetEvent);

// functions
function showQuestion() {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%` 
        //console.log(`${pct}%`)
        //console.log(q.question)
        document.querySelector('.scoreArea').style.display = "none";
        document.querySelector('.questionArea').style.display = "block";
        
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHTML = '';
        for(let i in q.options){
            optionsHTML += `<div data-option="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else {
        // acabaram as questions
        finishQuiz()
    }
}
function optionClickEvent(e) {
    let clickedOption =  parseInt(e.target.getAttribute('data-option'));
    if(questions[currentQuestion].answer === clickedOption){
        console.log("Acertou")
        correctAnswers++;
    } else {
        console.log("Errou")
    }
    currentQuestion++;
    showQuestion();
}
function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)
    if (points < 30) {
		document.querySelector(".scoreText1").innerHTML = "Ruim! Estude mais!";
		document.querySelector(".scorePct").style.color = "#ff0000";
	} else if (points >= 30 && points < 70) {
		document.querySelector(".scoreText1").innerHTML = "Muito bom!";
		document.querySelector(".scorePct").style.color = "#ffff00";
	}else if (points > 70) {
		document.querySelector(".scoreText1").innerHTML = "Parabéns!";
		document.querySelector(".scorePct").style.color = "#0d630d";
	}
    document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
    document.querySelector(
		".scoreText2"
	).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
    document.querySelector(".questionArea").style.display = "none";
    document.querySelector(".scoreArea").style.display = "block";
    document.querySelector(".progress--bar").style.width = '100%'; 

}
function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}