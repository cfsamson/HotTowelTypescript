/// <reference path="../app.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />

'use strict';

module App.Directives
{
    // Usage:
    // <a data-cc-widget-close></a>
    // Creates:
    // <a data-cc-widget-close="" href="#" class="wclose">
    //     <i class="fa fa-remove"></i>
    // </a>

    interface ICcWidgetClose extends ng.IDirective
    {
    }

    interface ICcWidgetCloseScope extends ng.IScope
    {
       
    }

    class CcWidgetClose implements ICcWidgetClose
    {
        static directiveId: string = 'ccWidgetClose';
        restrict: string = "A";
        template = '<i class="fa fa-remove"></i>';

        constructor()
        {
        }

        link = (scope: ICcWidgetCloseScope, element, attrs) =>
        {
            attrs.$set('href', '#');
            attrs.$set('wclose');
            element.click(close);

            function close(e) {
                e.preventDefault();
                element.parent().parent().parent().hide(100);
            }
        }
    }

    // Register in angular app
    app.directive(CcWidgetClose.directiveId, [() => new CcWidgetClose()]);
} 