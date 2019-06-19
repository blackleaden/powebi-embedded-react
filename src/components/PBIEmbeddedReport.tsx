import * as React from "react";

import { Config, PowerBIClient } from "../dataInterfaces";

const REPORT_ID = "reportdefault";

///print

export interface ReportProps extends Config, PowerBIClient{
  onReportFetched?: (reportContainerRef: React.RefObject<any>, report: any) => void;
  reportPageName: string;
  reportURL: string;
}

export class SimpleReport extends React.Component<ReportProps> {
  public PowerBiReport: any; //TODO PBI types
  public PowerBiEmbedConfig: any; //TODO PBI types

  public reportRef: React.RefObject<HTMLDivElement> = React.createRef<
    HTMLDivElement
  >();

  constructor(props: ReportProps) {
    super(props);
  }

  public componentDidMount() {
    const { powerbi, models, reportURL, reportPageName } = this.props;

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

    const reportContainer = this.reportRef.current;
    const saveReport = (report: any) => { this.PowerBiReport = report; };
    const saveEmbedConfig = (embedConfig: any) => { this.PowerBiEmbedConfig = embedConfig }
    
    if (!reportContainer) {
      console.warn("No report container mounted!");
    } else {
      fetch(reportURL)
        .then(response => {
          if (response.ok) {
            return response
              .json()
              .then(
                embedConfig => {
                  const defaultsEmbedConfig = {
                    ...embedConfig,
                    pageName: reportPageName,
                    filter: defaultFilters,
                    settings: {
                      filterPaneEnabled: true,
                      navContentPaneEnabled: true,
                    }
                  };
                  saveEmbedConfig(defaultsEmbedConfig);

                  return powerbi.embed(
                    reportContainer,
                    defaultsEmbedConfig,
                  );
            });
          } else {
            console.error("RESPONSE FETCHING FAILED");
            return response.json().then((error) => {
              throw new Error(error);
            });
          }
        }).then(
          (report) => {
            saveReport(report);
            if (this.props.onReportFetched) {
              this.props.onReportFetched( this.reportRef, report );
            }
          }
        );
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
