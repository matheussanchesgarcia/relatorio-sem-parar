
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TollData } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

interface ExportButtonProps {
  data: TollData[];
  fileName?: string;
}

const ExportButton = ({ data, fileName = "despesas-pedagio" }: ExportButtonProps) => {
  const handleExport = () => {
    try {
      if (!data || data.length === 0) {
        toast({
          title: "Sem dados para exportar",
          description: "Carregue dados primeiro antes de exportar",
          variant: "destructive",
        });
        return;
      }

      // Criar uma planilha usando a biblioteca XLSX
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Definir larguras das colunas
      const wscols = [
        { wch: 30 },  // Custo Total Pedágio - Eldorado
        { wch: 30 },  // Custo Total Pedágio - Cooperados
        { wch: 30 },  // Custo Total Pedágio - Cooper3
      ];
      
      worksheet['!cols'] = wscols;

      // Criar um workbook e adicionar a planilha
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Despesas");

      // Gerar o arquivo e iniciar o download
      XLSX.writeFile(workbook, `${fileName}-${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Exportação concluída",
        description: "Os dados foram exportados com sucesso para Excel",
      });
    } catch (error) {
      console.error("Erro ao exportar:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={handleExport}
      variant="outline" 
      className="flex items-center gap-2 bg-dashboard-blue text-white hover:bg-dashboard-blue/80"
    >
      <Download className="h-4 w-4" />
      Exportar Excel
    </Button>
  );
};

export default ExportButton;
