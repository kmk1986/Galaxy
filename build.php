<?php

$saveTo = "./index.html";

$dir = getcwd();


$layout = array(

	'header'=> file_get_contents("./includes/header.html"),
	'footer'=> file_get_contents("./includes/footer.html"),
	'sidebar_begin'=> file_get_contents("./includes/sidebar_begin.html"),
	'sidebar_end'=> file_get_contents("./includes/sidebar_end.html"),
	'container_begin'=> file_get_contents("./includes/container_begin.html"),
	'container_end'=> file_get_contents("./includes/container_end.html")

);

$sidebarContents = array
(

	"Galaxy.html",
	"Mediator.html",
	"Module.html",
	"E.T.C.html",
	"Examples.html",
	"Plugins.html"
);

$containerContents = array
(
	"Galaxy/register.html",
	"Galaxy/registerSingleton.html",
	"Galaxy/on.html",
	"Galaxy/off.html",
	"Galaxy/getEventMapOf.html",
	"Galaxy/getEventMap.html",
	"Galaxy/getListenersByEventName.html",
	"Galaxy/getReserverByEventName.html",

	"Mediator/publish.html",
	"Mediator/register.html",
	"Mediator/request.html",
	"Mediator/addResponse.html",

	"Module/start.html",
	"Module/stop.html",
	"Module/getStatus.html",
	"Module/subscribeOne.html",
	"Module/subscribe.html",
	"Module/publish.html",
	"Module/hasReserved.html",
	"Module/reserveEvent.html",
	"Module/reserveEvents.html",
	"Module/getId.html",
	"Module/getSubscribedEvents.html",
	"Module/subscribed.html",
	"Module/getEventMapOf.html",
	"Module/reserveRequest.html",
	"Module/hasResponse.html",
	"Module/responseOne.html",
	"Module/request.html",
	"Module/response.html",

	"ETC/internalEvents.html"



);

$contents = array();


array_push($contents, $layout['header']);
array_push($contents, $layout['sidebar_begin']);

foreach($sidebarContents as $sidebarContent) 
{

	array_push($contents, file_get_contents( $dir . "/sidebar/" . $sidebarContent) );	
}

array_push($contents, $layout['sidebar_end']);
array_push($contents, $layout['container_begin']);

foreach($containerContents as $containerContent) 
{
	array_push($contents, file_get_contents( $dir . "/container/" . $containerContent) );	
}

array_push($contents, $layout['container_end']);
array_push($contents, $layout['footer']);


file_put_contents($saveTo, join($contents,"") );
