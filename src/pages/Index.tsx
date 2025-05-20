
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import TollBarChart from "@/components/TollBarChart";
import TollPieChart from "@/components/TollPieChart";
import MetricCards from "@/components/MetricCards";
import DataTable from "@/components/DataTable";
import ComparisonChart from "@/components/ComparisonChart";
import { TollData, FormattedTollData } from "@/types/dashboard";
import { processData } from "@/utils/dataProcessor";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [dashboardData, setDashboardData] = useState<FormattedTollData>({
    rawData: [],
    chartData: [],
    totalCost: 0
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { toast } = useToast();

  const handleDataLoaded = (data: TollData[]) => {
    try {
      const processed = processData(data);
      setDashboardData(processed);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Erro ao processar dados:", error);
      toast({
        title: "Erro",
        description: "Falha ao processar os dados enviados",
        variant: "destructive",
      });
    }
  };

  const handleSampleData = () => {
    const sampleData = [
      {
        "Custo Total Pedágio - Eldorado": 133144.30,
        "Custo Total Pedágio - Cooperados": 34211.08,
        "Custo Total Pedágio - Cooper3": 39640.17
      }
    ];
    handleDataLoaded(sampleData);
  };

  const resetDashboard = () => {
    setDashboardData({
      rawData: [],
      chartData: [],
      totalCost: 0
    });
    setIsDataLoaded(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-dashboard-blue-dark mb-2">
            Dashboard de Despesas de Pedágio
          </h1>
          <p className="text-gray-600">
            Envie seus dados de despesas de pedágio para visualizar e analisar custos
          </p>
        </header>

        {!isDataLoaded ? (
          <div className="max-w-md mx-auto">
            <FileUploader onDataLoaded={handleDataLoaded} />
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={handleSampleData}
                className="text-dashboard-blue"
              >
                Usar dados de exemplo
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <Button 
                variant="outline" 
                onClick={resetDashboard}
                className="text-dashboard-gray border-dashboard-gray hover:bg-dashboard-gray hover:text-white"
              >
                Reiniciar Dashboard
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <MetricCards 
                data={dashboardData.chartData} 
                totalCost={dashboardData.totalCost} 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-6">
              <TollBarChart data={dashboardData.chartData} />
              <TollPieChart data={dashboardData.chartData} />
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-6">
              <ComparisonChart data={dashboardData.chartData} />
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-6">
              <DataTable data={dashboardData.rawData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
