import React from "react";
import { ExamplesPage } from "../components/ExampleLayout";

import PBIEmbeddedReport from "../components/PBIEmbeddedReport";
import config from "../config";

export const examples = [{
  title: "Simple Report",
  children: () => <PBIEmbeddedReport { ...config } />,
}];

export const SimpleReportEmbedding: React.FunctionComponent = () => (
  ExamplesPage({
    examples,
    title: "Simple Report",
  })
);

export default SimpleReportEmbedding;
