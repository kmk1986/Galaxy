;(function(Galaxy){

	// for...u know IE browsers
	if( window.console == undefined ) {
		window.console = {
			log: function() {

			}
		}
	}

	/*
	* @param {object} eventData
	*	@param {object} sender
	*		@param {string} namespace - sender object
	*		@param {string} method - sender method
	*	@param {string} eventName - name of the event published
	*	@param {string} senderName - name of the sender who published  the event
	*	@param {string} moduleName - name of the module who received the event
	*	@param {object} eventData 
	*/
	
	Galaxy.on('event-published', function(eventData){

		var msg = [
			eventData.senderName,
			" published '",
			eventData.eventName,
			"' to ",
			eventData.moduleName,
			" with eventData of ",
			eventData.eventData
		];

		eventData = null;

		console.log(msg.join(""));

	});


	/*
	* @param {object} eventData
	*	@param {object} sender
	*		@param {string} namespace - sender object
	*		@param {string} method - sender method
	*	@param {string} eventName - name of the event subscribed
	*	@param {string} moduleName - name of the module who subscribed the event
	*/	
	Galaxy.on('event-subscribed', function(eventData){

		var msg = [

			eventData.moduleName,
			" subscribed to ",
			eventData.eventName

		];

		eventData = null;

		console.log( msg.join("") );
		
	});


}(Galaxy));

