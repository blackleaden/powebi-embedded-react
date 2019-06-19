import { ComponentType } from "react";

export interface ICaseProps {
  children: ComponentType<{}>
  title: string,
}

export interface IExampleProps extends ICaseProps {
  index?: number;
  cases?: ICaseProps[]
};

export interface IExamplesList {
  examples?: ICaseProps[];
  title?: string;
  onSelect?: (item?: IExampleProps, index?: number) => void;
  active?: number;
};
