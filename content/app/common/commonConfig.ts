/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
'use strict';

module App.Shared
{
    export interface ICommonConfig
    {
        config: ICommonConfigEvents;
        $get: any;
    }

    export interface ICommonConfigEvents
    {
        controllerActivateSuccessEvent?: any;
        spinnerToggleEvent?: any;
    }


    class CommonConfig
    {
        public static providerId: string = 'commonConfig';
        public config: ICommonConfigEvents;
        public $get;

        constructor()
        {
            this.config = {
                // These are the properties we need to set
                // controllerActivateSuccessEvent: ''
                // spinnerToggleEvent:''

            };
            this.$get = () =>
            {
                return {config: this.config};
            };
        }
    }

    commonModule.provider(CommonConfig.providerId, () => new CommonConfig());
    //#region explanation
    // THIS IS A PROVIDER THAT ALLOWS YOU TO SET CONFIGURATIONS THAT ARE RUN INN CONFIG_PHASE, BEFORE
    // THE APPLICATION LIFE-CYCLE ENTERS THE RUN PHASE AND SERVICES ARE INSTANSIATED
    // Must configure the common service and set its 
    // events via the commonConfigProvider
    // we can call just commonmodule in TypeScript since we exported that variable in commonModule
    //#endregion

    // This runs at the config phase of the application, before the "run" phase


//-----ORIGINAL FUNCTION------
//        function () {
//
//            this.config = {
//
//                // These are the properties we need to set
//                // controllerActivateSuccessEvent: '',
//                // spinnerToggleEvent: '' 
//
//            };
//
//            this.$get = function () {
//                return {
//                    config: this.config
//                };
//            };
//        });


    //#region Additional info
    // INFO: we could write cm = angular.module(..., []) then cm.factory('logger'..., cm.factory('spinner'...
    // to keep them i seperate files we write angular.module('common').factory(......) in a seperate file


    //AFTER CONFIGURATION, THEN THE SERVICES ARE RUN
    // -> common service
    // -> logger service
    // -> spinner service
    // etc
    //#endregion
}