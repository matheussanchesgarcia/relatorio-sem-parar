
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TollData } from "@/types/dashboard";
import { formatCurrency } from "@/utils/dataProcessor";

interface DataTableProps {
  data: TollData[];
}

const DataTable = ({ data }: DataTableProps) => {
  if (!data.length) return null;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Dados Brutos</CardTitle>
        <CardDescription>Detalhes completos das despesas de pedágio</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value]) => (
                  <TableCell key={key}>{formatCurrency(value)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
