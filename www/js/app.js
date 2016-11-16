angular.module('credHub', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngCordova', 'ngResource'])
    .component('app', {
        templateUrl: "partials/app.html",
        controller:['$resource', function ($resource) {
            var ctrl = this;
            ctrl.user = {
                title: 'Developer',
                email: 'ipsum@lorem.com',
                firstName: 'Joseph',
                lastName: 'Brandenburg',
                company: 'New York Life',
                address: '30 Hudson Street',
                city: 'Jersey City',
                state: 'NJ',
                biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
                postalCode: '94043',
                userId: '',
                password: '',
                loggedIn: false,
                activePage: "login"
            };

            ctrl.trainingType = "";


        }]
    }).
    component('appHeader', {
        templateUrl: "partials/header.html",
        bindings: {
            user: '='
        },
        controller: ['$mdSidenav', function ($mdSidenav) {
            var ctrl = this;
            ctrl.toggleLeft = buildToggler('left');
            ctrl.toggleRight = buildToggler('right');

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                }
            }
        }]
    }).component('user', {
        templateUrl: "partials/user.html",
            bindings: {
            user: '='
        },
        controller: function(){
            var ctrl = this;

        }
    }).component('login', {
        templateUrl: "partials/loginPartial.html",
        controller: function () {
            var ctrl = this;
            ctrl.login = function () {
                ctrl.user.loggedIn = true;
                ctrl.user.activePage = 'home';
            }
        },
        bindings: {
            user: '='
        }
    }).component('home', {
        templateUrl: "partials/home.html",
        bindings: {
            user: '='
        },
        controller: function() {
            var ctrl = this;
            ctrl.timeOfDay = function(){
                var dt = new Date();
                var hours = dt.getHours();
                var min = dt.getMinutes();
                var message = "";
                if(hours>=1 && (hours < 12 && min <= 59)){
                    message = "Morning";
                }else if(hours>=12 && (hours < 16 && min <= 59)){
                    message = "Afternoon";
                }else if(hours>=16 && (hours < 21 && min <= 59)){
                    message = "Evening";
                }else if(hours>=21 && (hours < 24 && min <= 59)){
                    message = "Night";
                }
                return message;
            }
        }
    }).component('suggestions', {
        templateUrl: "partials/suggestions.html",
        bindings: {
            user: '='
        },
        controller: function() {
            var ctrl = this;
        }
    }).component('payment', {
        templateUrl: "partials/payment.html",
        bindings: {
            user: '=',
            trainingType: '='
        },
        controller:function() {
            var ctrl = this;
            ctrl.myDate = new Date();
            ctrl.paymentType = "other";
            ctrl.creditCard = "1234 5678 1234";

            ctrl.submitPayment = function () {
               /* return stripe.card.createToken($scope.payment.card)
                    .then(function (response) {
                        console.log('token created for card ending in ', response.card.last4);
                        var payment = angular.copy($scope.payment);
                        payment.card = void 0;
                        payment.token = response.id;
                        return console.log(payment);
                    })
                    .then(function (payment) {
                        console.log('successfully submitted payment for $', payment.amount);
                        ctrl.user.activePage = 'train';
                        *//*var now             = new Date().getTime(),
                            _10_sec_from_now = new Date(now + 10*1000);
                        cordova.plugins.notification.local.schedule({
                            text: "Payment Successfully Complete",
                            at: _10_sec_from_now,
                            led: "FF0000",
                            sound: null
                        });*//*
                    })
                    .catch(function (err) {
                        if (err.type && /^Stripe/.test(err.type)) {
                            console.log('Stripe error: ', err.message);
                        }
                        else {
                            console.log('Other error occurred, possibly with your API', err.message);
                        }
                    });*/
            };
        }
    }).component('finra', {
        templateUrl: "partials/finra.html",
        bindings: {
            user: '=',
            jurisdictions: '<'
        },
        controller: function() {
            var ctrl = this;
            ctrl.exams = exams.Exam.NASD_EX_V;
            ctrl.affiliations = affiliations.Affiliation.MK_ST_REQ_V;
            ctrl.jurisdictions = jurisdictions.Jurisdiction.FINRA;
        }
    }).component('trainingDone', {
        templateUrl: "partials/training2.html",
        bindings: {
            user: '='
        },
        controller: function() {
            var ctrl = this;
        }
    }).component('genInfo', {
        templateUrl: "partials/user.html",
        bindings: {
            user: '='
        },
        controller: function() {
            var ctrl = this;
        }
    })
    .component('training', {
        templateUrl: "partials/training.html",
        bindings: {
            user: '=',
            trainingType: '='
        },
        controller:['$mdPanel', '$cordovaCalendar', function($mdPanel, $cordovaCalendar) {

            var ctrl = this;

            ctrl.createEvent = function(){
                $cordovaCalendar.createEventInteractively();
            };

            ctrl.payForTraining = function(type){
                if(type == "appt"){
                    ctrl.user.activePage = "apptPay";
                    ctrl.trainingType = "Appointments";
                }else{
                    ctrl.user.activePage = "finraPay";
                    ctrl.trainingType = "FINRA Jurisdiction";
                }
            };

            ctrl.showDialog = function(){
                var position = $mdPanel.newPanelPosition()
                    .absolute()
                    .center();

                var config = {
                    attachTo: angular.element(document.body),
                    controller: PanelDialogCtrl,
                    controllerAs: 'ctrl',
                    disableParentScroll: false,
                    templateUrl: 'partials/trainingpanel.html',
                    hasBackdrop: true,
                    panelClass: 'demo-dialog-example',
                    position: position,
                    trapFocus: true,
                    zIndex: 150,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    focusOnOpen: true
                };
                $mdPanel.open(config);
            };

            ctrl.createEvent = function(){

            }
        }]
    }).component('trainingPanel', {
        templateUrl: "partials/trainingPanel.html",
        bindings: {
            user: '='
        },
        controller:  function() {
            var ctrl = this;


        }
    }).component('jurisdiction', {
        templateUrl: "partials/jurisdictions.html",
        bindings: {
            user: '=',
            jurisdictions: '<'
        },
        controller:  function() {
            var ctrl = this;

        }
    }).component('eagle', {
        templateUrl: "partials/eagle.html",
        bindings: {
            user: '=',
            jurisdictions: '<'
        },
        controller:  function() {
            var ctrl = this;

        }
    }).component('nbValidation', {
        templateUrl: "partials/newBusinessValidation.html",
        controller: function () {
            var ctrl = this;
            ctrl.login = function () {
                ctrl.user.loggedIn = true;
            };
            ctrl.selectedPackage = '';
            ctrl.livesIn = "";
            ctrl.worksIn = "";
            ctrl.willSign = "";
            ctrl.primary = true;
            ctrl.owner= true;
            ctrl.delivery = "";
            ctrl.product = "";

            ctrl.clear = function(){
                ctrl.selectedPackage = '';
                ctrl.livesIn = "";
                ctrl.worksIn = "";
                ctrl.willSign = "";
                ctrl.primary = true;
                ctrl.owner= true;
                ctrl.delivery = "";
                ctrl.product = "";
            };

            ctrl.packages = [
                {val:"AARP Form", id:1},
                {val:"Advanced Market Network", id:1},
                {val:"Annuity", id:1},
                {val:"Life", id:1},
                {val:"Long Term Care", id:1},
                {val:"MainStay", id:1},
                {val:"NYLSEC", id:1},
                {val:"Worksite", id:1}
            ];

            ctrl.products = [
                {val:"New York Life Flexible Premium Fixed Annuity", type:"fixed"},
                {val:"New York Life Clear Income MVA Fixed Annuity", type:"fixed"},
                {val:"New York Life Secure Term Choice Fixed Annuity", type:"fixed"},
                {val:"New York Life Guaranteed Future Income Annuity", type:"income"},
                {val:"New York Life Lifetime Mutual Income Annuity", type:"income"},
                {val:"New York Life Premium Variable Annuity II", type:"variable"},
                {val:"New York Life Complete Access Variable Annuity II", type:"variable"}
            ];
        },
        bindings: {
            user: '=',
            activePage:"="
        }
    })/*.config(function (stripeProvider) {
        stripeProvider.setPublishableKey('pk_test_rs1KE3nVD09doRhJ2mBtxFqX');
    })*/.
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/', {
                    template: '<app></app>'
                })
        }
    ]).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return (monthIndex + 1) + '/' + year;

        };
    }).filter('stateFilter', function() {

        // In the return function, we must pass in a single parameter which will be the data we will work on.
        // We have the ability to support multiple other parameters that can be passed into the filter optionally
        return function(input, optional1, optional2) {

            var states = statesJSON;
            var output = states[input];

            // Do filter work here

            return output;

        }

    })
    .filter('noExpiration', function() {
        return function(formattedDate, dateStr) {
            var returnVal = formattedDate,
                evalDate = new Date(dateStr);
            if (evalDate.getFullYear() == 9999){
                returnVal = 'None'
            }
            return returnVal
        }
    })
    .filter('seriesFilter', function() {
        return function(srsCd) {

            var exams = examList;
            var output = exams[srsCd];

            // Do filter work here

            return output;
        }
    });


function PanelDialogCtrl(mdPanelRef, $cordovaCalendar) {
    this._mdPanelRef = mdPanelRef;
    this._cordovaCalendar = $cordovaCalendar;
}

PanelDialogCtrl.prototype.closeDialog = function() {
    var panelRef = this._mdPanelRef;

    panelRef && panelRef.close().then(function() {
        angular.element(document.querySelector('.demo-dialog-open-button')).focus();
        panelRef.destroy();
    });
};


PanelDialogCtrl.prototype.createEvent = function() {
    var cordovaCalendar = this._cordovaCalendar;
        var options = {
           title:"NYL18013 - Variable Annuity Product Training"
        };
        cordovaCalendar.createEventInteractively(options);
        cordovaCalendar.destroy();
};


function loadAllStates() {
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

    return allStates.split(/, +/g).map( function (state) {
        return {
            val: state.toLowerCase(),
            display: state
        };
    });
}



function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(object) {
        return (object.val.indexOf(lowercaseQuery) === 0);
    };

}




var affiliations = {
    "Affiliation": {
    "MK_ST_REQ_V": [
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "AK",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "79150",
            "ST_REQ_LIC_ISS_DT": "2009-06-23T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "AR",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "230",
            "ST_REQ_LIC_ISS_DT": "2008-04-22T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "CA",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "0496515",
            "ST_REQ_LIC_ISS_DT": "2008-05-14T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "CO",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "000431NPI",
            "ST_REQ_LIC_ISS_DT": "2008-04-09T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "KS",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "235330",
            "ST_REQ_LIC_ISS_DT": "2008-04-22T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "KY",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "DOI393156",
            "ST_REQ_LIC_ISS_DT": "2009-03-24T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "LA",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "175029",
            "ST_REQ_LIC_ISS_DT": "2008-07-16T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "ME",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "PRN8161",
            "ST_REQ_LIC_ISS_DT": "2009-03-24T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "MI",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "021304704",
            "ST_REQ_LIC_ISS_DT": "2008-08-09T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "MO",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "324307",
            "ST_REQ_LIC_ISS_DT": "2008-05-09T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "MT",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "2014-12-03T00:00:00-05:00",
            "ST_REQ_LIC_ID": "714287",
            "ST_REQ_LIC_ISS_DT": "2009-06-12T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": "C",
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "Home Office submitted a cancellation notice to the Dept. of Insurance",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "MT",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "100128054",
            "ST_REQ_LIC_ISS_DT": "2014-12-04T00:00:00-05:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "NM",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "2017-04-30T00:00:00-04:00",
            "ST_REQ_LIC_ID": "178070",
            "ST_REQ_LIC_ISS_DT": "2008-06-11T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_DT": "2016-04-05T00:00:00-04:00",
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "NV",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "2018-10-01T00:00:00-04:00",
            "ST_REQ_LIC_ID": "503820",
            "ST_REQ_LIC_ISS_DT": "2008-07-15T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_DT": "2015-09-11T00:00:00-04:00",
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "OH",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "57165",
            "ST_REQ_LIC_ISS_DT": "2008-04-14T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "OK",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "916161",
            "ST_REQ_LIC_ISS_DT": "2008-06-06T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "OR",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "206738",
            "ST_REQ_LIC_ISS_DT": "2008-04-15T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        },
        {
            "MK_ID_NO": "0128109",
            "ST_CD": "UT",
            "ST_REQ_CD": "A",
            "ST_REQ_LIC_XDT": "9999-12-31T00:00:00-05:00",
            "ST_REQ_LIC_ID": "279977",
            "ST_REQ_LIC_ISS_DT": "2008-06-06T00:00:00-04:00",
            "ST_REQ_LIC_STS_CD": { "-xml:space": "preserve" },
            "ST_REQ_LIC_RNWL_CD": { "-xml:space": "preserve" },
            "CDW_ROW_PRCS_DT": "2016-10-27T00:54:09-04:00",
            "CDW_ROW_CREA_DT": "2016-10-27T00:54:09-04:00",
            "ST_REQ_DN": "State Affliation",
            "ST_REQ_LIC_STS_DN": "No Current Requirement on File",
            "ST_REQ_LIC_RNWL_DN": "No Renewal on File"
        }
    ]
}
}

var statesJSON = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};


var jurisdictions = {
    "Jurisdiction": {
        "FINRA": [
            {
                "MK_RSDY_CD": "N",
                "ST_CNTY_CD": "AL",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2016-06-10T00:00:00-04:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "AL",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-03-11T00:00:00-04:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "AR",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-11-07T00:00:00-05:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "CA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2006-11-03T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "CO",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-10-31T00:00:00-04:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "CT",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-11-07T00:00:00-05:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "DC",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-01-16T00:00:00-05:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "R",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "FL",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2003-01-17T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "GA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-03-13T00:00:00-04:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2014-11-14T00:00:00-05:00",
                "ST_CNTY_CD": "HI",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-05-04T00:00:00-04:00",
                "LICENSE_XDT": "2015-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "IA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-01-11T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "IL",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-11-07T00:00:00-05:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "IN",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-11-02T00:00:00-04:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "KS",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-01-18T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "LA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-03-03T00:00:00-05:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "MA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2015-03-04T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "MA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-11-13T00:00:00-05:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "MD",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-08-10T00:00:00-04:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "MI",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2010-08-25T00:00:00-04:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "ST_CNTY_CD": "MI",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-11-17T00:00:00-05:00",
                "LICENSE_XDT": "2010-06-16T00:00:00-04:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "MN",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-02-06T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "MO",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-01-03T00:00:00-05:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "MT",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2014-12-17T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2012-11-08T00:00:00-05:00",
                "ST_CNTY_CD": "MT",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-05-04T00:00:00-04:00",
                "LICENSE_XDT": "2013-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "NC",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-06-14T00:00:00-04:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "ND",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-05-07T00:00:00-04:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "NH",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2010-03-10T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "NJ",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2010-03-22T00:00:00-04:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2008-11-11T00:00:00-05:00",
                "ST_CNTY_CD": "NJ",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-01-19T00:00:00-05:00",
                "LICENSE_XDT": "2009-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "NM",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-02-09T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "NV",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-04-15T00:00:00-04:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "NY",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-11-07T00:00:00-05:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "OH",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2005-08-22T00:00:00-04:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "OR",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2006-12-05T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "PA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-01-03T00:00:00-05:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "RI",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-01-25T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "SC",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-11-07T00:00:00-05:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "SD",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2014-03-05T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2012-11-08T00:00:00-05:00",
                "ST_CNTY_CD": "SD",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-03-05T00:00:00-05:00",
                "LICENSE_XDT": "2013-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2011-11-22T00:00:00-05:00",
                "ST_CNTY_CD": "TN",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-01-08T00:00:00-05:00",
                "LICENSE_XDT": "2012-05-15T00:00:00-04:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "UT",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-02-29T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "VA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-08-12T00:00:00-04:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "VT",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-03-07T00:00:00-05:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2015-11-17T00:00:00-05:00",
                "ST_CNTY_CD": "WA",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-03-22T00:00:00-04:00",
                "LICENSE_XDT": "2016-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "WI",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2007-05-23T00:00:00-04:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DT": "2013-11-01T00:00:00-04:00",
                "ST_CNTY_CD": "WV",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2008-03-05T00:00:00-05:00",
                "LICENSE_XDT": "2014-12-31T00:00:00-05:00"
            },
            {
                "MK_RSDY_CD": "N",
                "LICENSE_RNW_DTLICENSE_RNW_DTLICENSE_RNW_DTLICENSE_RNW_DTLICENSE_RNW_DT": "2012-11-08T00:00:00-05:00",
                "ST_CNTY_CD": "WY",
                "LICENSE_ID": "0000317365",
                "LICENSE_ISS_DT": "2009-05-01T00:00:00-04:00",
                "LICENSE_XDT": "2013-12-31T00:00:00-05:00"
            }
        ]
    }
};

var exams = {
    "Exam": {
        "NASD_EX_V": [
            {
                "NASD_SRS_TP_CD": "AG",
                "MK_ID_NO": "0128109",
                "NASD_SRS_NO": "63",
                "NASD_SRS_APRV_DT": "2006-11-03T00:00:00-05:00"
            },
            {
                "NASD_SRS_TP_CD": "GS",
                "MK_ID_NO": "0128109",
                "NASD_SRS_NO": "07",
                "NASD_SRS_APRV_DT": "2003-01-17T00:00:00-05:00"
            }
        ]
    }
};

var examList = {
    "63":"Series 63",
    "07":"Series 7",
    "06":"Series 6"
};