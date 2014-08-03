'use strict';
module App.Controllers
{

    export interface INews
    {
        title: string;
        description: string;
    }

    export class DashboardCtrl
    {
        public static controllerId: string = 'dashboardCtrl';
//#region Variables
        controllerId = DashboardCtrl.controllerId;
        common: App.Shared.ICommon;
        datacontext: App.Services.IDatacontext;
        log: any;
        messageCount: number;
        news: INews;
        people: Array<any> = [];

//#endregion
        constructor(common, datacontext)
        {
            this.common = common;
            this.datacontext = datacontext;
            this.log = common.logger.getLogFn();
            this.news = this.getNews();

            // Queue all promises and wait for them to finish before loading the view
            this.activate([this.getMessageCount(), this.getPeople()]);
        }

        // TODO: is there a more elegant way of activating the controller - base class?
        activate(promises: Array<ng.IPromise<any>>)
        {
            this.common.activateController(promises, this.controllerId)
                .then(() => { this.log('Activated Dashboard View'); });
        }

//#region Public Methods
        getNews(): INews
        {
            return {
                title: "Hot Towel Typescript",
                description: 'Hot Towel Typescript is a SPA template using Angular, Breeze and Typescript. '
                    + 'This is a conversion of John Papas HotTowel.Angular.Breeze package'
            };
        }

        getMessageCount()
        {
            return this.datacontext.getMessageCount().then(data =>
            {
                return this.messageCount = data;
            });
        }

        getPeople()
        {
            return this.datacontext.getPeople().then(data =>
            {
                return this.people = data;
            });
        }

//#endregion
    }

    // register controller with angular
    app.controller(DashboardCtrl.controllerId, ['common', 'datacontext',
        (c, dc) => new App.Controllers.DashboardCtrl(c, dc)
    ]);
}