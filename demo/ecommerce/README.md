[See in Action !](http://kmk1986.github.com/Backbone-Mediator/demo/ecommerce/)

Intro
=====

This is very simple e-commerce like website. You have four modules -- itemList, currencyConverter, cart, and summary.

* itemList - displays items and take care of "add to cart" event
* currencyConverter - sends out 'updateCurrency' to the mediator. 
* cart - displays added items
* summary - displays subtotal

Facts
======
* Removing one of the modules will not break this demo.
* Adding a new module will not break this demo
* each modules don't know each others. 

