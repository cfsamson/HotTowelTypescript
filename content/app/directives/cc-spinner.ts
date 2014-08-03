/// <reference path="../app.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />

'use strict';
module App.Directives
{
    // Description:
    //  Creates a new Spinner and sets its options
    // Usage:
    //  <div data-cc-spinner="vm.spinnerOptions"></div>
    interface ICcSpinner extends ng.IDirective
    {
    }

    interface ICcSpinnerScope extends ng.IScope
    {
        spinner:any;
    }

    interface ISpinnerWindowService extends ng.IWindowService
    {
        Spinner: any;
    }

    class CcSpinner implements ICcSpinner
    {
        static directiveId: string = 'ccSpinner';
        restrict: string = "A";

        constructor(private $window: ISpinnerWindowService)
        {
        }

        link = (scope: ICcSpinnerScope, element, attrs) =>
        {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner,  (options)=> {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new this.$window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
            
        }
    }

    // Register in angular app
    app.directive(CcSpinner.directiveId, ['$window', $window => new CcSpinner($window)]);
} 