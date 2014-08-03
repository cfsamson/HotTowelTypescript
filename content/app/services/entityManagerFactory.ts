/// <reference path="../../scripts/typings/breeze/breeze.d.ts" />
'use strict';

module App.Services
{


    export interface IEntityManagerFactory
    {
        newManager(): breeze.EntityManager
    }


    export class EntityManagerFactory
    {
        public static serviceId = 'entityManagerFactory';
        metadataStore: any;
        serviceName: any;
        private breeze: any;
        private config: any;

        constructor(breeze, config)
        {
            this.breeze = breeze;
            this.config = config;
            this.setNamingConventionToCamelCase();
            this.preventValidateOnAttach();
            this.metadataStore = new breeze.MetadataStore();
            this.serviceName = config.remoteServiceName;
        }

        public newManager(): breeze.EntityManager
        {
            var mgr = new breeze.EntityManager({
                serviceName: this.serviceName,
                metadataStore: this.metadataStore
            });

            return mgr;
        }

        private setNamingConventionToCamelCase(): void
        {
            // Convert server - side PascalCase to client - side camelCase property names
            breeze.NamingConvention.camelCase.setAsDefault();
        }

        private preventValidateOnAttach()
        {
            new breeze.ValidationOptions({ validateOnAttach: false }).setAsDefault();
        }
    }

    app.factory(EntityManagerFactory.serviceId,
        ['breeze', 'config',(b, c) => new EntityManagerFactory(b, c)]);
}