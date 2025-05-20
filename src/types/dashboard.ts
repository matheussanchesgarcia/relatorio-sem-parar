
export interface TollData {
  "Custo Total Pedágio - Eldorado": number;
  "Custo Total Pedágio - Cooperados": number;
  "Custo Total Pedágio - Cooper3": number;
  [key: string]: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface FormattedTollData {
  rawData: TollData[];
  chartData: ChartData[];
  totalCost: number;
}
