export type WorldAggregateSummary = {
  date: string;
  confirmed: number;
  confirmed_increased: number;
  recovered: number;
  recovered_increased: number;
  death: number;
  death_increased: number;
};

export type WorldAggregateAccumulation = {
  daily_confirmed_rate: number;
  daily_confirmed_rate_num: number;
  daily_death_rate: number;
  daily_death_rate_num: number;
  daily_recovered_rate_num: number;
  recovered_increment_rate_num: number;
} & WorldAggregateSummary;
