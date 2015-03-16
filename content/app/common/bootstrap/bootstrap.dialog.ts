'use strict';
module App.Shared
{
    interface IBootstrapDialog
    {
        deleteDialog(itemName:string)
        confirmationDialog(title: string, msg: string, okText?: string, cancelText?: string)
    }

    interface IModalOptions
    {
        title: string;
        message: string;
        okText: string;
        cancelText: string;
    }

    interface IModalScope extends ng.IScope
    {
        title: string;
        message: string;
        okText: string;
        cancelText: string;
        ok: ()=>void
        cancel:()=>void;
    }

    class BootstrapDialog implements IBootstrapDialog
    {
        public static serviceId: string = 'bootstrap.dialog';

        private $modal: any;
        private $templateCache: ng.ITemplateCacheService;

        constructor($modal: any, $templateCache: ng.ITemplateCacheService)
        {
            this.$modal = $modal;
            this.$templateCache = $templateCache;
            this.setTemplate();
        }

        public deleteDialog(itemName:string)
        {
            var title = 'Confirm Delete';
            itemName = itemName || 'item';
            var msg = 'Delete ' + itemName + '?';

            return this.confirmationDialog(title, msg);
        }

        public confirmationDialog(title: string, msg: string, okText?: string, cancelText?: string)
        {
            var modalOptions = {
                templateUrl: 'modalDialog.tpl.html',
                controller: [
                    '$scope', '$modalInstance', 'options',
                    ($s, $mI, o) => new ModalCtrl($s, $mI, o)],
        
                keyboard: true,
                resolve: {
                    options: () => {
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
        }

        private setTemplate(): void
        {
            this.$templateCache.put('modalDialog.tpl.html',
                '<div>' +
                '    <div class="modal-header">' +
                '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-ng-click="cancel()">&times;</button>' +
                '        <h3>{{title}}</h3>' +
                '    </div>' +
                '    <div class="modal-body">' +
                '        <p>{{message}}</p>' +
                '    </div>' +
                '    <div class="modal-footer">' +
                '        <button class="btn btn-primary" data-ng-click="ok()">{{okText}}</button>' +
                '        <button class="btn btn-info" data-ng-click="cancel()">{{cancelText}}</button>' +
                '    </div>' +
                '</div>');
        }

    }

    class ModalCtrl
    {
        constructor($scope:IModalScope, $modalInstance:any, options:IModalOptions)
        {
            $scope.title = options.title || 'Title';
            $scope.message = options.message || '';
            $scope.okText = options.okText || 'OK';
            $scope.cancelText = options.cancelText || 'Cancel';
            $scope.ok = () => { $modalInstance.close('ok'); };
            $scope.cancel = () => { $modalInstance.dismiss('cancel'); };
        }
    }
  
    // Register bootstrap.dialog service
    commonBootstrapModule.factory(BootstrapDialog.serviceId, ['$modal', '$templateCache', (m, tc) => new BootstrapDialog(m, tc)])
}
