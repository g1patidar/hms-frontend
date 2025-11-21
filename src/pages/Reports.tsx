import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";

const reportTypes = [
  {
    title: "Daily Patient Report",
    description: "Summary of admissions, discharges, and current occupancy",
    icon: Calendar,
  },
  {
    title: "Ward Utilization Report",
    description: "Detailed analysis of bed occupancy across all wards",
    icon: TrendingUp,
  },
  {
    title: "Medical Records Summary",
    description: "Comprehensive patient medical history and treatment records",
    icon: FileText,
  },
  {
    title: "Staff Assignment Report",
    description: "Doctor and nurse assignments with patient load distribution",
    icon: FileText,
  },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Reports & Analytics</h2>
        <p className="text-muted-foreground mt-1">Generate and download system reports.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <report.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-xl mt-4">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
