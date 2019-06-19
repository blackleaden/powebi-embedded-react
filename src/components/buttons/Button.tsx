import React, { StatelessComponent } from "react";

import { IButtonGroupProps, IButtonProps } from "./types";
import "./Button.scss";

export const ButtonGroup: StatelessComponent<IButtonGroupProps> = (
  props: IButtonGroupProps
) => (
    <div className={`button-group${props.className ? ` ${props.className}` : ""}`}>
      {props.children}
    </div>
  );
ButtonGroup.displayName = "ButtonGroup";

export const Button: StatelessComponent<IButtonProps> = (
  props: IButtonProps,
) => (
    <button
      {...props}
      className={`button${props.className ? ` ${props.className}` : ""}`}
    />
  );

Button.displayName = "Button";
Button.defaultProps = {
  type: "button",
};

export default Button;
