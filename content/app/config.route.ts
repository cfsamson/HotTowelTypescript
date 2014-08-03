/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
'use strict';
module App
{
    export interface IAppRoute
    {
        url: string;
        config: ng.route.IRoute;
    }


    export class RouteConfigurator
    {
        constructor($routeProvider: ng.route.IRouteProvider, routes)
        {
            routes.forEach(r =>
            {
                $routeProvider.when(r.url, r.config);
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
        
    }

    // Define the routes - since this goes right to an app.constant, no use for a class
    // Could make it a static property of the RouteConfigurator class
    function getRoutes(): IAppRoute[]
    {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
            
        ];
    }

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config([
        '$routeProvider', 'routes',
        ($routeProvider, routes) =>
            new RouteConfigurator($routeProvider, routes)
    ]);

}