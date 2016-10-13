
angular
    .module('licensing', ['ngMaterial', 'ngMessages'])
    .controller('appCtrl', function($scope) {
        $scope.user = {
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
            userId:'',
            password:''
        };
    };


