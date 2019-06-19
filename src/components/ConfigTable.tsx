import { map } from "lodash";
import * as React from "react";
import { Config } from "../dataInterfaces";

import "./ConfigTable.less";

const ConfigTable: React.FunctionComponent<Config> = (props: Config) => {
    return (
    <section className="config">
        {map(
            props,
            (value: string, key: string) => (
                <dl className="configItem" key={key}>
                    <dt className="configName">{key}</dt>
                    <dd className="configValue">{value}</dd>
                </dl>
            )
        )}
    </section>
    );
};

export default ConfigTable;
