'use strict';
module App.Shared {

    export interface ICommon {
        throttles: Object;
        activateController(promises: Array<ng.IPromise<any>>, controllerId: string)
        $broadcast(event: string, data: any);
        createSearchThrottle(viewmodel: any, list: string, filteredList: string, filter: string, delay: number): Function;
        debouncedThrottle(key: string, callback: Function, delay: number, immediate: boolean): void;
        isNumber(val: any): boolean;
        textContains(text: string, searchText: string): boolean
        $q: ng.IQService;
        $rootScope: ng.IRootScopeService;
        $timeout: ng.ITimeoutService;
        commonConfig: any;
        logger:ILogger;
    }

    export class Common implements ICommon {
        public static serviceId: string = 'common';

        //#region variables
        commonConfig: ICommonConfig;
        logger: ILogger;
        throttles : Object;
        $rootScope: ng.IRootScopeService;
        $timeout: ng.ITimeoutService;
        $q: ng.IQService;
       
        //#endregion

        constructor($q, $rootScope, $timeout, commonConfig, logger) {
            this.commonConfig = commonConfig;
            this.logger = logger;
            this.throttles = {};
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.$q = $q;
        }

        //#region public methods
        activateController(promises: Array<ng.IPromise<any>>, controllerId: string) {
            return this.$q.all(promises).then(this.broadcastSuccessEvent(controllerId));
        }

        private broadcastSuccessEvent(controllerId)
        {
            var data = { controllerId: controllerId };
            return this.$broadcast(this.commonConfig.config.controllerActivateSuccessEvent, data);
        }

        $broadcast(eventName: string, data: any) {
            return this.$rootScope.$broadcast.apply(this.$rootScope, arguments);
        }

        public createSearchThrottle(viewmodel: any, list: string, filteredList: string, filter: string, delay: number): Function {
            // After a delay, search a viewmodel's list using 
            // a filter function, and return a filteredList.

            // custom delay or use default
            delay = +delay || 300;
            // if only vm and list parameters were passed, set others by naming convention 
            if (!filteredList) {
                // assuming list is named sessions, filteredList is filteredSessions
                filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
                // filter function is named sessionFilter
                filter = list + 'Filter'; // function in string form
            }

            // create the filtering function we will call from here
            var filterFn = () => {
                // translates to ...
                // vm.filteredSessions 
                //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
                viewmodel[filteredList] = viewmodel[list].filter
                    (
                    item => viewmodel[filter](item)
                    );
            };

            return (() => {
                // Wrapped in outer IFFE so we can use closure 
                // over filterInputTimeout which references the timeout
                var filterInputTimeout;

                // return what becomes the 'applyFilter' function in the controller
                return searchNow => {
                    if (filterInputTimeout) {
                        this.$timeout.cancel(filterInputTimeout);
                        filterInputTimeout = null;
                    }
                    if (searchNow || !delay) {
                        filterFn();
                    } else {
                        filterInputTimeout = this.$timeout(filterFn, delay);
                    }
                };
            })();
        }

        public debouncedThrottle(key: string, callback: Function, delay: number, immediate: boolean): void {
            // Perform some action (callback) after a delay. 
            // Track the callback by key, so if the same callback 
            // is issued again, restart the delay.

            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (this.throttles[key]) {
                this.$timeout.cancel(this.throttles[key]);
                this.throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                this.throttles[key] = this.$timeout(callback, delay);
            }
        }

        isNumber(val: any): boolean {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        }

        textContains(text: string, searchText: string): boolean {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }
        //#endregion


    }
        
    // Creates "common" service
    commonModule.factory(Common.serviceId, [
        '$q', '$rootScope', '$timeout', 'commonConfig', 'logger',
        ($q, $rS, $to, cC, l) => new Common($q, $rS, $to, cC, l)
    ]);
        

}