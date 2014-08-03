'use strict';
module App.Directives
{    
    // Usage:
    // <span data-cc-scroll-to-top></span>
    // Creates:
    // <span data-cc-scroll-to-top="" class="totop">
    //      <a href="#"><i class="fa fa-chevron-up"></i></a>
    // </span>
    interface ICcScrollToTop extends ng.IDirective
    {
    }

    interface ICcScrollToTopScope extends ng.IScope
    {

    }

    class CcScrollToTop implements ICcScrollToTop
    {
        static directiveId: string = 'ccScrollToTop';
        restrict: string = "A";
        template = '<a href="#"><i class="fa fa-chevron-up"></i></a>';

        constructor(private $window: ng.IWindowService)
        {
        }

        link = (scope: ICcScrollToTopScope, element, attrs) =>
        {
            var $win = $(this.$window);
            element.addClass('totop');
            $win.scroll(toggleIcon);

            element.find('a').click(function (e) {
                e.preventDefault();
                // Learning Point: $anchorScroll works, but no animation
                //$anchorScroll();
                $('body').animate({ scrollTop: 0 }, 500);
            });

            function toggleIcon() {
                $win.scrollTop() > 300 ? element.slideDown() : element.slideUp();
            }
        }
    }

    // Register in angular app
    app.directive(CcScrollToTop.directiveId, ['$window', $window => new CcScrollToTop($window)]);
} 