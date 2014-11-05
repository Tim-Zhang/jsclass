(function(global) {
    _extend = function( obj ) {
    var type = typeof obj, source, prop;
    if ( !(type === 'function' || type === 'object' && !!obj) ) return obj;

    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (hasOwnProperty.call(source, prop)) {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
    }

    var Class = function( protoProps, staticProps, parent ) {
        var child;

        if ( !parent ) {
            parent = Class
            if ( !protoProps || !protoProps.hasOwnProperty(constructor) ) child = function() {};
        }

        if ( protoProps && protoProps.hasOwnProperty(constructor) ) {
            child = protoProps.constructor;
        }
        else {
            child = function() { parent.apply( this, arguments ); };
        }

        var ctor = function() { this.constructor = child; };
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();

        _extend( child, parent, staticProps );
        if ( protoProps ) _extend( child.prototype, protoProps );

        child.__base__ = parent.prototype;

        return child;
    };

    Class.extend = function( protoProps, staticProps ) {
       return Class.call( this, protoProps, staticProps, this );
    };

    // Requirejs
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return Class;
        });

      // Next for Node.js or CommonJS. jQuery may not be needed as a module.
    } else if (typeof exports !== 'undefined') {
        module.exports = Class;

      // Finally, as a browser global.
    } else {
        global.Class = Class;
    }

})(this);


// Test

//var a = Class({name: 'Tim', printName: function() {console.log(this.name);}});
//a.whoami = 'a'
//var b = Class.extend(a)({name: 'Tim Zhang'});

// or

//var b = a.extend( {name: 'Tim Zhang'} );






