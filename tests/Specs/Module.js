describe("Module", function(){

	/********************************
	*		.start()
	********************************/

	describe(".start",function(){

	});

	/********************************
	*		.stop()
	********************************/

	describe(".stop",function(){

		it("should set null for all the module data", function(){

			var module = Galaxy.register( Math.random() );
			module.stop();


			var i;
			var hasData = 0;

			for(i in module) {
				if( module.hasOwnProperty(i) ) {
					if( module[i] !== null && module[i] !== 0) {
						hasData = 1;
					}
				}
			}

			expect( hasData ).toEqual( 0 ) ;
			

		});

	});

	/********************************
	*		.getStatus()
	********************************/

	describe(".getStatus",function(){

		it("should return Module.STATUS.STARTED when the module has started", function(){

			var module = Galaxy.register( Math.random() );

			expect( module.getStatus() ).toEqual( module.STATUS.STARTED );

		});

	});

	/********************************
	*		.subscribeOne()
	********************************/

	describe(".subscribeOne",function(){

		it("should subscribe an event", function(){

			var moduleA = Galaxy.register("subscribeOne_A");
			var moduleB = Galaxy.register("subscribeOne_B");

			moduleB.subscribeOne("eventTest",function(eventData){

				expect( eventData.sender ).toEqual( 'subscribeOne_A' );
				expect( eventData.name ).toEqual( 'moon' );


			});

			moduleA.reserveEvent("eventTest");
			moduleA.publish("eventTest", {
				name: 'moon'
			});

		});

	});

	/********************************
	*		.subscribe()
	********************************/			

	describe(".subscribe",function(){

		it("can subscribe multiple events", function(){

			var moduleA = Galaxy.register("subscribe_A");
			var moduleB = Galaxy.register("subscribe_B");

			var onTestEvent1 = function() {

			}

			var onTestEvent2 = function() {

			}


			moduleB.subscribe({
				"testEvent1": onTestEvent1,
				"testEvent2": onTestEvent2
			});

			moduleA.reserveEvents(["testEvent1","testEvent2"]);

			var testEvent1Called = moduleA.publish("testEvent1", {
				eventName: 'testEvent1'
			});

			var testEvent2Called = moduleA.publish("testEvent2", {
				eventName: 'testEvent2'
			});

			expect( testEvent1Called + testEvent2Called ).toEqual(2);


		});

	});

	/********************************
	*		.publish()
	********************************/

	describe(".publish",function(){

	});

	/********************************
	*		.hasReserved()
	********************************/

	describe(".hasReserved",function(){

	});

	/********************************
	*		.reserveEvent()
	********************************/

	describe(".reserveEvent",function(){

	});

	/********************************
	*		.reserveEvents()
	********************************/

	describe(".reserveEvents",function(){

	});

	/********************************
	*		.getId()
	********************************/

	describe(".getId",function(){

		it("should return id of the module", function(){

			var module = Galaxy.register("thisismoduleid");


			expect( module.getId() ).toEqual("thisismoduleid");

		});

	});

	/********************************
	*		.getEvents()
	********************************/

	describe(".getEvents",function(){

	});

	/********************************
	*		.subscribed()
	********************************/

	describe(".subscribed",function(){

	});

	/********************************
	*		.reserveRequest()
	********************************/

	describe(".reserveRequest",function(){

	});

	/********************************
	*		.hasResponse()
	********************************/

	describe(".hasResponse",function(){

	});

	/********************************
	*		.responseOne()
	********************************/

	describe(".responseOne",function(){

	});

	/********************************
	*		.request()
	********************************/

	describe(".request",function(){

	});

	/********************************
	*		.response()
	********************************/

	describe(".response",function(){

	});	













});