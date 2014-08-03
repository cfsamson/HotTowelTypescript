'use strict';
module App.Controllers
{


    export interface ISidebarCtrl
    {
        isCurrent(route): string
        navRoutes: Array<Object>
    }

    export class SidebarCtrl implements ISidebarCtrl
    {
        public static controllerId:string = 'sidebarCtrl';
        navRoutes: Array<Object>;

        //using shortcut syntax on private variables in the constructor
        constructor(private $route, private config, private routes)
        {
            this.activate();
        }

        public isCurrent(route)
        {
            if (!route.config.title || !this.$route.current || !this.$route.current.title)
            {
                return '';
            }
            var menuName = route.config.title;
            return this.$route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
        public navClick()
        {
            
        }

        private activate()
        {
            this.getNavRoutes();
        }

        private getNavRoutes()
        {
            this.navRoutes = this.routes.filter(r => r.config.settings && r.config.settings.nav)
                .sort((r1, r2) => r1.config.settings.nav - r2.config.settings.nav);
        }
    }

    // Register with angular
    app.controller(
        SidebarCtrl.controllerId,
        ['$route', 'config', 'routes', ($r, c, r) => new SidebarCtrl($r, c, r)]);
}