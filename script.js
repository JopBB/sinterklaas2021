var flipCounter = 0;

var cards = {
	A1: {
		id: "A1",
		isFlipped:false,
		completed:false,
		buddy: "A2",
		completedColor: "#e6ee9c"
	},
	A2: {
		id: "A2",
		isFlipped:false,
		completed:false,
		buddy: "A1",
		completedColor: "#e6ee9c"
	},
	B1: {
		id: "B1",
		isFlipped:false,
		completed:false,
		buddy: "B2",
		completedColor: "#a5d6a7"
	},
	B2: {
		id: "B2",
		isFlipped:false,
		completed:false,
		buddy: "B1",
		completedColor: "#a5d6a7"
	},
	C1: {
		id: "C1",
		isFlipped:false,
		completed:false,
		buddy: "C2",
		completedColor: "#4db6ac"
	},
	C2: {
		id: "C2",
		isFlipped:false,
		completed:false,
		buddy: "C1",
		completedColor: "#4db6ac"
	},
	D1: {
		id: "D1",
		isFlipped:false,
		completed:false,
		buddy: "D2",
		completedColor: "#ef5350"
	},
	D2: {
		id: "D2",
		isFlipped:false,
		completed:false,
		buddy: "D1",
		completedColor: "#ef5350"
	},
	E1: {
		id: "E1",
		isFlipped:false,
		completed:false,
		buddy: "E2",
		completedColor: "#ce93d8"
	},
	E2: {
		id: "E2",
		isFlipped:false,
		completed:false,
		buddy: "E1",
		completedColor: "#ce93d8"
	},
	F1: {
		id: "F1",
		isFlipped:false,
		completed:false,
		buddy: "F2",
		completedColor: "#ef9a9a"
	},
	F2: {
		id: "F2",
		isFlipped:false,
		completed:false,
		buddy: "F1",
		completedColor: "#ef9a9a"
	}
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