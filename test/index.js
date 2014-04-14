const BaseController = require('../');
const expect = require('chai').expect;

describe('Controller', function () {

  describe('::extend', function () {
    it('should allow default controller actions to be overridden and custom actions to be added', function () {
      var customActions = {
        create: false,
        customAction: true
      };
      var controller = BaseController.extend(customActions);
      expect(controller.create).to.equal(customActions.create)
      expect(controller.customAction).to.equal(customActions.customAction);
    });
  });

});
