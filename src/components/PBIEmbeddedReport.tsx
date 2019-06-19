import * as React from "react";
import { models } from "powerbi-client";

import { ConfigProps } from "../dataInterfaces";

const REPORT_ID = "reportdefault";
const staticReportUrl =
  "https://powerbi-embed-api.azurewebsites.net/api/reports/c52af8ab-0468-4165-92af-dc39858d66ad";
const defaultPageName = "ReportSection2";

export class SimpleReport extends React.Component<ConfigProps> {
  public reportRef: React.RefObject<HTMLDivElement> = React.createRef<
    HTMLDivElement
  >();
  public powerbi;
  public models;

  constructor(props: ConfigProps) {
    super(props);
    this.powerbi = window.powerbi;
    this.models = models;
  }

  public componentDidMount() {
    console.log("preparing variables...");
    const defaultFilter = new models.AdvancedFilter(
      {
        table: "Store",
        column: "Name",
      },
      "Or",
      [
        {
          operator: "Contains",
          value: "Wash",
        },
        {
          operator: "Contains",
          value: "Park",
        }
      ]
    );
    const defaultFilters = [defaultFilter];
    const defaultPageReportContainer = this.reportRef.current;
    let defaultPageReport = undefined;

    if (!defaultPageReportContainer) {
      console.warn("No report container mounted!");
    } else {
      fetch(staticReportUrl)
        .then(response => {
          if (response.ok) {
            console.log("RESPONSE FETCHING OK");
            return response.json().then(embedConfig => {
              console.log("embedding report...");
              const defaultsEmbedConfig = {
                ...embedConfig,
                pageName: defaultPageName,
                filter: defaultFilters,
                settings: {
                  filterPaneEnabled: true,
                  navContentPaneEnabled: true
                }
              };

              defaultPageReport = this.powerbi.embed(
                defaultPageReportContainer,
                defaultsEmbedConfig
              );
              return defaultPageReport;
            });
          } else {
            console.error("RESPONSE FETCHING FAILED");
            return response.json().then(function(error) {
              throw new Error(error);
            });
          }
          // }).then(()=>{
          //   enablePrintButton(powerbi, defaultPageReportContainer);
        })
        .then(() => {
          console.log("DONE.");
        });
    }
  }
  public render() {
    return <div
      ref={this.reportRef}
      id={REPORT_ID}
      style={{
        width: "100%",
        height: "700px",
      }}
    />;
  }
}

export default SimpleReport;
