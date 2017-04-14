
var score;
var bet =0;
var message;
var dealer;
var player;
var count = 0;
var less = 5;
var ifChange = false;
var desk = [ ['6d', '6_d.jpg'], ['7d', '7_d.jpg'], ['8d', '8_d.jpg'], ['9d', '9_d.jpg'], ['A_d', 'ace_d.jpg'], ['J_d', 'j_d.jpg'], ['Q_d', 'q_d.jpg'], ['K_d', 'k_d.jpg'],
['6h', '6_h.jpg'], ['7h', '7_h.jpg'], ['8h', '8_h.jpg'], ['9h', '9_h.jpg'], ['A_h', 'ace_h.jpg'], ['J_h', 'j_h.jpg'], ['Q_h', 'q_h.jpg'], ['K_h', 'k_h.jpg'],
['6c', '6_c.jpg'], ['7c', '7_c.jpg'], ['8c', '8_c.jpg'], ['9c', '9_c.jpg'], ['A_c', 'ace_c.jpg'], ['J_c', 'j_c.jpg'], ['Q_c', 'q_c.jpg'], ['K_c', 'k_c.jpg'],
['6s', '6_s.jpg'], ['7s', '7_s.jpg'], ['8s', '8_s.jpg'], ['9s', '9_s.jpg'], ['A_s', 'ace_s.jpg'], ['J_s', 'j_s.jpg'], ['Q_s', 'q_s.jpg'], ['K_s', 'k_s.jpg'],
];
var cards = desk.slice(0);
//var cards1 = ['6', '7', '8', '9', 'J', 'Q', 'K', 'A'];

var player_ul="player_cards"; // id элемента, куда вставлять карты игрока
var dealer_ul="dealer_cards"; // id элемента, куда вставлять карты диллера

//создает новый счет в зависимости от ставки или подсчета очков в конце игры
function setScore(newScore) {
	score = newScore;
	document.getElementById("innerScore").innerHTML = score+"";
}

//берет ставку, введенную игроком, показывает ставку, меняет сумму счета и показывает ее, убирает кнопку "сделать ставку"
function setBet() {
	bet = document.getElementById("toBet").value;
	console.log('bet: ' + bet + ' inNaN: '+ isNaN(bet));
	if(isNormalInteger(bet)){
		
		document.getElementById("toBet").value = "";
		document.getElementById("innerBet").innerHTML = bet;
		document.getElementById("setBet").style.display = "none";
		bet = parseInt(bet);
		setScore((score - bet));
	}
}

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}

//возвращает случайное число в заданном промежутке
function getRandomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}

//размещает текст в заданном элементе
function setMessage(newMessage) {
	message = newMessage;
	document.getElementById("talk").innerHTML = message+"";
}







//берет случайную карту из колоды, удаляет ее из колоды, возвращает карту
 function getCard() {
	 console.log('getCard start:  ');
	var oneCard = cards[getRandomInt(0, cards.length - 1)];
	for (i=0; i<cards.length; i++){
		if (oneCard == cards[i]) {
			cards.splice(i,1);
		}
	} return oneCard;
}

//создает список карт игрока и дилера
function getHand (){
	dealer = [getCard(), getCard(), getCard(), getCard(), getCard()];
	player = [getCard(), getCard(), getCard(), getCard(), getCard()];
	console.log("Раздача: getHand (), " + "dealer: " + dealer + "player: " + player );
}

 //берем карту, вынимаем ее [1] элемент (название картинки)');
function getImg(oneCard) {
	console.log('getImg(oneCard) start ');
	return img = oneCard[1];
}

//из названия списка вынимаем первые два символа, которые будем добавлять в id_li
function getSign(ul_id){
	console.log('getSign(ul_id) start');
	return ul_id.substring(0,2);
} 

//создаем одну строчку li, включая li_id и картинку
function createCardView_li(img, li_id){
	console.log('createCardView_li(img, li_id) start');
	return html = ' <li id="'+li_id+'" onclick="toChangeCard(\''+li_id+'\')"><img src="img/' + img+ '" alt="card" ></li>';

} 

//создаем одну строчку li для списка дилера
function createCardView_dealer_li(img, li_id){
	console.log('createCardView_dealer_li(img, li_id) start');
	return html = ' <li id="'+li_id+'"><img src="img/' + img+ '" alt="card" ></li>';

}

//отрисовываем все карты игрока
function drawHandView_ul(hand, ul_id){
	console.log('drawHandView_ul(hand, ul_id) start');
	var html='';
	var sign = getSign(ul_id);
	for (var i=0; i<hand.length; i++){
		var li_id = i + sign;
		var img = getImg(hand[i]);
		html = html + createCardView_li(img, li_id);
	}
	document.getElementById(ul_id).innerHTML = html;
	console.log('drawHandView_ul(hand, ul_id) end');
}

//отрисовываем все карты дилера
function drawDealer(hand, ul_id){
	console.log('drawDealer(hand, ul_id) start');
	var html='';
	var sign = getSign(ul_id);
	for (var i=0; i<hand.length; i++){
		var li_id = i + sign;
		var backImg = 'card.jpg';
		html = html + createCardView_dealer_li(backImg,li_id);
	}
	document.getElementById(ul_id).innerHTML = html;
		
	for (var i=0; i<=1; i++){
		var li_id = i + sign;
		var img = getImg(hand[i]);
		document.getElementById(li_id).innerHTML = '<img src="img/'+img+'" alt="card">';
		console.log('drawHandView_ul(hand, ul_id) end');
	}
}




//начинаем игру
function init(){
	if(bet!=0){
		console.log('init() start');
		getHand ();
		drawHandView_ul(player, player_ul);
		drawDealer(dealer, dealer_ul);
		askToChange();
		console.log('init() end');
	}else {
		setMessage("Set bet before starting play");
	}
	
}

 //document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">to score</button>';
	
//показывает состояние списков карт игрока, дилера и общий счет
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
	return 'Диллер: ' + dlr.join(', ') + ' Игрок: ' + plr.join(' ') + ' Score: ' + score ;
	 //+ ' Игрок: ' + plr.join(' ') + ' Score: ' + score;
} 

//подсчет суммы очков 
function getSum(hand) {
	var sum=0;
	console.log ('Подсчет oчков карт игрока - getSum(hand): ' + hand)
	//сначала считаем все карты, кроме тузов
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card[0].substring(0,1)!='A') {
			if (isNaN(parseInt(card[0])) ) {
				sum=sum+10;			
			} else {
				sum=sum + parseInt(card[0]);
			}
		}
	}	
	// туз считается как 1, если текущая сумма меньше 21, если больше - то как 11	
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card[0].substring(0,1) == 'A'){
			if (sum>10) {
				sum = sum + 1;
			} else {
				sum = sum + 11;
			}
		}
	}
	return sum;
} 

//запрос игроку, желает ли он поменять карты; создает кнопку "к подсчету очков"
function askToChange (){
		setMessage(" You've changed " + count + " cards, " + less +" left. </br>Click on the card you whant to change, or 'to score' button");
		document.getElementById("answer").innerHTML = '<button id="no" onclick="no()">to score</button> ';
}

//заменяет одну карту в списке игрока, отрисовывает и выделяет
function changeThisCard(id) {
	var background = "rgb(0, 150, 0)";
	if (document.getElementById(id).style.backgroundColor != background){
		console.log('changeThisCard(id) start');
		var index = parseInt(id.substring(0,1));
		player[index] = getCard();
		console.log("player[index]: " + player[index]);
		var img = getImg(player[index]);
		console.log("img: " + img);
		document.getElementById(id).innerHTML = '<img src="img/'+img+'" alt="card">';
		document.getElementById(id).style.backgroundColor = background;
		console.log('changeThisCard(id)end ');
		count ++;
		less --;
	}
}

//вызывает функцию замены одной карты и проверяет счетчик. Если нужно, снова вызывает замену карты
function toChangeCard (id ){
		changeThisCard(id);	
		if (less!==0){
			askToChange()}
		else {
			no();
		}
		
}

//вызывается, если игрок больше не хочет менять карты. Отрисовывает все карты дилера и вызывает функцию подсчета очков	
function no(){
	
	//document.getElementById("answer").innerHTML = '';
	$("#answer").html(''); 
	//показываем все карты диллера
	drawHandView_ul(dealer, dealer_ul);
	//проверяем счет
	checkScore();
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
		setMessage('You has Black Jack!' );
	} else if (sumDealer == 21) {
		setScore( score - 20 );
		//alert ('У дилера Блэк Джек! ' + getStatus());
		setMessage('Dealer has Black Jack! ' );
	} else if (sumPlayer == sumDealer) {
		//alert ('Ничья! ' + getStatus());
		setMessage('Dead heat! ' );
	} else if (sumPlayer > sumDealer) {
		setScore( score + 50 );
		//alert ('Выигрыш! :) ' + getStatus());
		setMessage('You win! :) ' );
	} else {
		setScore( score -100 );
		//alert ('Проигрыш :( ' + getStatus());
		setMessage('You loos :( ' );
	}
	//console.log ("После подсчета очков - getStatus: " + getStatus() + " player: " + player);
			
}

$(document).ready(function(){
	setScore(50);
	setMessage("Hello, wellcome to game!</br>Click the card deck to start the game ");


	
	
	
	
	
});

		
		

