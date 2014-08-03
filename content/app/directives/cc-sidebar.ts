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
    interface ICcSidebar extends ng.IDirective
    {
    }

    interface ICcSidebarScope extends ng.IScope
    {}

    //need to declare angular since this is a non TypeScript global variable
    declare var angular:any;

    class CcSidebar implements ICcSidebar
    {
        static directiveId: string = 'ccSidebar';
        restrict: string = "A";

        constructor(private $window)
        {

        }

        link = (scope: ICcSidebarScope, element, attrs) =>
        {
            var $sidebarInner = element.find('.sidebar-inner');

            var $dropdownElement = element.find('.sidebar-dropdown a');
            element.addClass('sidebar');
            $dropdownElement.click(dropdown);
            var dropClass = 'dropy';

            function dropdown(e) {
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    hideAllSidebars();
                    $sidebarInner.slideDown(350);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {

                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350);
                }

            }
            function hideAllSidebars() {
                $sidebarInner.slideUp(350);
                $('.sidebar-dropdown a').removeClass(dropClass);
            }

            // renders menuitems in sidebar going from small screen to large screen
            angular.element(this.$window).on('resize', () => {
                if (this.$window.innerWidth >= 765) {
                    $sidebarInner.slideDown(350);
                }
                else {
                    $sidebarInner.slideUp(350);
                }
            });
        }
    }

//References angular app
    app.directive(CcSidebar.directiveId, ['$window',($window) => new CcSidebar($window)]);
} 