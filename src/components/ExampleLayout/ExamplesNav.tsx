import React, { StatelessComponent } from "react";

import { IExamplesList } from "./types";
import { getKey } from "./helpers";

export const ExamplesOnClickNav: StatelessComponent<IExamplesList> = (props: IExamplesList) => (
  <ul className="example-nav example-on-click-nav">
    {
      props.examples && props.examples.map((item, index) => (
        <li
          key={getKey(item.title, index)}
          className={`example-nav-item ${(props.active == index) ? "active" : ""}`}
        >
          <span
            onClick={() => { props.onSelect(item, index); }}
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
        </li>
      ))
    }
  </ul>
);
ExamplesOnClickNav.displayName = "ExamplesOnClickNav";

export const ExampleGetParamsNav: StatelessComponent<IExamplesList> = (props: IExamplesList) => (
  <div className="example-nav example-get-params-nav">
    {
      props.examples && props.examples.map((item, index) => (
        <a
          key={getKey(item.title, index)}
          className="example-nav-item"
          title="Default"
          href={`?exampleKey=${getKey(item.title, index)}`}
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
      ))
    }
  </div>
);
ExampleGetParamsNav.displayName = "ExampleGetParamsNav";

export const ExamplesHashNav: StatelessComponent<IExamplesList> = (props: IExamplesList) => (
  <ol className="example-nav example-hash-nav">
    {
      props.examples && props.examples.map((item, index) => (
        <li
          className="example-nav-item"
          key={getKey(item.title, index)}
        >
          <a
            href={`#${getKey(item.title, index)}`}
            dangerouslySetInnerHTML={{ __html: item.title }}
          /></li>
      ))
    }
  </ol >
);
ExamplesHashNav.displayName = "ExamplesHashNav";