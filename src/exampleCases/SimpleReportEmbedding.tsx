import React from "react";
import { ExamplesPage } from "../components/ExampleLayout";
import { Config, PowerBIClient } from "../dataInterfaces";

import PBIEmbeddedReport from "../components/PBIEmbeddedReport";
import config from "../config";
import { Button, ButtonGroup } from "../components/buttons";

const defaultUrl =
  "https://powerbi-embed-api.azurewebsites.net/api/reports/c52af8ab-0468-4165-92af-dc39858d66ad";
const defaultPageName = "ReportSection2";

export interface State {
  reportContainerRef?: React.RefObject<any>;
  report?: any;
}

export class SimpleReportEmbedding extends React.Component<PowerBIClient, State> {
  public state: State = {};

  public constructor(props: PowerBIClient){
    super(props);
  }

  public setReportContainerRef = (reportContainerRef: React.RefObject<any>, report: any) => {
    console.log('report', report, this.props.powerbi);
    this.setState({ reportContainerRef, report });
  }

  public printReport = () => {
      const { report } = this.state;
      if (report) {
        report.print().catch(
          error => { console.error('print error', error); }
        );
      }
  }

  public reloadReport = () => {
    const { report } = this.state;
    if (report) {
      report.reload().catch(
        error => { console.error('reload error', error); }
      );
    }
  }

  public refreshReport = () => {
    const { report } = this.state;
    if (report) {
      report.refresh().catch(
        error => { console.error('refresh error', error); }
      );
    }
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    const { powerbi, models } = this.props;

    const examples = [{
      title: "Simple Report",
      children: () => <PBIEmbeddedReport
        onReportFetched={this.setReportContainerRef}
        powerbi={powerbi}
        models={models}
        reportPageName={defaultPageName}
        reportURL={defaultUrl}
        { ...config }
      />,
    },
    {
      title: "Basic Interactions",
      children: () => (<ButtonGroup>
        <Button
          children="Print report above"
          onClick={this.printReport}
        />
        <Button
          children="Reload"
          onClick={this.reloadReport}
        />
        <Button
          children="Refresh"
          onClick={this.refreshReport}
        />
      </ButtonGroup>),
    },
    {
      title: "Fullscreen",
      children: () => (<ButtonGroup>
        <Button
          children="Turn on fullscreen"
          onClick={() => this.state.report && this.state.report.fullscreen() }
        />
      </ButtonGroup>),
    }];

    return <ExamplesPage
      examples={examples}
      title="Simple Report"
    />;
  }
};

export default SimpleReportEmbedding;
