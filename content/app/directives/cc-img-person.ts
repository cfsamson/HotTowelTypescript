'use strict';
module App.Directives
{
    //Usage:
    //<img data-cc-img-person="{{s.speaker.imageSource}}"/>
    interface ICcImgPerson extends ng.IDirective
    {
    }

    interface ICcImgPersonScope extends ng.IScope
    {
        greeting: string;
        changeGreeting: () => void;
    }

    class CcImgPerson implements ICcImgPerson
    {
        static directiveId: string = 'ccImgPerson';
        restrict: string = "A";

        constructor(private config: IConfigurations)
        {
        }

        link = (scope: ICcImgPersonScope, element, attrs) =>
        {
            var basePath = this.config.imageSettings.imageBasePath;
            var unknownImage = this.config.imageSettings.unknownPersonImageSource;

            attrs.$observe('ccImgPerson', value => {
                value = basePath + (value || unknownImage);
                attrs.$set('src', value);
            });
        }
    }

    // Register in angular app
    app.directive(CcImgPerson.directiveId, ['config', c => new CcImgPerson(c)]);
} 