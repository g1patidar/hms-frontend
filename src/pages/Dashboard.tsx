import { Users, UserCheck, UserMinus, Bed, AlertCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Dashboard() {
  const { data: statsData, isLoading: statsLoading, error: statsError } = useGetDashboardStatsQuery();

  const stats = statsData?.data;

  // Transform stats for StatCard
  const statsCards = stats ? [
    {
      title: "Total Patients",
      value: stats.totalPatients.toString(),
      icon: Users,
      trend: ``,
      trendUp: true // Simplified logic as occupancy is gone
    },
    {
      title: "Admitted Today",
      value: stats.admittedToday.toString(),
      icon: UserCheck,
      trend: stats.admittedToday > 0 ? `+${stats.admittedToday} new admissions` : "No admissions",
      trendUp: true
    },
    {
      title: "Discharged Today",
      value: stats.dischargedToday.toString(),
      icon: UserMinus,
      trend: stats.dischargedToday > 0 ? `${stats.dischargedToday} discharges` : "No discharges",
      trendUp: true
    },
  ] : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 md:mt-10 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your hospital overview.</p>
      </div>

      {/* Stats Cards */}
      {statsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load dashboard statistics. Please try again later.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            statsCards.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

