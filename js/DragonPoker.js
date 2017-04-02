var score;
var message;
var dealer;
var player;
var desk = [ ['6d', '6_d.jpg'], ['7d', '7_d.jpg'], ['8d', '8_d.jpg'], ['9d', '9_d.jpg'], ['A', 'ace_d.jpg'], ['J', 'j_d.jpg'], ['Q', 'q_d.jpg'], ['K', 'k_d.jpg'],
['6h', '6_h.jpg'], ['7h', '7_h.jpg'], ['8h', '8_h.jpg'], ['9h', '9_h.jpg'], ['A', 'ace_h.jpg'], ['J', 'j_h.jpg'], ['Q', 'q_h.jpg'], ['K', 'k_h.jpg'],
['6c', '6_c.jpg'], ['7c', '7_c.jpg'], ['8c', '8_c.jpg'], ['9c', '9_c.jpg'], ['A', 'ace_c.jpg'], ['J', 'j_c.jpg'], ['Q', 'q_c.jpg'], ['K', 'k_c.jpg'],
['6s', '6_s.jpg'], ['7s', '7_s.jpg'], ['8s', '8_s.jpg'], ['9s', '9_s.jpg'], ['A', 'ace_s.jpg'], ['J', 'j_s.jpg'], ['Q', 'q_s.jpg'], ['K', 'k_s.jpg'],
];
var cards;
//var cards1 = ['6', '7', '8', '9', 'J', 'Q', 'K', 'A'];

function setScore(newScore) {
	score = newScore;
	document.getElementById("innerScore").innerHTML = score+"";
}
function setMessage(newMessage) {
	message = newMessage;
	document.getElementById("talk").innerHTML = message+"";
}

setScore(50);
setMessage("Hello, wellkome to game! Click the desk to get your cards ");

function getRandomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}


 function getCard() {
	cards = desk.slice(0);
	var temp = cards[getRandomInt(0, cards.length - 1)];
	for (i=0; i<cards.length; i++){
		if (temp == cards[i]) {
			cards.splice(i,1);
		}
	} return temp;
}
 
 
function setCard (hand, div_id) {
	console.log('setCard start');
	card = hand[1];
	document.getElementById(div_id).innerHTML = '<img src="img/'+card+'" alt="2d" >';
	console.log('setCard end, card: ' + card);
}
  
function getStatus() {
	var dlr = [];
	var plr = [];
	for (i=0; i<dealer.length; i++){
		dlr.push(dealer[i][0]);
	}
	for (i=0; i<player.length; i++){
		plr.push(player[i][0]);
	}
	console.log ("dlr: " + dlr + ' ' + "plr: " + plr );
	return 'Дилер: ' + dlr.join(' ') + ' Игрок: ' + plr.join(' ') + ' Score: ' + score;//.join(' ')
	
} 
 
function getHand (){
	dealer = [getCard(), getCard()];
	player = [getCard(), getCard(), getCard()];
	console.log("getHand () start, player: " + player + "dealer: " + dealer);
}


function drawHand (player){
	console.log("getHand start: " + player);
	setCard(player[0],"1_card" );
	setCard(player[1],"2_card" );
	setCard(player[2],"3_card" );
}

function getSum(hand) {
	var sum=0;
	console.log ('getSum(hand): ' + hand)
	//сначала считаем все карты, кроме тузов
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card[0]!='A') {
			if (card[0]=='J' || card[0] == 'Q' || card[0] == 'K') {
				sum=sum+10;			
			} else {
				sum=sum + parseInt(card[0]);
			}
		}
	}	
	// туз считается как 1, если текущая сумма меньше 21, если больше - то как 11	
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card[0] == 'A'){
			if (sum>10) {
				sum = sum + 1;
			} else {
				sum = sum + 11;
			}
		}
	}
	return sum;
} 

function changeCard(id) {
			console.log ('changeCard start');
			var last;
			if (id == '1_card'){
				player.splice(0,1);
				player.push(getCard());
				console.log ('player: ' + player);
				last = player[player.length-1];
				
				console.log ('last: ' + last);
				console.log ('id: ' + id);
				
				setCard(last,id );
					//alert ('После замены: ' + getStatus());
					setMessage('После замены: ' + getStatus());
					document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">посчитать</button>';
				console.log ("getStatus: " + getStatus() + " player: " + player);
			} else if (id == '2_card'){
				player.splice(1,1);
				player.push(getCard());
					//alert ('После замены: ' + getStatus());
					setMessage('После замены: ' + getStatus());
					document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">посчитать</button>';
			} else if (id == '3_card'){
				player.splice(2,1);
				player.push(getCard());
					//alert ('После замены: ' + getStatus());
					setMessage('После замены: ' + getStatus());
					document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">посчитать</button>';
			}
} //	changeCard end
		
		
function checkScore (){
	//удаляем кнопку
	document.getElementById("answer").innerHTML = '';
	//проверяем результат
	var sumDealer = getSum(dealer);
	var sumPlayer = getSum(player);
			
	if (sumPlayer == 21) {
		setScore( score + 100 );
		//alert ('У вас Black Jack!' + getStatus());
		setMessage('У вас Black Jack!' + getStatus());
	} else if (sumDealer == 21) {
		setScore( score - 20 );
		//alert ('У дилера Блэк Джек! ' + getStatus());
		setMessage('У дилера Блэк Джек! ' + getStatus());
	} else if (sumPlayer == sumDealer) {
		//alert ('Ничья! ' + getStatus());
		setMessage('Ничья! ' + getStatus());
	} else if (sumPlayer > sumDealer) {
		setScore( score + 50 );
		//alert ('Выигрыш! :) ' + getStatus());
		setMessage('Выигрыш! :) ' + getStatus());
	} else {
		setScore( score -100 );
		//alert ('Проигрыш :( ' + getStatus());
		setMessage('Проигрыш :( ' + getStatus());
	}
}


				
function play(){
	getHand ();
	drawHand (player);
	if (getSum(player)== 21){
		//alert ('Дьявольское везение! Black Jack на раздаче!');
		setMessage('Дьявольское везение! Black Jack на раздаче! Чтобы сыграть еще раз, нажмите на колоду.');
		setScore( score + 200 );
	} else {
		//answer = prompt(getStatus() + ' Хотите заменить карту? 1 - да, другое - нет')
		setMessage(getStatus() + ' Хотите заменить карту? 1 - да, другое - нет');
		document.getElementById("answer").innerHTML = '<button id="yes" onclick="yes()">Yes</button><button id="no" onclick="no()">No</button> ';
	}
}		
		
		//сдаем карту игроку либо прекращаем игру
	function yes(){
		document.getElementById("answer").innerHTML = '';
		//дилер берет третью карту
		dealer.push(getCard());
		setMessage('Нажмите на карту, которую хотите заменить');
	}
	
	
	
	function no(){
		document.getElementById("answer").innerHTML = '';
		//дилер берет третью карту
		dealer.push(getCard());
		//проверяем счет
		checkScore();
	}	
		
		
		
		
	
	

//alert (getStatus());
//setMessage("Сумма очков игрока: " + getSum(player) + " Score: " + score);
 
 
