describe("Galaxy", function(){

	/********************************
	*		.register()
	********************************/

	describe(".register",function(){

		it("should return an instance of a Module",function(){

			var Module = Galaxy.register('module');

			expect( Module instanceof Galaxy.Class.Module ).toEqual(true);

		});

	});

	/********************************
	*		.registerSingleton()
	********************************/

	describe(".registerSingleton", function(){

		it("should return the same instance when you call it with the same id", function(){


				var Module = Galaxy.registerSingleton('module1');
				var Module2 = Galaxy.registerSingleton('module1');

				expect( Module).toEqual( Module );


		});

	});

	/********************************
	*		.on()
	********************************/

	/********************************
	*		.off()
	********************************/

	/********************************
	*		.getEventMapOf()
	********************************/

	/********************************
	*		.getEventMap()
	********************************/

	/***************************************
	*		.getListenersByEventName()
	****************************************/


	describe(".getListenersByEventName", function(){

		it("should return module I.Ds who's listening to a speicified event", function(){


			var moduleA = Galaxy.register("getListenersByEventName_A");
			var moduleB = Galaxy.register("getListenersByEventName_B");
			var moduleC = Galaxy.register("getListenersByEventName_C");

			moduleA.subscribeOne("test",function(){});
			moduleB.subscribeOne("test",function(){});
			moduleC.subscribeOne("test",function(){});

			var testListeners = Galaxy.getListenersByEventName('test')

			expect(testListeners.length).toEqual(3);

			expect(testListeners[0]).toEqual("getListenersByEventName_A");
			expect(testListeners[1]).toEqual("getListenersByEventName_B");
			expect(testListeners[2]).toEqual("getListenersByEventName_C");

		});


	});



	/****************************************
	*		.getReserverByEventName()
	****************************************/



});



