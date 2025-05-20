
import { TollData, ChartData, FormattedTollData, PaymentData } from "@/types/dashboard";

export const processData = (data: TollData[]): FormattedTollData => {
  if (!data || !data.length) {
    return {
      rawData: [],
      chartData: [],
      totalCost: 0,
      paidAmount: 79792.59,  // Saldo que entrou na conta
      remainingAmount: 0
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

  // Valor já pago (saldo que entrou na conta)
  const paidAmount = 79792.59;
  
  // Valor restante a pagar
  const eldoradoCost = data[0]["Custo Total Pedágio - Eldorado"] || 0;
  const remainingAmount = eldoradoCost - paidAmount;
  
  return {
    rawData: data,
    chartData: chartData,
    totalCost: totalCost,
    paidAmount: paidAmount,
    remainingAmount: remainingAmount
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const getPaymentData = (data: FormattedTollData): PaymentData => {
  const eldoradoData = data.chartData.find(item => item.name === "Eldorado");
  
  return {
    entity: "Eldorado",
    paidAmount: data.paidAmount,
    totalAmount: eldoradoData?.value || 0,
    remainingAmount: data.remainingAmount
  };
};
