/// <reference path="../common/common.ts" />
'use strict';

module App.Controllers{

    export interface IAdminCtrl {
        common:App.Shared.ICommon;
        controllerId: string;
        title:string;
    }

    export class AdminCtrl implements IAdminCtrl {
        public static controllerId = 'adminCtrl';
        //#region variables
        common: App.Shared.ICommon;
        controllerId: string;
        private log: Function;
        title: string;
        //#endregion
        constructor(common: App.Shared.ICommon)
        {
            this.common = common;
            this.controllerId = AdminCtrl.controllerId;
            this.title = "Admin";
            this.log = this.common.logger.getLogFn(AdminCtrl.controllerId);
            this.activate([]);
        } 
        //#region private methods
        private activate(promises:Array<ng.IPromise<any>>):void
        {
            this.common.activateController([], AdminCtrl.controllerId)
                .then(() => { this.log('Activated Admin View'); });
        }
        //#endregion
    }

    // Register with angular
    app.controller(AdminCtrl.controllerId,
        ['common', (common) => new AdminCtrl(common)]);
    

}