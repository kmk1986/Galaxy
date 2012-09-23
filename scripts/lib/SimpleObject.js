/*
*	A simple object with set, has, get, and getAll methods
*/
var SimpleObject = function()
{
	this.properties = {}
}

SimpleObject.prototype = {

	set: function( keyName, values )
	{
		this.properties[keyName] = values;
	},

	has: function( keyName )
	{
		if( this.properties[keyName] != undefined )
		{
			return true;
		}

		return false;
	},

	getAll: function()
	{
		return this.properties;
	},

	get: function( keyName )
	{
		if( this.has(keyName) )
		{
			return this.properties[keyName];
		}

		throw keyName + " is not set";
	},

	remove: function( keyName ) {

		if( this.has(keyName) ) {
			
			this.properties[keyName] = null;


			try {
				delete this.properties[keyName];
			}catch(e) {

			}
		}

	}
}

