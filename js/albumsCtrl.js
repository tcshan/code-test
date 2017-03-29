var app = angular.module('musicApp');

app.controller('albumsCtrl', function ($scope, $http) {
    $scope.items;
    $scope.term ;
    $scope.isDefaultSearch=true;
    $scope.isLoadingData=false;
    $scope.selectedAlbum;

    DEFAULT_SEARCH= "the beatles";

    /* Begin: Service to load albums base on search term*/
    function getService(term) {
        $scope.closeAlbumInfo();
        $scope.isLoadingData=true;
        $scope.items = null;
        $http({
            method: 'GET',
            url: '/api?term=' + term + '&entity=album&limit=20'
        }).then(function successCallback(response) {
            if (response && response.data.results && response.data.resultCount > 0) {
                $scope.items = response.data.results;
            }
            $scope.isLoadingData=false;
        }, function errorCallback(response) {
            console.log("Error loading images");
            $scope.isLoadingData=false;
        });
    }

    function cleanTerm(term) {
        return escape(term).substring(0, 50);
    }
    /* End: Service to load albums base on search term*/

    $scope.onInputKeyPress = function(event) {  
        var event = event || window.event;  
        if (event.keyCode == 13)  {
            $scope.onSearch();
        } 
    }  

    $scope.onSearch=function(){
        $scope.isDefaultSearch=false;
        if(!$scope.term || !$scope.term.trim()) return;
        getService(cleanTerm($scope.term));
    }

    /*Begin: toggle album info panel*/
    $scope.showAlbumInfo = function(item){
        $scope.selectedAlbum=item;
        $(".album-info").animate({right:'0'});
    }
    $scope.closeAlbumInfo = function(){
        $(".album-info").animate({right:'-302px'});
    }
    /*End: toggle album info panel*/

    //Load some albums by default
    getService(DEFAULT_SEARCH);
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // use the http service to hit the url /api?term=the+beatles&entity=album&limit=12
    // the result will be a JSON object with all the relevant information in it.


});
