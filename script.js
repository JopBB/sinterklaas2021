
disliked = 0;

function dislike(){
	if(disliked === 3){
		alert("Deze jongen kan je toch niet afwijzen?!")
		return;
	}
	var currentCardNumber = disliked+1
	var nextCardNumber = disliked+2
	var currentCard = $(".card"+currentCardNumber);
	var nextCard = $(".card"+nextCardNumber);
	var currentNope = $(".nope"+currentCardNumber)

	currentNope.css("display", "inline-block")
	setTimeout(function(){
		currentCard.css("display", "none")
		nextCard.css("display", "inline-block")
		disliked++;
	}, 2000)

}

function like(){
	if(disliked === 3){
		like = $(".like");
		like.css("display", "inline-block")
		setTimeout(function(){
			window.location.assign('messages.html')
		}, 2000)
	}else{
		alert("huh?")
	}
}
messageCounter=0
hapjeEtenSent=false;
gesprekAfgerond=false;
function sendMessage(){
	var input = $("#userInput");
	var message = $(".imessage");
	var newMessage = "<p class='from-me'>" + input.val() + "</p>"


	message.append(newMessage);
	if(messageCounter<1){
		setTimeout(function(){
			message.append("<p class='from-them'>Haha, dat is een hele goeie!</p>")
			setTimeout(function(){
				message.append("<p class='from-them'>Zin om misschien eens samen een hapje te eten? Je cadeautje zou daar wel eens bij kunnen helpen :)</p>")
				hapjeEtenSent=true;
			},5000)
		},2000)
	}else if(hapjeEtenSent && !gesprekAfgerond){
		if(input.val().includes("ja") || input.val().includes("leuk")){
			setTimeout(function(){
				message.append("<p class='from-them'>Oke! Gezellig. Je cadeautje kan je vinden waar de wijntjes liggen!</p>")
				setTimeout(function(){
					message.append("<p class='from-them'>Zie je snel!</p>")
					gesprekAfgerond=true;
				},2000)
			},2000)
		}else{
			message.append("<p class='from-them'>Oh jammer. Nou, dan heb je vast ook niks aan je cadeautje, laat dan maar.</p>")
			gesprekAfgerond=true;
		}
	}
	input.val('')
	messageCounter++;
}	

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    var elem = $("#opstartModal");
    M.Modal.getInstance(elem).open();

  });

function cardClicked(card){
	if(cards[card].isFlipped){
		flip(card);
		return;
	}

	if(numberFlipped() >1) {
		flipOpenCardsBackClosed();
	}

	flipCounter++;
	$('#flipCounter').html(flipCounter)
	flip(card);
	
	setTimeout(function(){
		if(cards[card].isFlipped){
			flip(card)	
		}
	}, 3000)
}

function flip(card) {
	if(cards[card].completed){
		return;
	}

	var frontDeg, backDeg;
	var isFlipped = cards[card].isFlipped
	var frontside = $("#"+card +" .cardFrontside");
	var backside = $("#"+card+" .cardBackside");

	if(isFlipped){
		frontDeg = 0
		backDeg = 180
	}else{
		frontDeg = 180
		backDeg = 0
	}

	frontside.css("transition-duration", "1s")
	frontside.css("transform", "rotatey(" + frontDeg + "deg)")
	backside.css("transitionDuration", "1s")
	backside.css("transform", "rotatey(" + backDeg + "deg)")
	cards[card].isFlipped = !isFlipped
	cardIsCompleted(cards[card]);
}

function numberFlipped(){
	var numberFlipped=0
	for (var key in cards){
		var card = cards[key]
		if(card.isFlipped && !card.completed){
			numberFlipped++;
		}
	}
	return numberFlipped;
}

function flipOpenCardsBackClosed(){
	for (var key in cards){
		var card = cards[key]
		if(card.isFlipped){
			flip(card.id)
		}
	}
}

function cardIsCompleted(card){
	if(card.completed){
		return true;
	}
	buddyCard = cards[card.buddy]
	if(card.isFlipped && buddyCard.isFlipped){
		console.log(card.id + " en " + buddyCard.id + " IS COMPLETED!!!!!!!!")
		card.completed = true;
		buddyCard.completed = true;
		$("#"+card.id).css("background-color", card.completedColor);
		$("#"+buddyCard.id).css("background-color", buddyCard.completedColor);
		isGameDone();
		return true;
	}else{
		return false;
	}
}

function isGameDone(){
	for(var key in cards){
		var card = cards[key]
		if(!card.completed){
			console.log(card)
			return false;
		}
	}
	if(flipCounter > 30){
		var elem = $("#afsluitModalNietGehaald");
    	M.Modal.getInstance(elem).open();	
    	$('#finalFlipCounterNietGehaald').html(flipCounter)
    	return;
	}else{
		var elem = $("#afsluitModal");
	    M.Modal.getInstance(elem).open();
	    $('#finalFlipCounter').html(flipCounter)
	}
}