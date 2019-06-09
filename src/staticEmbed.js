import "@babel/polyfill";
import  "../node_modules/fetch/lib/fetch.js";
import  { models } from 'powerbi-client';
// import { fetchUrl } from "fetch";

console.warn("hello1", window.powerbi, powerbi);

if(! window.powerbi){
    console.warn('! window.powerbi')
} else {
    // const models = window['powerbi-client'].models;
    const powerbi = window.powerbi;
    // const models = powerbi.models;
    console.warn('powerbi', powerbi, models);
    console.log('Scenario 5: Default Page and/or Filter');

    var staticReportUrl = 'https://powerbi-embed-api.azurewebsites.net/api/reports/c52af8ab-0468-4165-92af-dc39858d66ad';
    var defaultPageReportContainer = document.getElementById('reportdefault');
    var defaultPageReport;
    var defaultPageName = 'ReportSection2';
    var defaultFilter = new models.AdvancedFilter({
        table: "Store",
        column: "Name"
    }, "Or", [
        {
            operator: "Contains",
            value: "Wash"
        },
        {
            operator: "Contains",
            value: "Park"
        }
        ]);

    var defaultFilters = [defaultFilter];

    // Init
    fetch(staticReportUrl)
    .then(function (response) {
        if (response.ok) {
            return response.json()
            .then(function (embedConfig) {
                var defaultsEmbedConfig = { 
                    ...embedConfig,
                    pageName: defaultPageName,
                    filter: defaultFilters,
                    settings: {
                        filterPaneEnabled: true,
                        navContentPaneEnabled: true
                    }
                };

                defaultPageReport = powerbi.embed(defaultPageReportContainer, defaultsEmbedConfig);
                return defaultPageReport;
            });
        }
        else {
            return response.json()
            .then(function (error) {
                throw new Error(error);
            });
        }
    });
}
console.warn("buy");