import "@babel/polyfill";
import  "../node_modules/fetch/lib/fetch.js";
import  { models } from 'powerbi-client';
// import { fetchUrl } from "fetch";

console.warn("START -------------------------------------\n", window.powerbi, powerbi);

///print
const enablePrintButton = (
  powerbi, 
  defaultPageReportContainer
) => {
  console.log('enabling print button...');
  const report = powerbi.get(defaultPageReportContainer);
  const printButton = document.getElementById('printButton');
  if (printButton && report) {
    printButton.onclick = () => {
      report
        .print()
        .catch(error => { 
            console.error('PRINT ERROR', error) 
        });
    }
  }
}

if(! window.powerbi){
    console.warn('! window.powerbi')
} else {
    // const models = window['powerbi-client'].models;
    const powerbi = window.powerbi;
    // const models = powerbi.models;
    
    console.log('preparing variables...');

    const staticReportUrl = 'https://powerbi-embed-api.azurewebsites.net/api/reports/c52af8ab-0468-4165-92af-dc39858d66ad';
    const defaultPageReportContainer = document.getElementById('reportdefault');
    let defaultPageReport = undefined;

    const defaultPageName = 'ReportSection2';
    const defaultFilter = new models.AdvancedFilter({
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

    const defaultFilters = [defaultFilter];

  
    // Init
    fetch(staticReportUrl)
    .then((response) => {
        if (response.ok) {
            console.log('RESPONSE FETCHING OK');
            return response.json()
            .then((embedConfig) => {
                console.log('embedding report...');
                const defaultsEmbedConfig = { 
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
            console.error('RESPONSE FETCHING FAILED');
            return response.json()
            .then(function (error) {
                throw new Error(error);
            });
        }
    }).then(()=>{
      enablePrintButton(powerbi, defaultPageReportContainer);
    }).then(()=>{
      console.log('DONE.')
    });

    
}