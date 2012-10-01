var itemList = (function(){

	var view;
	var mediator;


	var onActionAddClicked = function(e) {

		var elementsWithItemData = $(e.target).parent().find(".item-data");

		var itemData = {}

		$.each(elementsWithItemData, function(index, item){

			var item = $(item);

			itemData[ item.data('name') ] =  item.text();


		});

		itemData.price = parseFloat( itemData.price );

		mediator.publish("itemAdded", itemData);

		itemData = null;

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


			view = $("#module-itemList");
			view.find(".action-add").bind("click", $.proxy(onActionAddClicked,this) );

			mediator = Galaxy.register('itemList');

			// reserve events so we can publish them
			mediator.reserveEvents([
				'itemAdded'
			]);

			mediator.subscribe({
				'updateCurrency': [onUpdateCurrencyRequested, this]
			});

		}
	}

}(Galaxy));