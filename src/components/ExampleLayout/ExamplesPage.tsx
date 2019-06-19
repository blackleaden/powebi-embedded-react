import React, { ReactNode, StatelessComponent } from "react";

import { getKey } from "./helpers";
import { IExamplesList } from "./types";
import { Example } from "./Example";
import { ExamplesHashNav } from "./ExamplesNav";

export const ExamplesPage: StatelessComponent<IExamplesList> = (props: IExamplesList) => (
  <div>
    <a id="top" />
    <h1>{props.title || "Examples"}</h1>
    <hr />
    <ExamplesHashNav examples={props.examples} />
    <hr />
    {props.examples.map((props, index) => <Example key={getKey(props.title, index)} index={index} {...props} />)}
  </div >
);
ExamplesPage.displayName = "ExamplesPage";

export default ExamplesPage;