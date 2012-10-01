var currencyConverter = (function(Galaxy){

	var view;
	var selector;
	var mediator;

	var onCurrencyChanged = function(e) {

		var selected = $(e.target).val().split("-");

		mediator.publish("updateCurrency", {
			to: selected[0],
			symbol: selected[1]
		});
	}

	return {

		init: function() {

			view = $("#module-currencyConverter");
			selector = view.find("#currency-converter");

			selector.bind("change", $.proxy(onCurrencyChanged,this) );

			mediator = Galaxy.register('currencyConverter');

			mediator.reserveEvents([
				'updateCurrency'
			]);

		}
	}

}(Galaxy));