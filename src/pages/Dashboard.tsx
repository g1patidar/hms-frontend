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
  const wards = stats?.wards || [];

  // Transform stats for StatCard
  const statsCards = stats ? [
    {
      title: "Total Patients",
      value: stats.totalPatients.toString(),
      icon: Users,
      trend: ``,
      trendUp: stats.occupancyPercentage > 70
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
    {
      title: "Available Beds",
      value: stats.availableBeds.toString(),
      icon: Bed,
      trend: `${stats.occupancyPercentage}% occupancy`,
      trendUp: stats.occupancyPercentage < 80
    },
  ] : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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

      {/* Ward Occupancy Chart */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Ward Occupancy Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {statsError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load ward occupancy data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : statsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[350px] w-full" />
              <div className="flex items-center justify-center gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ) : wards.length === 0 ? (
            <div className="flex items-center justify-center h-[350px] text-muted-foreground">
              <p>No ward data available. Please configure wards in the system.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto pb-2">
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={wards}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="name"
                        className="text-sm text-muted-foreground"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis
                        className="text-sm text-muted-foreground"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.75rem',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Bar dataKey="patients" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="capacity" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Current Patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-sm text-muted-foreground">Total Capacity</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

