
import { ChartData } from "@/types/dashboard";
import { formatCurrency } from "@/utils/dataProcessor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ComparisonChartProps {
  data: ChartData[];
}

const ComparisonChart = ({ data }: ComparisonChartProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Entity Cost Comparison</CardTitle>
        <CardDescription>Horizontal comparison of toll costs</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 120,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}K`} />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), "Cost"]}
            />
            {data.map((entry, index) => (
              <Bar 
                key={`bar-${index}`}
                dataKey="value"
                fill={entry.color}
                name={entry.name}
                radius={[0, 4, 4, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
