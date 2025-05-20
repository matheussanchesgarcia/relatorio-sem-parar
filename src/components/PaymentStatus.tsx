
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentData } from "@/types/dashboard";
import { formatCurrency } from "@/utils/dataProcessor";
import { Progress } from "@/components/ui/progress";

interface PaymentStatusProps {
  data: PaymentData;
}

const PaymentStatus = ({ data }: PaymentStatusProps) => {
  const percentagePaid = (data.paidAmount / data.totalAmount) * 100;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Status de Pagamento - {data.entity}</CardTitle>
        <CardDescription>Controle de valores pagos e restantes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Valor Total</h3>
            <p className="text-2xl font-bold">{formatCurrency(data.totalAmount)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Valor Pago</h3>
            <p className="text-2xl font-bold text-green-500">{formatCurrency(data.paidAmount)}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Valor Restante</h3>
            <p className="text-2xl font-bold text-red-500">{formatCurrency(data.remainingAmount)}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso de Pagamento</span>
            <span>{percentagePaid.toFixed(1)}%</span>
          </div>
          <Progress value={percentagePaid} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentStatus;
