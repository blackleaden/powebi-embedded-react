import * as React from "react";
// import * as powerbiClient from "powerbi-client";
import { models } from "powerbi-client";
import config from "./config";

import { ExamplesSwitcher, ExamplesPage } from "./components/ExampleLayout";
import ConfigTable from "./components/ConfigTable";

import "./components/ExampleLayout/Example.less";

import { SimpleReportEmbedding } from "./exampleCases/";

const powerbi = window.powerbi; //TODO import from package

const examples = [
  {
    title: "Embedding Settings",
    children:   ExamplesPage(
      { examples: [{
        title: "Embedding Settings",
        children: (<ConfigTable { ...config } />)
      }],
      title: "Embedding Settings"
    })
  },
  {
    title: "Simple Report Embedding",
    children:  (<SimpleReportEmbedding powerbi={powerbi} models={models} />)
  },
  {
    title: "Printing the report",
    children:  (<SimpleReportEmbedding powerbi={powerbi} models={models} />)
  },
];

export default () => {
    return <ExamplesSwitcher examples={examples} />;
}
