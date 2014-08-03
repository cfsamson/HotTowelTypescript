/// <reference path="../app.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
'use strict';
module App.Directives
{
    // Usage:
    // <a data-cc-widget-minimize></a>
    // Creates:
    // <a data-cc-widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
    interface ICcWidgetMinimize extends ng.IDirective
    {
    }

    interface ICcWidgetMinimizeScope extends ng.IScope
    {
        greeting: string;
        changeGreeting: () => void;
    }

    class CcWidgetMinimize implements ICcWidgetMinimize
    {
        static directiveId: string = 'ccWidgetMinimize';
        restrict: string = "A";
        template = '<i class="fa fa-chevron-up"></i>';

        constructor()
        {
        }

        link = (scope: ICcWidgetMinimizeScope, element, attrs) =>
        {
            //$('body').on('click', '.widget .wminimize', minimize);
            attrs.$set('href', '#');
            attrs.$set('wminimize');
            element.click(minimize);

            function minimize(e) {
                e.preventDefault();
                var $wcontent = element.parent().parent().next('.widget-content');
                var iElement = element.children('i');
                if ($wcontent.is(':visible')) {
                    iElement.removeClass('fa fa-chevron-up');
                    iElement.addClass('fa fa-chevron-down');
                } else {
                    iElement.removeClass('fa fa-chevron-down');
                    iElement.addClass('fa fa-chevron-up');
                }
                $wcontent.toggle(500);
            }
        }
    }

    // Register in angular app
    app.directive(CcWidgetMinimize.directiveId, [() => new CcWidgetMinimize()]);
} 