/*
*   Most of these functions are extracted from underscore
*   to remove the dependencies
*/
var Util = {}

Util.each = function(obj, iterator, context) {
    var breaker = {}
    var nativeForEach = Array.prototype.forEach;
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {

        if( obj.hasOwnProperty(key) ) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
}

Util.isArray = function( obj ) {

    return Object.prototype.toString.call(obj) === '[object Array]';

}

Util.sizeObject = function(obj) {

    var len = 0;
    var i;

    for( i in obj ) {
        if( obj.hasOwnProperty(i) ) {
            len += 1;
        }
    }

    return len;

}

Util.proxy = function(func,context) {

    var args;

    // arguments doesn't inherits array prototypes
    // we need to access them directly.
    args = Array.prototype.slice.call(arguments,2);

    return function() {
        return func.apply( context, args.concat( Array.prototype.slice.call(arguments) ));
    }
}