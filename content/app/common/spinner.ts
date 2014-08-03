/// <reference path="common.ts" />
/// <reference path="commonconfig.ts" />
'use strict';
module App.Shared
{

    export interface ISpinner {
        spinnerHide(): void
        spinnerShow(): void
    }

    export class Spinner implements ISpinner{
        public static serviceId = 'spinner';
        common: ICommon;
        commonConfig: ICommonConfig;

        constructor(common: ICommon, commonConfig:ICommonConfig)
        {
            this.common = common;
            this.commonConfig = commonConfig;
        }

        spinnerHide():void
        {
            this.spinnerToggle(false);
        }

        spinnerShow():void
        {
            this.spinnerToggle(true);
        }

        private spinnerToggle(show:boolean):void
        {
            this.common.$broadcast(this.commonConfig.config.spinnerToggleEvent, { show: show });
        }


    }

    // Must configure the common service and set its 
    // events via the commonConfigProvider

    commonModule.factory(Spinner.serviceId,
        ['common', 'commonConfig', (c, cC) => new Spinner(c, cC)]);


}