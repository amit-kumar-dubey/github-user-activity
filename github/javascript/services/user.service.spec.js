//git user service testing

describe("User Service Testing:: ", function() {

    'use strict';

    beforeEach(module('Github'));

    var myService;
    var httpBackend;
    var expectedResponseData;
    var errorStatus = '';
    var handler;


    beforeEach(inject(function($httpBackend, _userService_) {

        httpBackend = $httpBackend;
        myService = _userService_;


    }));

    it('should call the user.service API', function() {

        httpBackend.expectGET('https://api.github.com/users/amit-kumar-dubey').respond('');

        myService.getData();

        httpBackend.flush();

    });

    it('should get a response from user.service', function() {

        var expecteddata = { title: 'amit' };

        expect(myService).toBeDefined();

        httpBackend.whenGET('https://api.github.com/users/amit-kumar-dubey').respond(expecteddata);

        myService.getData().then(function(response) {

            expect(response).toEqual(expecteddata);

        });

        httpBackend.flush();

    });

    // check when dataComplete and dataFailed from user.service


    beforeEach(function() {
        expectedResponseData = '';
        errorStatus = '';
        handler = {
            dataComplete: function(response) {
                expectedResponseData = response;
            },
            dataFailed: function(error) {
                errorStatus = error;
            }
        };

        spyOn(handler, 'dataComplete').and.callThrough();
        spyOn(handler, 'dataFailed').and.callThrough();

    });


    it('should return an Json on success', function() {

        var response = { title: 'amit' };

        httpBackend.whenGET('https://api.github.com/users/amit-kumar-dubey').respond(response);

        myService.getData().then(handler.dataComplete);

        httpBackend.flush();

        expect(handler.dataComplete).toHaveBeenCalled();

        expect(expectedResponseData).toEqual(response);

        expect(handler.dataFailed).not.toHaveBeenCalled();

        expect(errorStatus).toEqual('');


    });


    it('should return an error on failed', function() {

        var response = 404;

        httpBackend.whenGET('https://api.github.com/users/amit-kumar-dubey').respond(404);

        myService.getData().catch(handler.dataFailed);

        httpBackend.flush();

        expect(handler.dataFailed).toHaveBeenCalled();

        expect(errorStatus).toEqual(404);

        expect(handler.dataComplete).not.toHaveBeenCalled();

        expect(expectedResponseData).toEqual('');


    });











});
