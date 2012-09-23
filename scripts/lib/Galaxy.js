/*
*	A public module to be used as a facade to all the other private components
*
*	Commenting Style Guide
*	    Example: @param {type} varName 
*		@directive = param, return
*		{type} = use lower case for the native types; use upper case for the first letter for the custom classes
*		varName = function parameter name
*			
*/
var _Mediator = (function(){

	var instances = {}

	var internalEvents = {}

	return {

		/*
		* Implements pub/sub pattern
		* @param {string} - eventName
		* @param {function} - a callback upon {eventName}  
		*/
		on: function( eventName, callback ) {

			if( typeof callback === 'function' ) {

				if( internalEvents[eventName] == undefined ) {
					
					internalEvents[eventName] = [];
					
				}

				internalEvents[eventName].push( callback );

				return true;

			}
			else
			{
				throw "_Mediator.on: supplied callback is not a valid function";
			}

		},

		/*
		* Stop listening to an event
		* @param {string} eventName - name of the event
		* @param {function} callback - a function that you've passed to the event
		*/
		off: function( eventName, callback ) {

			if( internalEvents[eventName] != undefined ) {

				if( typeof callback === 'function' ) {

					var events = internalEvents[eventName];

					var i;
					for( i in events ) {

						if( events.hasOwnProperty(i) && events[i] === callback ) {

							//can't use delete since IE6 doesn't support it
							//set null instead;
							events[i] = null;
						}

					}

				} else {

					throw "_Mediator.off: supplied callback is not a valid function";

				}


			} else {

				throw "_Mediator.off: " + eventName + " doesn't exist";

			}



		},

		trigger: function( eventName, eventData ) {


			if( internalEvents[eventName] ) {


				eventData = eventData || {}

				Util.each(internalEvents[eventName], function(event){

					if( typeof event === 'function' ) {
						event(eventData);
					}

				});


			}

		},

		/*
		*	create a new instance of a facade object
		*	@param {string} name
		*
		*	@return  {Module}
		*/
		register: function(name)
		{
			return Mediator.register( name );
		},

		/*
		*   create a singleton instance of a facade object.
		*	calling this method twice with the same name wil return the 
		*	same instance.
		*
		*	@param {string} name
		*
		*	@return {Module}
		*/
		registerSingleton: function( name )
		{
		
			if( !ModuleCollection.has( name ) )
			{
				Mediator.register( name );
			}

			return ModuleCollection.get(name);
			
		},

		/*
		*	returns an event map of the speicified instance
		*
		*   @param	{string}  name
		*/
		getEventMapOf: function( name )
		{

			if( ModuleCollection.has( name ) )
			{
				return ModuleCollection.get( name ).getEventMap();
			}

			return undefined;

		},

		/*
		*   returns eventmap of all the instances
		*/
		getEventMap: function()
		{
			// return EventMap.getAll();

			var eventMap = {}

			Util.each( ModuleCollection.getAll(), function(module){

				eventMap[module.getId()] = module.getEventMap();

			});

			return eventMap;

		},

		/*
		*	returns module names who registered $eventName
		*
		*	@param {string} eventName
		*
		*	@return {array}
		*/
		getListenersByEventName: function(eventName)
		{


			var listeners = [];

			Util.each( ModuleCollection.getAll(), function(module){

				if( module.subscribed( eventName ) )
				{
					listeners.push( module.getId() );
				}

			});	

			return listeners;	

		},

		/*
		*	returns module names who promised $eventName
		*
		*	@param {string} eventName
		*
		*	@return {array}
		*/
		getReserverByEventName: function(eventName)
		{
			var promised = [];

			Util.each( ModuleCollection.getAll(), function(module){

				if( module.hasPromised(eventName) )
				{
					promised.push( module.getId() );
				}

			});
			return promised;
		}
	}


}());

_Mediator.Class = {
	Module: Module,
	Mediator: Mediator
} 

if( window.Backbone ) {
	Backbone.Galaxy = _Mediator;
} else {
	window.Galaxy = _Mediator;
}