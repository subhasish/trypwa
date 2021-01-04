let deferredPrompt;
let btnNext = document.querySelector(".next-button");

window.addEventListener('beforeinstallprompt', (event) => {
	//Prevent Chrome 67 and earlier from automatically showing the prompt
	event.preventDefault();
	
	//Stash the event so it can be triggered later
	deferredPrompt = event;
	
	//Update UI notify the user they can add to home screen
	//btnAdd.style.display = 'block';
});

btnNext.addEventListener('click', (event) => {
	deferredPrompt.prompt();
	deferredPrompt.userChoice.then( (choiceResult) => {
		if(choiceResult.outcome === 'accepted') {
			console.log('User accepted the A2HS prompt');
			//can fire analytics as well
		}
		deferredPrompt = null;
	});
});

window.addEventListener('appinstalled', (event) => {
	app.logEvent('a2hs', 'installed');
});