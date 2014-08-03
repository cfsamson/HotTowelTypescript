'use strict';
var App;
(function (App) {
    (function (Shared) {
        var BootstrapDialog = (function () {
            function BootstrapDialog($modal, $templateCache) {
                this.$modal = $modal;
                this.$templateCache = $templateCache;
                this.setTemplate();
            }
            BootstrapDialog.prototype.deleteDialog = function (itemName) {
                var title = 'Confirm Delete';
                itemName = itemName || 'item';
                var msg = 'Delete ' + itemName + '?';

                return this.confirmationDialog(title, msg);
            };

            BootstrapDialog.prototype.confirmationDialog = function (title, msg, okText, cancelText) {
                var modalOptions = {
                    templateUrl: 'modalDialog.tpl.html',
                    controller: [
                        '$scope', '$modalInstance', 'options',
                        function ($s, $mI, o) {
                            return new ModalCtrl($s, $mI, o);
                        }],
                    keyboard: true,
                    resolve: {
                        options: function () {
                            return {
                                title: title,
                                message: msg,
                                okText: okText,
                                cancelText: cancelText
                            };
                        }
                    }
                };

                return this.$modal.open(modalOptions).result;
            };

            BootstrapDialog.prototype.setTemplate = function () {
                this.$templateCache.put('modalDialog.tpl.html', '<div>' + '    <div class="modal-header">' + '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' + '        <h3>{{title}}</h3>' + '    </div>' + '    <div class="modal-body">' + '        <p>{{message}}</p>' + '    </div>' + '    <div class="modal-footer">' + '        <button class="btn btn-primary" data-ng-click="ok()">{{okText}}</button>' + '        <button class="btn btn-info" data-ng-click="cancel()">{{cancelText}}</button>' + '    </div>' + '</div>');
            };
            BootstrapDialog.serviceId = 'common.bootstrap';
            return BootstrapDialog;
        })();

        var ModalCtrl = (function () {
            function ModalCtrl($scope, $modalInstance, options) {
                $scope.title = options.title || 'Title';
                $scope.message = options.message || '';
                $scope.okText = options.okText || 'OK';
                $scope.cancelText = options.cancelText || 'Cancel';
                $scope.ok = function () {
                    $modalInstance.close('ok');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
            return ModalCtrl;
        })();

        //Register with angular
        var bootstrapModule = angular.module(BootstrapDialog.serviceId, ['ui.bootstrap']);
    })(App.Shared || (App.Shared = {}));
    var Shared = App.Shared;
})(App || (App = {}));
//# sourceMappingURL=bootstrap.dialog.js.map
