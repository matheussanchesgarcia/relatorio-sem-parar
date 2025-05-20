
import { TollData, ChartData, FormattedTollData } from "@/types/dashboard";

export const processData = (data: TollData[]): FormattedTollData => {
  if (!data || !data.length) {
    return {
      rawData: [],
      chartData: [],
      totalCost: 0
    };
  }
  
  const colors = ["#2563eb", "#0d9488", "#64748b", "#f59e0b", "#8b5cf6"];
  let totalCost = 0;
  
  const chartData = Object.entries(data[0]).map(([key, value], index) => {
    totalCost += value;
    return {
      name: key.replace("Custo Total Pedágio - ", ""),
      value: value,
      color: colors[index % colors.length]
    };
  });
  
  return {
    rawData: data,
    chartData: chartData,
    totalCost: totalCost
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
