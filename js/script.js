// Plays machine vs player
let order = [];
let playerOrder = [];

// WIP
let lifes = 5;
let difficulty 
// to be setup difficulty as a slider 0 easy 5 medium 10 harder
// difficulty is established ONLY by number of turns (for now)

let velocity = '?'
// F u t u r e 

// Game Logics
let flash;
let turn;
let onTrack;
let compTurn;
let intervalId;
let sumCount = 0;
let isClicked = false;

// Check boxes
let on = false;
let strict = false;

// Sound bool
let noise = true;

// Winning bool
let win;

// HTML interactives
const turnCounter = document.querySelector("#turn");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const yellow = document.querySelector("#yellow");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


// BUTTONS
strictButton.addEventListener("click", (event) => {
	if (strictButton.checked == true) {
		strict = true;
	} else {
		strict = false;
	}
});

function timeOutOfCounter(i, timer, text) {
	setTimeout(function () {
		turnCounter.innerHTML = text;
	}, timer);

	sumCount += timer / i;
}

onButton.addEventListener("click", (event) => {
	if (onButton.checked == true) {
		sumCount = 0;
		let welcomeMessage = "HELLO!";
		on = true;
		let welcomeMessageSize = welcomeMessage.length;

		// Screen player interaction
		turnCounter.innerHTML = "HELLO!";
		for (var i = 1; i < welcomeMessageSize + 1; i++) {
			if (onButton.checked == true) {
				welcomeMessage = welcomeMessage.substring(1);
				timeOutOfCounter(i, 400 * i, welcomeMessage);
			}

		}
		console.log(sumCount);
		setTimeout(function () {
			turnCounter.innerHTML = '-';
		}, sumCount + 10);

	} else {
		flashColor();
		strict = false;
		strictButton.checked = false;
		turnCounter.innerHTML = "BYE!";
		setTimeout(function () {
			turnCounter.innerHTML = "";
			clearColor();
			on = false;
			clearInterval(intervalId);
		}, sumCount - 1000);
	}
});

startButton.addEventListener("click", (event) => {
	if (!isClicked) {
		if (on || win) {
			isClicked = true;
			play();
		}
	}
	if (!on && turn == 1) {
		isClicked = false;
	}
});
// END OF BUTTONS

// Game loop logic
function play() {
	win = false;
	on = true;
	order = [];
	playerOrder = [];
	flash = 0;
	intervalId = 0;
	turn = 1;
	turnCounter.innerHTML = 1;
	onTrack = true;
	for (var i = 0; i < 20; i++) {
		order.push(Math.floor(Math.random() * 4) + 1);
	}
	compTurn = true;
	intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
	on = false;

	if (flash == turn) {
		clearInterval(intervalId);
		compTurn = false;
		clearColor();
		on = true;
	}

	if (compTurn) {
		clearColor();
		setTimeout(() => {
			if (order[flash] == 1) greenButton();
			if (order[flash] == 2) redButton();
			if (order[flash] == 3) blueButton();
			if (order[flash] == 4) yellowButton();
			flash++;
		}, 300);
	}
}
// End game loop logic 

// Turn colors up && Sound
// GREEN
function greenButton() {
	if (noise) {
		let audio = document.getElementById("sound1");
		audio.play();
	}
	noise = true;
	green.style.backgroundColor = "lightgreen";
}
green.addEventListener('click', (event) => {
	if (on) {
		playerOrder.push(1);
		check();
		greenButton();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 400);
		}
	}
});

// RED
function redButton() {
	if (noise) {
		let audio = document.getElementById("sound2");
		audio.play();
	}
	noise = true;
	red.style.backgroundColor = "tomato";
}
red.addEventListener('click', (event) => {
	if (on) {
		playerOrder.push(2);
		check();
		redButton();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 400);
		}
	}
});

// BLUE
function blueButton() {
	if (noise) {
		let audio = document.getElementById("sound3");
		audio.play();
	}
	noise = true;
	blue.style.backgroundColor = "lightskyblue";
}
blue.addEventListener('click', (event) => {
	if (on) {
		playerOrder.push(3);
		check();
		blueButton();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 400);
		}
	}
});

// YELLOW
function yellowButton() {
	if (noise) {
		let audio = document.getElementById("sound4");
		audio.play();
	}
	noise = true;
	yellow.style.backgroundColor = "yellow";
}
yellow.addEventListener('click', (event) => {
	if (on) {
		playerOrder.push(4);
		check();
		yellowButton();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 400);
		}
	}
});
// End Turning up && sound

// Manipulate colors
function clearColor() {
	green.style.backgroundColor = "darkgreen";
	red.style.backgroundColor = "darkred";
	blue.style.backgroundColor = "darkblue";
	yellow.style.backgroundColor = "goldenrod";
}
function flashColor() {
	green.style.backgroundColor = "lightgreen";
	red.style.backgroundColor = "tomato";
	blue.style.backgroundColor = "lightskyblue";
	yellow.style.backgroundColor = "yellow";
}
// End Manipulate colors


// Check if the player is on track
function check() {
	if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
		onTrack = false;

	if (playerOrder.length == 20 && onTrack) {
		winGame();
	}

	if (onTrack == false) {
		flashColor();
		turnCounter.innerHTML = "NOPE!";
		setTimeout(() => {
			turnCounter.innerHTML = turn;
			clearColor();

			if (strict) {
				play();
			} else {
				compTurn = true;
				flash = 0;
				playerOrder = [];
				onTrack = true;
				intervalId = setInterval(gameTurn, 800);
			}
		}, 800);

		noise = false;
	}

	if (turn == playerOrder.length && onTrack && !win) {
		playerOrder = [];
		compTurn = true;
		flash = 0;
		turnCounter.innerHTML = 1 + turn++;
		intervalId = setInterval(gameTurn, 800);
	}
}

function winGame() {
	flashColor();
	turnCounter.innterHTML = "WIN!";
	on = false;
	win = true;
}