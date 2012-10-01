var cart = (function(Galaxy){

	var view;
	var list;
	var mediator;

	var createItemLi = function(itemData) {

		var li = $("<li></li>");

		var name = $("<span></span>").addClass("item-name").text( itemData.name + ": " );
		var currency = $("<span></span>").addClass('currency-symbol').text( itemData.currency );
		var price = $("<span></span>").addClass('item-price currency-rate').text( itemData.price );
		
		li.append(name)
		  .append(currency)
		  .append(price);

		return li;


	}

	var onItemAddRequested = function(eventData) {

		var rendered = createItemLi( eventData );		

		list.append( rendered );

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

			view = $("#module-cart");
			list = view.find("ul");

			mediator = Galaxy.register('cart');

			mediator.subscribe({
				"itemAdded": [onItemAddRequested, this],
				'updateCurrency': [onUpdateCurrencyRequested, this]
			});

		}

	}


}(Galaxy));

