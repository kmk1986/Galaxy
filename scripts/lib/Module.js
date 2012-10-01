/*
*    Facade
*/
var Module = function(id, autostart )
{
	// name of the instance
	this.id = id;

	// holds all the events of the instance

	// subscribed events
	this.subscribedEvents = {}

	// received events
	this.receivedEvents = {}

	// reserved events
	this.reservedEvents = {}


	// published events
	this.publishedEvents = {}

	// responses
	this.responseTo = {}
	
	// reserved request
	this.reservedRequests = {}

	// requested response
	this.requestedResponse = {}

	this.queriedRequest = {}

	if( autostart === true ) {

		this.currentStatus = this.STATUS.STARTED;

	}else {

		this.currentStatus = this.STATUS.STOPPED

	}

	/*
	* Modules in this list can acccess this object's method directly
	*/
	this.directAccessList = {} 

}


Module.prototype = {

	STATUS: {
		STOPPED: 0,
		STARTED: 1
	},



	resetVariables: function( value ) {

		this.events = value;
		this.receivedEvents = value;
		this.reservedEvents = value;
		this.publishedEvents = value;
		this.responseTo = value;
		this.reservedRequests = value;
		this.requestedResponse = value;
		this.queriedRequest = value;
		this.id = value;		

	},

	start: function() {


		this.resetVariables({});
		this.events = [];

		this.currentStatus = this.STATUS.STARTED;

	},

	/*
	*  Allow modules to access a module directly
	*  only the allowed modules can get an instance of a module by Galaxy.getModule()
	*
	*/
	allowDirectAccess : function( moduleList ) {

		var i;
		for( i in moduleList ) {

			if( moduleList.hasOwnProperty(i) ) {

				this.allowDirectAccessTo( moduleList[i] );

			}
		}

	}

	allowDirectAccessTo: function( moduleName ) {

		this.directAccessList[moduleName] = true;

	},

	unallowDirectAccessTo: function( moduleName ) {
		
		this.directAccessList[moduleName] = false;

	},

	getStatus: function() {
		return this.currentStatus;
	},

	stop: function() {

		Mediator.stop(this.getId());
		this.resetVariables(null);
		this.subscribedEvents = null;
		this.status = this.STATUS.STOPPED;
		this.currentStatus = this.STATUS.STOPPED;
	},

	/*
	* Subscribes to an event
	* @param {string} eventName - name of the event	
	* @param {function} callback - a callback
	* @param {object} (Optional) bindTo - an object for the context of 'this' in the callback 
	* @public
	*/
	subscribeOne: function( eventName, callback, bindTo )
	{

		if( bindTo != undefined )
		{
			callback = Util.proxy(callback, bindTo);
		}
		

		this.subscribedEvents[ eventName ] = {
			callback: callback
		}

		_Mediator.trigger('event-subscribed', {
			sender: {
				namespace: 'Module',
				method: 'subscribeOne'
			},
			moduleName: this.getId(),
			eventName: eventName
		});		

	},

	/*
	* Subscribes to events
	* @param {object} events 
	*
	* .subscribe({
	*	['eventName','callback','bindTo']
	* })
	*
	* @public
	**/
	subscribe: function( events )
	{
		

		var i;
		var callback;
		for( i in events )
		{
			if( events.hasOwnProperty(i) )
			{
				callback = events[i];
					
				if( Util.isArray(callback) )
				{
					
					if( callback.length >= 2 )
					{
						this.subscribeOne(i, callback[0], callback[1] );
					}
				}
				else
				{
					this.subscribeOne(i, callback );
				}


			}
		}
	},

	unsubscribe: function(eventName) {

		if( this.subscribedEvents[eventName] != undefined ) {

			// set null for now;
			// ie6 doesn't support delete
			// may drop ie6 later
			this.subscribedEvents[eventName] = null;
			
			try {
				delete this.subscribedEvents[eventName];
			} catch(e) {

			}


			_Mediator.trigger('event-unsubscribed', {
				sender: {
					namespace: 'Module',
					method: 'unsubscribe'
				},
				moduleName: this.getId(),
				eventName: eventName
			});		


			return true;


		}


		return false;

	},

	/*
	* Publishes an event
	* @param {string} eventName - the name of the even you're interested 
	* @param {string} (Optional) eventData - event data
	* @public
	*/
	publish: function(eventName, eventData)
	{
		if( this.hasReserved( eventName ) )
		{
			return Mediator.publish( this.id, eventName, eventData );
		}
		else
		{
			throw eventName + " has not been reserved.";
		}
		
	},


	/*
	* Checks if an event has been promised or not
	* @param {string} eventName - the event that you're interested
	* @return {bool}
	*/
	hasReserved: function( eventName )
	{
		return this.reservedEvents[eventName];
	},

	/*
	* Promises an event - You must promise an event in order to publish it
	* @param {string} eventName
	* @return {bool} true if 'eventName' has been added to the promised list; false if it's been 
	*				 registered already
	* @todo 
	*	- think about the process; Do we need to register an event in order to promise it?
	*	- it sounds like a good idea, but I don't know yet.
	*/
	reserveEvent: function( eventName )
	{
		if( this.reservedEvents[eventName] == undefined )
		{
			this.reservedEvents[eventName] = true;

			/*
			*   Add published event object here so that we don't have to
			*   check it in 'addPublishedEvent' 
			*/
			this.publishedEvents[eventName] = {
				count: 0
			}

			return true;
		}

		return false;
		
	},

	/*
	* Promises events
	* @param {array}
	* .promiseEvents(["event1","event2"]);
	*/
	reserveEvents: function( events )
	{

		var i;

		for( i in events ) {

			if( events.hasOwnProperty(i) ) {
				this.reserveEvent( events[i] );
			}
		}

	},

	getId: function()
	{
		return this.id;
	},

	getSubscribedEvents: function( returnNameOnly )
	{
		returnNameOnly = returnNameOnly || false;

		if( returnNameOnly ) {

			var subscribed = [];

			Util.each(this.subscribedEvents, function(eventName){

				subscribed.push(eventName);

			});

			return subscribed;

		}

		return this.subscribedEvents;
	},

	subscribed: function(eventName)
	{
		if( this.subscribedEvents[eventName] != undefined ) {
			return true;
		}

		return false;
	},

	addPublishedEvent: function( eventName )
	{
		this.publishedEvents[eventName].count++
	},

	addReceivedEvent: function( senderName, eventName)
	{

		if( this.receivedEvents[eventName] == undefined ) {
			this.receivedEvents[eventName] = {
				senders: []
			}
		}

		this.receivedEvents[eventName].senders.push( senderName );

	},

	hasSubscribedEvent: function(eventName)
	{
		if( this.subscribedEvents[eventName] == undefined )
		{
			return false;
		}

		return true;
	},

	getSubscribedEvent: function(name)
	{
		if( this.hasSubscribedEvent( name ) )
		{
			return this.subscribedEvents[name];
		}

		return undefined;
	},

	executeEventCallbacks: function( eventName, eventData )
	{

		var subscribedEvent = this.getSubscribedEvent( eventName );


		subscribedEvent.callback( eventData );

	},


	getEventMap: function(  )
	{

		var respondedResponse = {}


		Util.each( this.responseTo, function(obj,name){
			
			if( obj.responded )
			{
				respondedResponse[name] = obj.responded;
			}

		});

		var checkForZeroSize = [

			'subscribedEvents',
			'publishedEvents', 
			'queriedRequest', 
			'receivedEvents', 
			'reservedEvents'

		];

		var i;
		for( i in checkForZeroSize ) {
			if( checkForZeroSize.hasOwnProperty(i) ) {

				if( Util.sizeObject( this[ checkForZeroSize[i] ] ) === 0 ) {
					this[ checkForZeroSize[i] ] = undefined;
				}
			}
		}

		checkForZeroSize = null;
		
		if( Util.sizeObject(respondedResponse) === 0 ) {
			respondedResponse = undefined;
		}

		return {

			subscribedEvents: this.subscribedEvents,
			receivedEvents: this.receivedEvents,
			publishedEvents: this.publishedEvents,
			reservedEvents: this.reservedEvents,
			reservedRequest: this.reservedRequest,
			queriedRequest: this.queriedRequest,
			respondedResponse: respondedResponse

		}

	},

	reserveRequest: function( requestName )
	{
		if( this.reservedRequest[requestName] == undefined )
		{
			this.reservedRequest[requestName] = true;

			this.queriedRequest[requestName] = {
				count: 0
			}

		}


		return true;
	},


	hasResponse: function( requestName )
	{
		if( this.responseTo[requestName] != undefined )
		{
			return true;
		}

		return false;
	},

	resposneOne: function( requestName, callback, bindTo )
	{
		if( !this.hasResponse( requestName ) )
		{

			if( bindTo != undefined )
			{
				callback = Util.proxy(callback, bindTo);
			}

			this.responseTo[requestName] = {
				callback: callback,
				responded: 0
			}
		}

		Mediator.addResponse( this.getId(), requestName );
	},

	request: function( requestName )
	{
		if( this.reservedRequest[requestName] != undefined )
		{
			this.queriedRequest[requestName].count++;

			return Mediator.request( this.getId(), requestName );
		}
		else
		{
			throw "Request " + requestName + " is not reserved.";
		}
	},

	response: function( requestNames )
	{
		var i;
		var callback;

		for( i in requestNames )
		{
			if( requestNames.hasOwnProperty(i) )
			{
				callback = requestNames[i];

				if( Util.isArray(callback) && (callback.length == 2) )
				{
					this.resposneOne( i, callback[0], callback[1] );
				}
				else
				{
					this.responseOne( i, callback );
				}

				
			}
		}
	},

	executeResponseMethod: function( senderName, requestName )
	{
		this.responseTo[requestName].responded++;


		return this.responseTo[requestName].callback( senderName );
	}


}
