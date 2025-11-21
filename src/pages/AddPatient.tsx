import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSlice";
import { postJson } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save } from "lucide-react";
const hospitalId = (import.meta as any).env.HOSPITAL_ID;

export default function AddPatient() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    contact: "",
    symptoms: "",
    doctor: "",
    ward: "",
    bed: "",
    admissionType: "",
    hospitalId: hospitalId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.hospitalId) {
      toast({
        title: "Error",
        description: "You must be logged in and associated with a hospital to add patients.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "."; // Fallback if no last name

      const payload = {
        hospitalId: user.hospitalId,
        firstName,
        lastName,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        gender: formData.gender,
        contact: {
          phone: formData.contact,
          address: formData.address,
        },
        // Note: Ward, bed, doctor, symptoms etc are not supported by createPatient API yet
      };

      await postJson("/patients", payload);

      toast({
        title: "Patient Added Successfully",
        description: `${formData.name} has been registered in the system.`,
      });

      navigate("/patients");
    } catch (error: any) {
      toast({
        title: "Error Adding Patient",
        description: error.message || "Failed to add patient",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Add New Patient</h2>
        <p className="text-muted-foreground mt-1">Enter patient details to register them in the system.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Please fill in all required fields marked with *</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter patient's full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
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
                  placeholder="Phone number"
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
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms *</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe symptoms"
                value={formData.symptoms}
                onChange={(e) => handleChange("symptoms", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="doctor">Assigned Doctor *</Label>
                <Select value={formData.doctor} onValueChange={(value) => handleChange("doctor", value)}>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-smith">Dr. Sarah Smith</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Michael Johnson</SelectItem>
                    <SelectItem value="dr-williams">Dr. Emily Williams</SelectItem>
                    <SelectItem value="dr-brown">Dr. David Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admissionType">Admission Type *</Label>
                <Select value={formData.admissionType} onValueChange={(value) => handleChange("admissionType", value)}>
                  <SelectTrigger id="admissionType">
                    <SelectValue placeholder="Select admission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="outpatient">Outpatient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward">Ward *</Label>
                <Select value={formData.ward} onValueChange={(value) => handleChange("ward", value)}>
                  <SelectTrigger id="ward">
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Ward</SelectItem>
                    <SelectItem value="icu">ICU</SelectItem>
                    <SelectItem value="pediatric">Pediatric Ward</SelectItem>
                    <SelectItem value="maternity">Maternity Ward</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bed">Bed Number *</Label>
                <Input
                  id="bed"
                  placeholder="e.g., A-101"
                  value={formData.bed}
                  onChange={(e) => handleChange("bed", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Upload Documents</Label>
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Upload medical records, insurance, or ID documents (PDF, JPG, PNG)</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Patient"}
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
