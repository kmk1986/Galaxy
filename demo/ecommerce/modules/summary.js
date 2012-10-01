var summary = (function(Galaxy){

	var view;
	var mediator;
	var subtotalIndicator;

	var subtotal = 0;

	var onItemAdded = function(eventData) {

		subtotal += eventData.price;
		subtotalIndicator.text( subtotal );
		

	}


	var updateCurrency = function(val, symbol) {
		
		
		$.each( view.find(".currency-rate"), function(index,el){
			
			var el = $(el);
			var currentRate = parseFloat( el.text() );

			el.text( currentRate + val );

		});

		view.find(".currency-symbol").text( symbol );

	}

	var onUpdateCurrencyRequested = function(eventData) {


		// this is just an example
		// for the production, you want to pass the real value
		switch( eventData.to ) {
			case 'CNY': 
				updateCurrency(10, eventData.symbol);
				break;
			case 'USD':
				updateCurrency(-10, eventData.symbol);
				break;
		}

	}


	return {

		init: function() {

			view = $("#module-summary");
			subtotalIndicator = view.find(".subtotal");

			mediator = Galaxy.register('summary');

			mediator.subscribe({
				"itemAdded": [ onItemAdded, this],
				'updateCurrency': [onUpdateCurrencyRequested, this]
			});

		}
	}

}(Galaxy));