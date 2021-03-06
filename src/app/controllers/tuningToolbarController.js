function TuningToolbarController($scope, $location, $log, $mdDialog, $mdMedia, tuningToolbarService, $state, $stateParams) {

    $scope.show_toolbar = false;

    $scope.$on('toolbar:updated', function (event, data) {
        $scope.show_toolbar = data;
    });

    $scope.open_menu = function () {
        tuningToolbarService.toolbar.hide();
        tuningToolbarService.menu.show('left');
    };

    $scope.showShareURL = function (ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/app/templates/tuning/share-url.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen
        });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.share_url = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        // alert('asfa');
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(false)
                .title('Share URL')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    $scope.openExportURL = function () {
        $state.go('tuning-export_url', $stateParams);
    };
};