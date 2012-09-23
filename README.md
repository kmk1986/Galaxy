About
======

* A simple Backbone compatible mediator
* provide core events for plugins
* works without Backbone as well

Based on
=========
* http://www.yuiblog.com/blog/2009/09/17/video-bayjax-sept-09/
* http://addyosmani.com/largescalejavascript/

Backbone Mediator is currently under development. 

Demos
=====

* https://github.com/kmk1986/OSX-in-Javascript (work in progress)
* [E-Commerce demo](https://github.com/kmk1986/Backbone-Mediator/tree/gh-pages/demo/ecommerce)

Download
=========

It's not recommended to download this project and use it in production. The project is under development.

* [Download](https://raw.github.com/kmk1986/Backbone-Mediator/master/download/Galaxy.js)
* [Download AMD Compatible](https://raw.github.com/kmk1986/Backbone-Mediator/master/download/Galaxy.AMD.js)

Plugins

* [EventLogger](https://raw.github.com/kmk1986/Backbone-Mediator/master/download/plugin/EventLogger.js)

Documentation
=============
[Documentation - work in progress](http://kmk1986.github.com/Backbone-Mediator/)


Test
=====

[Run Tests - work in progress](http://kmk1986.github.com/Backbone-Mediator/tests/)

Todo
=====
* rename it to Galaxy
* make it smile with jshint/jslint
* add an AMD version (done)
* add pub/sub to the core (done)
* separate events related variables from the core; make it as a plugin instead (invalid for now)
* add dom manipulation API to the facade (invalid for now)
* Separate the logger from the core - make it as an extension (Done)
* clean up each modules
* create test cases
* create examples for module pattern (for standalone), and requirejs (requirejs is done with OSX-in-Javascript)
* create unit tests
* create a browser plugin; display event relationships among modules;
* make a function that returns a json represented event map
* change 'promise' to 'reserve' (done)

Why
====

After using the mediator pattern described on the above mentioned articles, I felt like a logger and response/request are must. Not only a logger helps you to figure out what's happening among your modules, but it also helps other team members to understand your modules better and faster.

Even with a mediator, sometimes you need to request a data from a module. When you're not using a mediator pattern, you can simply access an object and invoke a method. In a mediator pattern, it's simply not possible since modules are depend on a mediator pattern -- they don't know each other. Using request/resposne makes it possible to receive a data from a module without directly accessing the module as long as the module responses your request. (Doc will be added)
