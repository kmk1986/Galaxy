// var EventMap = new SimpleObject();
var ResponseMap = new SimpleObject();
var ModuleCollection = new SimpleObject();

/*
*	This Object is not public.
*	It is accessed by _Mediator
*/

var Mediator = (function(){

	return {

		/*
		*	Publish an event
		*	
		*	@param {string} senderName
		*	@param {string} eventName
		*	@param {mixed}	eventData - can be any type of Javascript data type
		*/
		publish: function(senderName, eventName, eventData)
		{


			var sender = ModuleCollection.get( senderName );

			var fired = 0;


			Util.each( ModuleCollection.getAll(), function(module,moduleName){

				Util.each( module.getSubscribedEvents(), function( event , moduleEventName){

					

					if( moduleEventName == eventName )
					{
						eventData = eventData || {}
						eventData.sender = senderName;

						sender.addPublishedEvent( eventName );

						module.addReceivedEvent( senderName, eventName );

						module.executeEventCallbacks( eventName, eventData );

						fired++;

						_Mediator.trigger('event-published', {
							sender: {
								namespace: 'Mediator',
								method: 'publish'
							},
							senderName: senderName,
							eventName: eventName,
							moduleName: moduleName,
							eventData: eventData

						});

				
					}

				});

			});


			if( fired === 0 ) {

				_Mediator.trigger("event-listener-not-found", {
					sender: {
						namespace: "Mediator",
						method: "publish"
					},
					senderName: senderName,
					eventName: eventName
				});

			}

			return fired;


		},

		/*
		*	Register an instance
		*
		*/
		register: function(name, autostart)
		{
			
			autostart = autostart || true;

			if( !ModuleCollection.has(name) )
			{
				// var module = new ModuleCommanderFacade(name, autostart);
				var module = new Module(name, autostart);
				ModuleCollection.set( name, module );
				
				return ModuleCollection.get(name);
			}
			else
			{
				throw name + " is registered already";
			}

		},

		stop: function(name) {

			ModuleCollection.remove(name);

		},

		/*
		*	Send a request 
		*	
		*	@param	{string} senderName
		*	@param	{string} requestName
		*
		*	@return {mixed}
		*/
		request: function(senderName, requestName)
		{
			if( ResponseMap.has(requestName) )
			{
				var response = ResponseMap.get(requestName);

				var result = {}

				Util.each(response.modules, function(moduleName){

					result[moduleName] = ModuleCollection.get(moduleName).module.executeResponseMethod( senderName, requestName );

				});

				return result;

			}
			else
			{
				throw requestName + " is not registered as a response";
			}
		},

		/*
		*	Add a response
		*	
		*	@param {string} moduleName
		*	@param {string} responseName
		*/
		addResponse: function( moduleName, responseName )
		{
			if( !ResponseMap.has(responseName) )
			{
				ResponseMap.set( responseName, {

					modules: []

				});
			}

			ResponseMap.get( responseName ).modules.push( moduleName );

			return true;
		}


	}

}()); 