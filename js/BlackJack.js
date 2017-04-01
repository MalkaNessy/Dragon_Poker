var score;

function setScore(newScore) {
	score = newScore;
	document.getElementById("innerScore").innerHTML = score+"";
}

setScore(50);

function print(message) {
  document.write(message);
}

function getRandomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}

function getCard() {
	var cards = ['6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
	return cards[getRandomInt(0, cards.length - 1)];
}
 
function getSum(hand) {
	var sum=0;
	//сначала считаем все карты, кроме тузов
	for (var i=0; i<hand.length;i++) {
		var card = hand[i];
		if (card!='A') {
			if (card=='J' || card == 'Q' || card == 'K') {
				sum=sum+10;			
			} else {
				sum=sum + parseInt(card);
				//alert ('numb card: '+ parseInt(card))
			}
			
		}
		//alert ('sum without A '+ sum);
	}
		
	// туз считается как 1, если текущая сумма меньше 21, если больше - то как 11	
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card == 'A'){
			if (sum>10) {
				sum = sum + 1;
			} else {
				sum = sum + 11;
			}
		}
	}
	// В случае двух тузов первый будет стоить 11, а второй - 1	
	//alert ('return sum ' + sum);
	return sum;
	
} 
 
function getStatus() {
	return 'Дилер: ' + dealer + ' Игрок: ' + player.join(' ') + ' Score: ' + score;//
} 
 
 
 
var dealer = [getCard()];
var player = [getCard(), getCard(), getCard()];



if (getSum(player)== 21){
	alert ('Дьявольское везение! Black Jack на раздаче!')
	setScore( score * 2 );
} else {
	var answer='';
	do {
		answer = prompt(getStatus() + ' Хотите заменить карту? 1 - да, другое - нет')
		//сдаем карту игроку либо прекращаем игру
		if (answer == '1'){
			answer = prompt(getStatus() + ' Какую? 1-левую, 2-среднюю, 3-правую')
			if (answer == '1'){
				console.log ("player before deliting: " + player);
				player.splice(0,1);
				console.log("player after deliting: " + player);
				player.push(getCard());
				alert ('После замены: ' + getStatus());
				console.log ("getStatus: " + getStatus() + " player: " + player);
			} else if (answer == '2'){
				player.splice(1,1);
				player.push(getCard());
				alert ('После замены: ' + getStatus());
			} else if (answer == '3'){
				player.splice(2,1);
				player.push(getCard());
				alert ('После замены: ' + getStatus());}
			
			
			
			
			
			// проверяем, нет ли перебора или выигрыша
			sum=getSum(player);
			if (sum>21){
			setScore( score - 10 );	
			alert ('Перебор!') + getStatus();
			
			break;
			} else if (sum == 21) {
				setScore( score * 2 );
			   alert ('Black Jack!' + getStatus());
			   break;
			}
			
			
		} else {
			//игрок закончил брать карты
			
			//теперь карты берет дилер
			while (getSum(dealer)<17) {
				dealer.push(getCard());
			};
			
			//проверяем результат
			var sumDealer = getSum(dealer);
			var sumPlayer = getSum(player);
			
			if (sumDealer == 21) {
				setScore( score - score * 2 );
				alert ('У дилера Блэк Джек! ' + getStatus());
				
			} else if (sumDealer > 21) {
				setScore( score +10 );
				alert ('У дилера перебор!' + getStatus());
				
			} else if (sumPlayer == sumDealer) {
				
				alert ('Ничья! ' + getStatus());
			} else if (sumPlayer > sumDealer) {
				setScore( score *1.5 );
				alert ('Выигрыш! :) ' + getStatus());
			} else {
				setScore( score - 10 );
				alert ('Проигрыш :( ' + getStatus());
			}
		
		}
				
	}while (answer == '1') ;
}
alert ("Сумма очков игрока: " + getSum(player) + " Score: " + score); 

 
 
