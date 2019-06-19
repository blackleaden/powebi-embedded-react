import React, { StatelessComponent } from "react";

import { ExampleGetParamsNav } from "./ExamplesNav";
import { IExamplesList } from "./types";
import { getKey } from "./helpers";

export const ExamplesSwitcher: StatelessComponent<IExamplesList> = (props: IExamplesList) => (
  <div >
    <ExampleGetParamsNav {...props} />
    <hr />
    {props.examples && (props.examples.reduce(
      //finds selected by "exampleKey" parameter in document.location.search string
      (child, item, index) => {
        if (child) return child;
        return (document.location.search.indexOf(`exampleKey=${getKey(item.title, index)}`) > 0)
          ? item.children
          : child;
      }, false)
      //or show default
      || (props.examples[0] && props.examples[0].children)
    )}
  </div>
);
ExamplesSwitcher.displayName = "ExampleSwitcher";

export default ExamplesSwitcher;
