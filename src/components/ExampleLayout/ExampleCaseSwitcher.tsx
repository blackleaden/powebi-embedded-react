import React from "react";

import { ExamplesOnClickNav } from "./ExamplesNav";
import { IExamplesList } from "./types";

const initialState = { active: 0 };
type State = Readonly<typeof initialState>;

export class ExampleCaseSwitcher extends React.Component<IExamplesList, State>{
  constructor(props: IExamplesList) {
    super(props);
    this.state = initialState;
  }

  render() {
    const { examples, title } = this.props;
    const { active } = this.state;

    return (
      <div>
        {title ? <b>{title}</b> : ""}
        <ExamplesOnClickNav
          {...this.props}
          onSelect={(_, index) => this.setState({ active: index })}
          active={active}
        />
        {examples
          && examples.map((item, index) =>
            <div
              key={`case_${item.title}_${index}`}
              hidden={index !== active}
            >{item.children}</div>
          )}
      </div>
    );
  }
}

export default ExampleCaseSwitcher;