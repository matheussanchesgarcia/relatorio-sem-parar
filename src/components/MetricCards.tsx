
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types/dashboard";
import { formatCurrency } from "@/utils/dataProcessor";

interface MetricCardsProps {
  data: ChartData[];
  totalCost: number;
}

const MetricCards = ({ data, totalCost }: MetricCardsProps) => {
  const getHighestCost = () => {
    if (data.length === 0) return { name: "N/A", value: 0 };
    return data.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  };

  const getLowestCost = () => {
    if (data.length === 0) return { name: "N/A", value: 0 };
    return data.reduce((prev, current) => (prev.value < current.value) ? prev : current);
  };

  const highestCost = getHighestCost();
  const lowestCost = getLowestCost();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
            <CardDescription className="text-2xl font-bold">{formatCurrency(totalCost)}</CardDescription>
          </div>
          <div className="rounded-full p-2 bg-blue-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-dashboard-blue"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            All entities combined
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Highest Cost</CardTitle>
            <CardDescription className="text-2xl font-bold">{formatCurrency(highestCost.value)}</CardDescription>
          </div>
          <div className="rounded-full p-2 bg-red-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-red-500"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="m19 5 3-3M2 12h10M19 12l-7-7 7 7-7 7 7-7H2h17Z" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {highestCost.name}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lowest Cost</CardTitle>
            <CardDescription className="text-2xl font-bold">{formatCurrency(lowestCost.value)}</CardDescription>
          </div>
          <div className="rounded-full p-2 bg-green-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-green-500"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="m19 5-7 7-7-7M5 19l7-7 7 7" />
            </svg>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {lowestCost.name}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MetricCards;
