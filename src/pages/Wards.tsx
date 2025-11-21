import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bed, Users, Activity } from "lucide-react";

interface Ward {
  name: string;
  type: string;
  capacity: number;
  occupied: number;
  available: number;
  status: "normal" | "full" | "critical";
}

const wardsData: Ward[] = [
  { name: "General Ward A", type: "General", capacity: 80, occupied: 65, available: 15, status: "normal" },
  { name: "General Ward B", type: "General", capacity: 100, occupied: 80, available: 20, status: "normal" },
  { name: "ICU", type: "Critical Care", capacity: 35, occupied: 28, available: 7, status: "critical" },
  { name: "Pediatric Ward", type: "Pediatric", capacity: 80, occupied: 62, available: 18, status: "normal" },
  { name: "Maternity Ward", type: "Maternity", capacity: 50, occupied: 41, available: 9, status: "normal" },
  { name: "Emergency", type: "Emergency", capacity: 40, occupied: 19, available: 21, status: "normal" },
];

export default function Wards() {
  const getStatusColor = (status: Ward["status"]) => {
    switch (status) {
      case "normal":
        return "bg-success/10 text-success border-success/20";
      case "full":
        return "bg-warning/10 text-warning border-warning/20";
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getOccupancyPercentage = (occupied: number, capacity: number) => {
    return (occupied / capacity) * 100;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Ward Management</h2>
        <p className="text-muted-foreground mt-1">Monitor bed occupancy and ward status.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wardsData.map((ward, index) => {
          const occupancyPercentage = getOccupancyPercentage(ward.occupied, ward.capacity);

          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{ward.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{ward.type}</p>
                  </div>
                  <Badge className={getStatusColor(ward.status)} variant="outline">
                    {ward.status === "normal" ? "Normal" : ward.status === "full" ? "Full" : "Critical"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{ward.capacity}</p>
                    <p className="text-xs text-muted-foreground">Total Beds</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto">
                      <Users className="h-5 w-5 text-destructive" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{ward.occupied}</p>
                    <p className="text-xs text-muted-foreground">Occupied</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
                      <Activity className="h-5 w-5 text-success" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{ward.available}</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-medium">{occupancyPercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={occupancyPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
