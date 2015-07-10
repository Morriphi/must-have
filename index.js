var humanize = require("underscore.string/humanize");

function has(obj) {
  var properties = Array.prototype.slice.call(arguments, 1);
  properties.forEach(function(prop){
    if(!obj.hasOwnProperty(prop)){
      throw new Error(humanize(prop) + ' is required');
    }
  });
};

module.exports = has;
