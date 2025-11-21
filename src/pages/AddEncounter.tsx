import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateEncounterMutation } from "@/features/patients/patientsApiSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

export default function AddEncounter() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [createEncounter, { isLoading }] = useCreateEncounterMutation();

    const [notes, setNotes] = useState("");
    const [vitals, setVitals] = useState({
        bpSystolic: "",
        bpDiastolic: "",
        heartRate: "",
        respRate: "",
        tempC: "",
        spo2: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            // Filter out empty vitals
            const cleanVitals = Object.fromEntries(
                Object.entries(vitals).filter(([_, v]) => v !== "")
            );

            await createEncounter({
                patientId: id,
                notes,
                vitals: Object.keys(cleanVitals).length > 0 ? cleanVitals : undefined,
            }).unwrap();

            toast({
                title: "Encounter Added",
                description: "Clinical encounter has been recorded successfully.",
            });

            navigate(`/patients/${id}`);
        } catch (error: any) {
            toast({
                title: "Error Adding Encounter",
                description: error.message || "Failed to add encounter",
                variant: "destructive",
            });
        }
    };

    const handleVitalChange = (field: string, value: string) => {
        setVitals((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="mb-6 flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(`/patients/${id}`)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Add Encounter</h2>
                    <p className="text-muted-foreground mt-1">Record a new clinical encounter.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Clinical Notes & Vitals</CardTitle>
                        <CardDescription>Enter the details of the patient visit.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="notes">Clinical Notes *</Label>
                            <Textarea
                                id="notes"
                                placeholder="Enter clinical observations, diagnosis, and plan..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[150px]"
                                required
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="bpSystolic">BP Systolic (mmHg)</Label>
                                <Input
                                    id="bpSystolic"
                                    type="number"
                                    value={vitals.bpSystolic}
                                    onChange={(e) => handleVitalChange("bpSystolic", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bpDiastolic">BP Diastolic (mmHg)</Label>
                                <Input
                                    id="bpDiastolic"
                                    type="number"
                                    value={vitals.bpDiastolic}
                                    onChange={(e) => handleVitalChange("bpDiastolic", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                                <Input
                                    id="heartRate"
                                    type="number"
                                    value={vitals.heartRate}
                                    onChange={(e) => handleVitalChange("heartRate", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="respRate">Resp. Rate (bpm)</Label>
                                <Input
                                    id="respRate"
                                    type="number"
                                    value={vitals.respRate}
                                    onChange={(e) => handleVitalChange("respRate", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tempC">Temperature (°C)</Label>
                                <Input
                                    id="tempC"
                                    type="number"
                                    step="0.1"
                                    value={vitals.tempC}
                                    onChange={(e) => handleVitalChange("tempC", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spo2">SpO2 (%)</Label>
                                <Input
                                    id="spo2"
                                    type="number"
                                    value={vitals.spo2}
                                    onChange={(e) => handleVitalChange("spo2", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button type="submit" className="flex-1" disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                {isLoading ? "Saving..." : "Save Encounter"}
                            </Button>
                            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(`/patients/${id}`)}>
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
