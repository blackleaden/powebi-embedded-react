import * as React from "react";
import { map } from "lodash";
import config from "../config";

import "./ConfigTable.less";

const ConfigTable = () => {

    return (
    <section className="config">
        {map(
            config,
            (value, key) => (
                <dl className="configItem" key={key}>
                    <dt className="configName">{key}</dt>
                    <dd className="configValue">{value}</dd>
                </dl>
            )
        )}
    </section>
    )
}

export default ConfigTable;