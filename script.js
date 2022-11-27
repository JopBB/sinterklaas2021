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
		alert("Weet je dit zeker? Misschien komt je droomman nog wel later voorbij")
	}
}


messageCounter=0
hapjeEtenSent=false;
gesprekAfgerond=false;
raadselSent=false;
function sendMessage(){
	var input = $("#userInput");
	var message = $(".imessage");
	var newMessage = "<p class='from-me'>" + input.val() + "</p>"


	message.append(newMessage);
	$(".imessage").scrollTop($(".imessage").height()+1000);
	if(raadselSent){
		console.log('lalalala')
		if(input.val().includes("1") || input.val().includes("een")){
			setTimeout(function(){
				message.append("<p class='from-them'>Helemaal goed! Je cadeautje moet je zoeken in de gangkast! Zie je snel!</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
				gesprekAfgerond=true;
			},3000)
			gesprekAfgerond=true;
		}else{
			setTimeout(function(){
				message.append("<p class='from-them'>Nee, dat klopt niet helemaal! Probeer het nog eens?</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
			},3000)
		}
	}
	if(messageCounter<1){
		setTimeout(function(){
			message.append("<p class='from-them'>Haha, dat is een hele goeie!</p>")
			$(".imessage").scrollTop($(".imessage").height()+1000);
			setTimeout(function(){
				message.append("<p class='from-them'>Heb je misschien zin om eens samen een hapje te eten? Je cadeautje zou daar wel eens bij kunnen helpen :) Dan help ik je met het vinden van je cadeau!</p>")
				hapjeEtenSent=true;
				$(".imessage").scrollTop($(".imessage").height()+1000);
			},5000)
		},2000)
	}else if(hapjeEtenSent && !gesprekAfgerond && !raadselSent){

		if(input.val().includes("ja") || input.val().includes("leuk")){
			setTimeout(function(){
				message.append("<p class='from-them'>Oke! Gezellig. Dan zal ik je nu helpen met het vinden van je cadeau. Als je dit raadsel oplost zal ik je helpen:</p>")
				$(".imessage").scrollTop($(".imessage").height()+1000);
				setTimeout(function(){
					message.append("<p class='from-them'>Onderweg naar de winkel liep ik een vrouw tegemoet. Deze vrouw had 2 rugzakken met in elke rugzak 3 katten, met elk 3 kittens. Katten en mensen bij elkaar, met z’n hoe velen liepen we naar de winkel?</p>")
					raadselSent=true;
					$(".imessage").scrollTop($(".imessage").height()+1000);
				},3000)
			},5000)
		}else{
			setTimeout(function(){
				message.append("<p class='from-them'>Oh jammer. Nou, dan heb je vast ook niks aan je cadeautje, laat dan maar.</p>")
				gesprekAfgerond=true;
				$(".imessage").scrollTop($(".imessage").height()+1000);
			},2000)
		}
	}else if(gesprekAfgerond && input.val().includes("sorry")){
		setTimeout(function(){
				message.append("<p class='from-them'>Nou oke dan.. Toch zin om een keer met me te eten?")
				$(".imessage").scrollTop($(".imessage").height()+1000);
				gesprekAfgerond=false;
			},5000)
	}
	input.val('')
	messageCounter++;
	$(".imessage").scrollTop($(".imessage").height()+1000);
}	

function saveProfile(){
	window.location.assign('index.html');
}
