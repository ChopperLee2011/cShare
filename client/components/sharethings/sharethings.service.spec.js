'use strict';

describe('Service: shareThingsFactory', function () {

  // load the service's module
  beforeEach(module('fullstackApp'));

  // instantiate service
  var sharethings;
  beforeEach(inject(function (_sharethings_) {
    sharethings = _sharethings_;
  }));

  it('should do something', function () {
    expect(!!sharethings).toBe(true);
  });

});
