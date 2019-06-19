import * as React from "react";
import * as powerbiClient from "powerbi-client";

import { ExamplesSwitcher, ExamplesPage } from "./components/ExampleLayout";
import ConfigTable from "./components/ConfigTable";

import "./components/ExampleLayout/Example.less";

import { SimpleReportEmbedding } from "./exampleCases/";

const examples = [
  {
    title: "Embedding Settings",
    children:   ExamplesPage(
      { examples: [{
        title: "Embedding Settings",
        children: () => <ConfigTable />
      }],
      title: "Embedding Settings"
    })
  },
  {
    title: "Simple Report Embedding",
    children: <SimpleReportEmbedding />
  },
  {
    title: "Printing the report",
    children: <SimpleReportEmbedding />
  },
];

export default () => {
    return <ExamplesSwitcher examples={examples} />;
}
