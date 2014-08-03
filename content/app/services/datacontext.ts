/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module App.Services {

    export interface IDatacontext {
        getMessageCount(): ng.IPromise<number>;
        getPeople(): ng.IPromise<any>;
    }

    export class Datacontext {
        public static serviceId:string = 'datacontext';
        private common: any;
        private $q: ng.IQService;


        constructor(common)
        {
            this.common = common;
            this.$q = common.$q;
        }

        public getMessageCount(): ng.IPromise<number>
        {
            return this.$q.when(72);
        }

        public getPeople():ng.IPromise<any>
        {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return this.$q.when(people);
        }
    }

    // Register with angular
    app.factory(Datacontext.serviceId, ['common', (common) => new Datacontext(common)]);

}
