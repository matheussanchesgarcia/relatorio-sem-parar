
import { ChartData } from "@/types/dashboard";
import { formatCurrency } from "@/utils/dataProcessor";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TollBarChartProps {
  data: ChartData[];
}

const TollBarChart = ({ data }: TollBarChartProps) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Custos Totais de Pedágio por Entidade</CardTitle>
        <CardDescription>Comparando despesas de pedágio entre diferentes entidades</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={70} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis 
              tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), "Custo"]}
              labelFormatter={(label) => `Entidade: ${label}`}
            />
            <Bar 
              dataKey="value" 
              fill="#2563eb" 
              name="Custo"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TollBarChart;
