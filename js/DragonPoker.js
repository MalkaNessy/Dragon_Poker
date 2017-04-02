var score;
var message;
var dealer;
var player;
var desk = [ ['6d', '6_d.jpg'], ['7d', '7_d.jpg'], ['8d', '8_d.jpg'], ['9d', '9_d.jpg'], ['A', 'ace_d.jpg'], ['J', 'j_d.jpg'], ['Q', 'q_d.jpg'], ['K', 'k_d.jpg']];
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
setMessage("Hello, welkome to game! Click the desk to get your cards ");

function getRandomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}

function getCard() {
	var cards = desk.slice(0);
	return cards[getRandomInt(0, cards.length - 1)];
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
	setCard(player[0],"left_card" );
	setCard(player[1],"center_card" );
	setCard(player[2],"right_card" );
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
	// В случае двух тузов первый будет стоить 11, а второй - 1
	return sum;
} 

function changeCard() {
			answer = prompt(getStatus() + ' Какую? 1-левую, 2-среднюю, 3-правую')
			if (answer == '1'){
				console.log ("player before deliting: " + player);
				player.splice(0,1);
				console.log("player after deliting: " + player);
				player.push(getCard());
					alert ('После замены: ' + getStatus());
					setMessage('После замены: ' + getStatus());
				console.log ("getStatus: " + getStatus() + " player: " + player);
			} else if (answer == '2'){
				player.splice(1,1);
				player.push(getCard());
					alert ('После замены: ' + getStatus());
					setMessage('После замены: ' + getStatus());
			} else if (answer == '3'){
				player.splice(2,1);
				player.push(getCard());
					alert ('После замены: ' + getStatus());
					setMessage('После замены: ' + getStatus());
			}
} //	changeCard end
		
		
function checkScore (){
	//проверяем результат
	var sumDealer = getSum(dealer);
	var sumPlayer = getSum(player);
			
	if (sumPlayer == 21) {
		setScore( score + 100 );
		alert ('У вас Black Jack!' + getStatus());
		setMessage('У вас Black Jack!' + getStatus());
	} else if (sumDealer == 21) {
		setScore( score - 20 );
		alert ('У дилера Блэк Джек! ' + getStatus());
		setMessage('У дилера Блэк Джек! ' + getStatus());
	} else if (sumPlayer == sumDealer) {
		alert ('Ничья! ' + getStatus());
		setMessage('Ничья! ' + getStatus());
	} else if (sumPlayer > sumDealer) {
		setScore( score + 50 );
		alert ('Выигрыш! :) ' + getStatus());
		setMessage('Выигрыш! :) ' + getStatus());
	} else {
		setScore( score -100 );
		alert ('Проигрыш :( ' + getStatus());
		setMessage('Проигрыш :( ' + getStatus());
	}
}
				
function play(){
	getHand ();
	drawHand (player);
	if (getSum(player)== 21){
		alert ('Дьявольское везение! Black Jack на раздаче!');
		setScore( score + 200 );
	} else {
		var answer='';
		answer = prompt(getStatus() + ' Хотите заменить карту? 1 - да, другое - нет')
		//сдаем карту игроку либо прекращаем игру
		if (answer == '1') {
			changeCard();
		}
		//дилер берет третью карту
		dealer.push(getCard());
		//проверяем счет
		checkScore();
	}
}	

//alert (getStatus());
//setMessage("Сумма очков игрока: " + getSum(player) + " Score: " + score);
 
 
