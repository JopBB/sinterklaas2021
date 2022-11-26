//TODO: js uitsplitsen over verschillende files voor de verschillende html files
// vervolgens hobby meegeven over de verschillende files heen? Kan dat? 


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
				message.append("<p class='from-them'>Zin om misschien eens samen een hapje te eten? Je cadeautje zou daar wel eens bij kunnen helpen :) Ik kan je misschien wel helpen met het vinden van je cadeau!</p>")
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

function saveProfile(){
	window.location.assign('index.html');
}
