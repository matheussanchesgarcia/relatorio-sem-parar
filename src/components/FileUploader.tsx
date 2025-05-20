
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { TollData } from "@/types/dashboard";

interface FileUploaderProps {
  onDataLoaded: (data: TollData[]) => void;
}

const FileUploader = ({ onDataLoaded }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        // Validate data format
        if (!Array.isArray(json)) {
          throw new Error("The uploaded file must contain a JSON array");
        }
        
        // Check if data has the expected structure
        const requiredKeys = [
          "Custo Total Pedágio - Eldorado",
          "Custo Total Pedágio - Cooperados",
          "Custo Total Pedágio - Cooper3"
        ];
        
        const isValidFormat = requiredKeys.every(key => 
          json[0] && typeof json[0][key] === "number"
        );
        
        if (!isValidFormat) {
          throw new Error("The data format is incorrect. Please check the JSON structure.");
        }
        
        onDataLoaded(json);
        toast({
          title: "Success!",
          description: "Your data has been loaded successfully.",
          variant: "default",
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load data from file",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/json") {
        handleFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a JSON file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/json") {
        handleFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a JSON file",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Upload Your Data</CardTitle>
        <CardDescription>
          Upload a JSON file containing your toll expense data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-10 text-center ${
            isDragging ? "border-dashboard-blue bg-blue-50" : "border-dashboard-lightGray"
          } transition-all duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto text-dashboard-blue mb-4" />
          <p className="text-lg font-medium mb-2">
            Drag and drop your JSON file here
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <div>
            <label htmlFor="file-upload">
              <Button
                variant="outline"
                className="cursor-pointer border-dashboard-blue text-dashboard-blue hover:bg-dashboard-blue hover:text-white"
              >
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploader;
