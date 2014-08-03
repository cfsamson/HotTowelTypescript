/// <reference path="../app.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />

'use strict';
module App.Directives
{
    //Usage:
    //<div data-cc-widget-header title="vm.map.title"></div>
    interface ICcWidgetHeader extends ng.IDirective
    {
    }

    interface ICcWidgetHeaderScope extends ng.IScope
    {
        title: any;
        subtitle: any;
        rightText: any;
        allowCollapse:any;
    }

    class CcWidgetHeader implements ICcWidgetHeader
    {
        static directiveId: string = 'ccWidgetHeader';
        restrict: string = "A";
        templateUrl = '/app/layout/widgetheader.html';
        scope = {
            'title': '@',
            'subtitle': '@',
            'rightText': '@',
            'allowCollapse': '@'
        }

        constructor()
        {
        }

// controller = ()=>{};

        link = (scope: ICcWidgetHeaderScope, element, attrs) =>
        {
            attrs.$set('class', 'widget-head');
        }
    }

//References angular app
    app.directive(CcWidgetHeader.directiveId, [() => new CcWidgetHeader()]);
} 