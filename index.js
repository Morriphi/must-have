var humanize = require("underscore.string/humanize");
var jspath = require('jspath');

function has(obj) {
  var properties = Array.prototype.slice.call(arguments, 1);
  properties.forEach(function(prop){
    if(jspath.apply(`.${prop}`, obj).length === 0) {
      throw new Error(humanize(prop) + ' is required');
    }
  });
};

module.exports = has;
