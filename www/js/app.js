angular.module('credHub', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngCordova'])
    .component('app', {
        templateUrl: "partials/app.html",
        controller: function () {
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
        }
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
            user: '='
        },
        controller: function() {
            var ctrl = this;
            ctrl.myDate = "";
            ctrl.submitPayment = function(){
                ctrl.user.activePage = 'train';
                var now             = new Date().getTime(),
                    _10_sec_from_now = new Date(now + 10*1000);

                cordova.plugins.notification.local.schedule({
                    text: "Payment Successfully Complete",
                    at: _10_sec_from_now,
                    led: "FF0000",
                    sound: null
                });
            };
        }
    }).component('finra', {
        templateUrl: "partials/finra.html",
        bindings: {
            user: '='
        },
        controller: function() {
            var ctrl = this;
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
            trainingType: '<'
        },
        controller:['$mdPanel', '$cordovaCalendar', function($mdPanel, $cordovaCalendar) {

            var ctrl = this;

            ctrl.createEvent = function(){
                $cordovaCalendar.createEventInteractively();
            };

            ctrl.paymentType = "first";
            ctrl.ccNum = "";

            ctrl.payForTraining = function(type){
                if(type == "appt"){
                    ctrl.user.activePage = "apptPay";
                }else{
                    ctrl.user.activePage = "finraPay";
                }
            }

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
    }).
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/', {
                    template: '<app></app>'
                })
        }
    ]);


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


