var score;
var message;
var dealer;
var player;
var desk = [ ['6d', '6_d.jpg'], ['7d', '7_d.jpg'], ['8d', '8_d.jpg'], ['9d', '9_d.jpg'], ['A', 'ace_d.jpg'], ['J', 'j_d.jpg'], ['Q', 'q_d.jpg'], ['K', 'k_d.jpg'],
['6h', '6_h.jpg'], ['7h', '7_h.jpg'], ['8h', '8_h.jpg'], ['9h', '9_h.jpg'], ['A', 'ace_h.jpg'], ['J', 'j_h.jpg'], ['Q', 'q_h.jpg'], ['K', 'k_h.jpg'],
['6c', '6_c.jpg'], ['7c', '7_c.jpg'], ['8c', '8_c.jpg'], ['9c', '9_c.jpg'], ['A', 'ace_c.jpg'], ['J', 'j_c.jpg'], ['Q', 'q_c.jpg'], ['K', 'k_c.jpg'],
['6s', '6_s.jpg'], ['7s', '7_s.jpg'], ['8s', '8_s.jpg'], ['9s', '9_s.jpg'], ['A', 'ace_s.jpg'], ['J', 'j_s.jpg'], ['Q', 'q_s.jpg'], ['K', 'k_s.jpg'],
];
var cards = desk.slice(0);
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
setMessage("Hello, wellcome to game!</br>Click the deck to get your cards ");

function getRandomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}



 function getCard() {
	 console.log('getCard start: берет случайную карту из колоды, удаляет ее из колоды, возвращает карту ');
	var temp = cards[getRandomInt(0, cards.length - 1)];
	for (i=0; i<cards.length; i++){
		if (temp == cards[i]) {
			cards.splice(i,1);
		}
	} return temp;
}
 
 
 
function setCard (oneCard, div_id) {
	console.log('setCard start, берем карту, вынимаем ее [1] элемент (название картинки) и вставляем в див с div_id');
	var card = oneCard[1];
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
	console.log ("getStatus() dlr: " + dlr + ' ' + "plr: " + plr );
	return 'Dealer has: ' + dlr.join(' ');
	 //+ ' Игрок: ' + plr.join(' ') + ' Score: ' + score;
} 
 
function getHand (){
	dealer = [getCard(), getCard()];
	player = [getCard(), getCard(), getCard()];
	console.log("Раздача: getHand (), player 3 карты: " + player + "dealer 2 карты: " + dealer);
}


function drawHand (player){
	console.log("drawHand start, отрисовка всех трех карт игрока: " + player);
	setCard(player[0],"1_card" );
	setCard(player[1],"2_card" );
	setCard(player[2],"3_card" );
}

function getSum(hand) {
	var sum=0;
	console.log ('Подсчет очков карт игрока - getSum(hand): ' + hand)
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

function changeCard(index ,id) {
		console.log('ChangeCard start - index: ' + index + ' id:' + id);
	player[index]= getCard();
	console.log('ChangeCard - new player: ' + player);
	setCard(player[index], id);
	setMessage('Ok, you changed your card. ' + getStatus());
	document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">to score</button>';
				
	console.log('changeCard end - player[index]: ' + player[index]+' player: '+ player);
	
}

function toChangeCard (id){
	if (id == '1_card'){
		console.log('toChangeCard id' + id);
		var index = 0;
		changeCard(index, id);
	}else if (id == '2_card'){
		console.log('toChangeCard id' + id);
		var index = 1;
		changeCard(index, id);
	}else if (id == '3_card'){
		console.log('toChangeCard id' + id);
		var index = 2;
		changeCard(index, id);
	}else {
		setMessage("there is no such div_id in html");
	}
}


	
function checkScore (){
	//удаляем кнопку
	document.getElementById("answer").innerHTML = '';
	//проверяем результат
	var sumDealer = getSum(dealer);
	var sumPlayer = getSum(player);
			
	if (sumPlayer == 21) {
		setScore( score + 100 );
		//alert ('У вас Black Jack!' + getStatus());
		setMessage('You has Black Jack!' + getStatus());
	} else if (sumDealer == 21) {
		setScore( score - 20 );
		//alert ('У дилера Блэк Джек! ' + getStatus());
		setMessage('Dealer has Black Jack! ' + getStatus());
	} else if (sumPlayer == sumDealer) {
		//alert ('Ничья! ' + getStatus());
		setMessage('Dead heat! ' + getStatus());
	} else if (sumPlayer > sumDealer) {
		setScore( score + 50 );
		//alert ('Выигрыш! :) ' + getStatus());
		setMessage('You win! :) ' + getStatus());
	} else {
		setScore( score -100 );
		//alert ('Проигрыш :( ' + getStatus());
		setMessage('You loos :( ' + getStatus());
	}
	console.log ("После подсчета очков - getStatus: " + getStatus() + " player: " + player);
			
}


				
function play(){
	console.log('play() start');
	getHand ();
	drawHand (player);
	if (getSum(player)== 21){
		//alert ('Дьявольское везение! Black Jack на раздаче!');
		setMessage("You're lucky! Black Jack!.. </br> To play again ckick on card deck.");
		setScore( score + 200 );
	} else {
		setMessage(getStatus() +  " He will get one more directly.</br>Do you want to change one of you're cards?");
		document.getElementById("answer").innerHTML = '<button id="yes" onclick="yes()">Yes</button><button id="no" onclick="no()">No</button> ';
	}
	console.log('play() end');
}		
		
		//сдаем карту игроку либо прекращаем игру
	function yes(){
		console.log('yes() start');
		document.getElementById("answer").innerHTML = '';
		//дилер берет третью карту
		dealer.push(getCard());
		setMessage(getStatus() +  '</br>Please click the card you want to change');
		console.log('yes() end = dealer: ' + dealer );
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
 
 
