import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Edit, Trash2, Filter, UserPlus, MapPin, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/components/DataTable";
import { useGetPatientsQuery, useDeletePatientMutation } from "@/features/patients/patientsApiSlice";
import { format } from "date-fns";

import { useDebounce } from "@/hooks/use-debounce";

interface Patient {
  id: string;
  name: string;
  age: number | string;
  gender: string;
  doctor: string;
  admissionDate: string;
  contact: { phone: string; address: string };
  status: "stable" | "critical" | "recovering";
  ward?: string;
}

export default function Patients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWard, setFilterWard] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [deletePatient] = useDeletePatientMutation();

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading } = useGetPatientsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch,
  });

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "stable":
        return "bg-green-100 text-green-800 border-green-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "recovering":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const columns: Column<Patient>[] = [
    // { header: "Patient ID", accessorKey: "id", className: "font-medium" },
    {
      header: "Name",
      accessorKey: "name",
      cell: (patient) => (
        <span
          className="cursor-pointer hover:underline text-primary font-medium"
          onClick={() => navigate(`/patients/${patient.id}`)}
        >
          {patient.name}
        </span>
      ),
    },
    { header: "Age", accessorKey: "age" },
    { header: "Gender", accessorKey: "gender" },
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   cell: (patient) => (
    //     <Badge className={getStatusColor(patient.status)} variant="outline">
    //       {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
    //     </Badge>
    //   ),
    // },
    {
      header: "Contact",
      accessorKey: "contact",
      cell: (patient) => (
        <div className="flex flex-col gap-1">
          {patient.contact.phone && (
            <span className="flex items-center gap-1 text-sm">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              {patient.contact.phone}
            </span>
          )}
          {patient.contact.address && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {patient.contact.address}
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      className: "text-right",
      cell: (patient) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/patients/${patient.id}`)}>
            <Eye className="h-4 w-4" />
          </Button>
          {(!patient.ward || patient.ward === "N/A") && (
            <Button
              variant="ghost"
              size="icon"
              title="Admit Patient"
              onClick={() => navigate(`/patients/${patient.id}?admit=1`)}
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => navigate(`/edit-patient/${patient.id}`)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={async () => {
              if (window.confirm("Are you sure you want to delete this patient?")) {
                try {
                  await deletePatient(patient.id).unwrap();
                  // Toast handled by global error handler or we can add success toast here
                } catch (error) {
                  console.error("Failed to delete patient", error);
                }
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Map API data to table format
  const patients: Patient[] = data?.data.map((p) => {
    let age: number | string = "N/A";
    if (p.dateOfBirth) {
      const dob = new Date(p.dateOfBirth);
      const today = new Date();
      let ageNum = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        ageNum--;
      }
      age = ageNum;
    }

    return {
      id: p._id,
      name: `${p.firstName} ${p.lastName}`,
      age,
      gender: p.gender,
      contact: { phone: p.contact?.phone || "", address: p.contact?.address || "" },
      doctor: p.assignedDoctor || "",
      admissionDate: format(new Date(p.createdAt), "yyyy-MM-dd"),
      status: "stable", // Placeholder
    };
  }) || [];

  const totalPages = data?.meta.totalPages || 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleWardChange = (value: string) => {
    setFilterWard(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Patient Records</h2>
          <p className="text-muted-foreground mt-1">Manage and view all patient information.</p>
        </div>
        <Button onClick={() => navigate("/add-patient")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">All Patients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            {/* <Select value={filterWard} onValueChange={handleWardChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="ICU">ICU</SelectItem>
                <SelectItem value="Pediatric">Pediatric</SelectItem>
                <SelectItem value="Maternity">Maternity</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="recovering">Recovering</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          <DataTable
            data={patients}
            columns={columns}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={itemsPerPage}
            onPageSizeChange={handlePageSizeChange}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
