import React, { StatelessComponent } from "react";

import { getKey } from "./helpers";
import ExampleCaseSwitcher from "./ExampleCaseSwitcher";
import { IExampleProps } from "./types";
import "./Example.less";

export const Code = (props: { children: string }) => (
  <pre><code className="code">{props.children}</code></pre>
)

export const Term = (props: { children: string }) => (
  <strong className="code">{props.children}</strong>
)

export const Example: StatelessComponent<IExampleProps> = (example: IExampleProps) => {
  const { title, children, cases, index } = example;
  const key = getKey(title, index);
  const ChildrenComponent: React.ComponentType<{}> = children;
  return (
    <div className="example">
      <a id={key} />
      <h2 dangerouslySetInnerHTML={{ __html: `#${!isNaN(index) ? `${index + 1}` : ""} ${title}` }} />
      <ChildrenComponent />
      { cases 
        && (cases.length > 1)
        && <ExampleCaseSwitcher examples={cases} title={title} />
      }
      <br />
      <a href="#top" className="to-top">to top</a>
      <div style={{ clear: "both" }} />
      <hr />
    </div >
  );
};
Example.displayName = "ExampleItem";

export default Example;