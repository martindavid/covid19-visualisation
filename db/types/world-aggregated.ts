export type WorldAggregateSummary = {
  date: string;
  confirmed: number;
  recovered: number;
  death: number;
};

export type WorldAggregateAccumulation = {
  daily_confirmed_rate: number;
  daily_confirmed_rate_num: number;
  daily_death_rate: number;
  daily_death_rate_num: number;
  recovered_increment_rate_num: number;
} & WorldAggregateSummary;
