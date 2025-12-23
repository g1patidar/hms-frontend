import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSlice";
import { useGetPatientQuery, useUpdatePatientMutation } from "@/features/patients/patientsApiSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

export default function EditPatient() {
    const { id } = useParams<{ id: string }>();
    const { toast } = useToast();
    const navigate = useNavigate();
    const user = useSelector(selectAuthUser);

    const { data: patientData, isLoading: isFetching } = useGetPatientQuery({ id: id || "" }, {
        skip: !id,
    });

    const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        contact: "",
        assignedDoctor: "",
        admissionType: "",
        ward: "",
        bedNumber: "",
    });

    useEffect(() => {
        if (patientData?.data?.patient) {
            const p = patientData.data.patient;
            setFormData({
                firstName: p.firstName || "",
                lastName: p.lastName || "",
                dateOfBirth: p.dateOfBirth ? new Date(p.dateOfBirth).toISOString().split('T')[0] : "",
                gender: p.gender || "",
                address: p.contact?.address || "",
                contact: p.contact?.phone || "",
                assignedDoctor: p.assignedDoctor || "",
                admissionType: p.admissionType || "",
                ward: p.ward || "",
                bedNumber: p.bedNumber || "",
            });
        }
    }, [patientData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
                gender: formData.gender,
                contact: {
                    phone: formData.contact,
                    address: formData.address,
                },
                assignedDoctor: formData.assignedDoctor,
                admissionType: formData.admissionType,
                ward: formData.ward,
                bedNumber: formData.bedNumber,
            };

            await updatePatient({ id, data: payload }).unwrap();

            toast({
                title: "Patient Updated Successfully",
                description: "Patient details have been updated.",
            });

            navigate("/patients");
        } catch (error: any) {
            toast({
                title: "Error Updating Patient",
                description: error.message || "Failed to update patient",
                variant: "destructive",
            });
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (isFetching) {
        return <div className="p-8 text-center">Loading patient details...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-6 flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate("/patients")}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Edit Patient</h2>
                    <p className="text-muted-foreground mt-1">Update patient information.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Information</CardTitle>
                        <CardDescription>Update the fields below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender *</Label>
                                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact">Contact Number *</Label>
                                <Input
                                    id="contact"
                                    type="tel"
                                    value={formData.contact}
                                    onChange={(e) => handleChange("contact", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address *</Label>
                            <Textarea
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                rows={3}
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button type="submit" className="flex-1" disabled={isUpdating}>
                                <Save className="h-4 w-4 mr-2" />
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/patients")}>
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
