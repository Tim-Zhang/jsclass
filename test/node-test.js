var Class = require('../Class')

var a = Class({name: 'Tim', printName: function() {console.log(this.name);}});

var b = a.extend();

var ob = new b();
console.log(ob.name);
a.prototype.name = 'Zhang'
console.log(ob.name);


