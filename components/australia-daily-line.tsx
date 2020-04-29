import React from "react";
import { StateDailyCombineView } from "components/state-daily-combine-view";
import { AustraliaTimeSeries } from "db/types/australia-time-series";

type Props = {
  data: Array<AustraliaTimeSeries>;
};

const AustraliaDailyLineView = (props: Props) => {
  return <StateDailyCombineView data={props.data} />;
};

export default AustraliaDailyLineView;
