var expect = require('chai').expect;
var has = require ('../index.js');

describe('has', function(){
  it('ignores no mandated properties', function(){
    has({});
  });

  it('ignores provided mandated properties', function(){
    has({'propertyOne':'valueOne',
        'propertyTwo':'valueTwo'},
        'propertyOne', 'propertyTwo');
  });

  it('mandates property', function(){
    expect(function(){
      has({}, "property");
    }).to.throw(Error, "Property is required");
  });

  it('mandates first property only', function(){
    expect(function(){
      has({}, "propertyOne", "propertyTwo");
    }).to.throw(Error, "Property one is required");
  });

  it('humaizes property name', function() {
    expect(function(){
      has({}, "propertyName");
    }).to.throw(Error, "Property name is required");

    expect(function(){
      has({}, "property_name");
    }).to.throw(Error, "Property name is required");
  });

  describe('nested properties', function() {
    it('are mandated', function() {
      expect(function(){
        has({}, "obj.property.value");
      }).to.throw("Obj.property.value is required");

      expect(function(){
        has({}, "obj.property.item.value");
      }).to.throw("Obj.property.item.value is required");

      expect(function(){
        has({}, "obj.this.is.a.deeply.nested.property");
      }).to.throw("Obj.this.is.a.deeply.nested.property is required");
    });

    it('are ignored if provided', function() {
      has({obj: {
        property: {
          item: {
            value: {}
          }
        }
      }}, "obj.property.item.value");
    });
  });
});
