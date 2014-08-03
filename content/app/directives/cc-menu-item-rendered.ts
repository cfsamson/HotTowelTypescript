/// <reference path="../app.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />

'use strict';

module App.Directives
{
    // Opens and closes the sidebar menu.
    // Usage:
    //  <div data-cc-sidebar>
    // Creates:
    //  <div data-cc-sidebar class="sidebar">

    interface ICcMenuItemRendered extends ng.IDirective
    {
    }

    interface ICcMenuItemRenderedScope extends ng.IScope
    {
        // for some reason $last is not in ts-definition
        $last:boolean;
    }

    
    class CcMenuItemRendered implements ICcMenuItemRendered
    {
        static directiveId: string = 'ccMenuItemRendered';
        restrict: string = "A";


        constructor(private $timeout:ng.ITimeoutService)
        {
        }


        link = (scope: ICcMenuItemRenderedScope, element, attrs) =>
        {
    // Makes shure the menu closes after click on menuitem when viewed on a small screen
    // <li class="nlightblue fade-selection-animation" data-ng-class="vm.isCurrent(r)"
    // data-ng-repeat = "r in vm.navRoutes" >
    // <a href = "#{{r.url}}" data-ng-bind-html = "r.config.settings.content" data-cc-menu-item-rendered >< / a >
    // app.directive('ccMenuItemRendered',['$timeout', ccMenuItemRendered]);
    // inspiration: http://stackoverflow.com/questions/15207788/calling-a-function-when-ng-repeat-has-finished
            if (scope.$last === true) {
                this.$timeout(
                    () => {
                    scope.$emit(attrs.onFinishRender);
                    var $menuItem = element.parent().parent().find('a');
                        $menuItem.click(
                            () => {
                        if ($('.sidebar-dropdown a').hasClass('dropy')) {
                            hideDropDown();
                        }});
                });
            }

            function hideDropDown() {
                var $sidebarInner = $('.sidebar-inner');
                $sidebarInner.slideUp(350);
                $('.sidebar-dropdown a').removeClass('dropy');
            }
            
        }
    }

    // register in angular app
    app.directive(CcMenuItemRendered.directiveId, ['$timeout', $timeout => new CcMenuItemRendered($timeout)]);
} 