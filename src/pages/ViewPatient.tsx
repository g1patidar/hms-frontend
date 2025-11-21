import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetPatientQuery, useGetPatientEncountersQuery, useDischargePatientMutation, useAdmitPatientMutation } from '@/features/patients/patientsApiSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Phone, Mail, MapPin, User, Clock, FileText, Bed, Stethoscope, Building, LogOut, Search, X, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/useDebounce';

const ViewPatient = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showAdmitDialog, setShowAdmitDialog] = useState(false);
    const [admitData, setAdmitData] = useState({
        assignedDoctor: '',
        admissionType: '',
        ward: '',
        bedNumber: ''
    });

    const debouncedSearch = useDebounce(search, 500);

    const {
        data: patientResponse,
        isLoading: isLoadingPatient,
        isError: isErrorPatient
    } = useGetPatientQuery({ id: id! }, { skip: !id });

    const {
        data: encountersResponse,
        isLoading: isLoadingEncounters,
        isError: isErrorEncounters,
        error: errorEncounters
    } = useGetPatientEncountersQuery({
        id: id!,
        limit: 50,
        search: debouncedSearch || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
    }, { skip: !id });

    const [dischargePatient, { isLoading: isDischarging }] = useDischargePatientMutation();
    const [admitPatient, { isLoading: isAdmitting }] = useAdmitPatientMutation();

    useEffect(() => {
        if (isErrorEncounters) {
            console.error('Error fetching encounters:', errorEncounters);
            toast({
                title: "Error loading encounters",
                description: "Failed to load encounter history.",
                variant: "destructive",
            });
        }
    }, [isErrorEncounters, errorEncounters, toast]);

    // Auto-open Admit dialog if ?admit=1 is present
    useEffect(() => {
        const search = new URLSearchParams(location.search);
        if (search.get('admit') === '1') {
            setShowAdmitDialog(true);
        }
    }, [location.search]);

    const handleDischarge = async () => {
        if (!confirm("Are you sure you want to discharge this patient?")) return;
        try {
            await dischargePatient(id!).unwrap();
            toast({
                title: "Patient Discharged",
                description: "Patient has been successfully discharged.",
            });
        } catch (error: any) {
            toast({
                title: "Error Discharging Patient",
                description: error.message || "Failed to discharge patient",
                variant: "destructive",
            });
        }
    };

    const clearFilters = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
    };

    const handleAdmit = async () => {
        if (!admitData.assignedDoctor || !admitData.ward || !admitData.bedNumber) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }
        try {
            await admitPatient({ id: id!, ...admitData }).unwrap();
            toast({
                title: "Patient Admitted",
                description: "Patient has been successfully admitted.",
            });
            setShowAdmitDialog(false);
            setAdmitData({ assignedDoctor: '', admissionType: '', ward: '', bedNumber: '' });
        } catch (error: any) {
            toast({
                title: "Error Admitting Patient",
                description: error.message || "Failed to admit patient",
                variant: "destructive",
            });
        }
    };

    if (isLoadingPatient) {
        return (
            <div className="container mx-auto p-6 space-y-6">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    if (isErrorPatient || !patientResponse?.data?.patient) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold text-red-600">Error loading patient data</h2>
                <Button onClick={() => navigate('/patients')} className="mt-4">
                    Back to Patients
                </Button>
            </div>
        );
    }

    const { patient } = patientResponse.data;
    const encounters = encountersResponse?.data || [];
    const isAdmitted = !!patient.ward || !!patient.bedNumber;

    return (
        <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            {patient.firstName} {patient.lastName}
                        </h1>
                        <p className="text-muted-foreground">
                            Patient ID: <span className="font-mono text-sm">{patient._id}</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {!isAdmitted && (
                        <Button variant="default" onClick={() => setShowAdmitDialog(true)}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Admit Patient
                        </Button>
                    )}
                    {isAdmitted && (
                        <Button variant="destructive" onClick={handleDischarge} disabled={isDischarging}>
                            <LogOut className="mr-2 h-4 w-4" />
                            {isDischarging ? "Discharging..." : "Discharge Patient"}
                        </Button>
                    )}
                    <Button variant="outline" onClick={() => navigate(`/patients/${id}/add-encounter`)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Add Encounter
                    </Button>
                    <Button onClick={() => navigate(`/edit-patient/${patient._id}`)}>
                        Edit Patient
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Patient Details Column */}
                <div className="space-y-6 md:col-span-1">
                    {/* Personal Details Card */}
                    <Card className="shadow-lg border-t-4 border-t-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <User className="mr-2 h-5 w-5 text-primary" />
                                Personal Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Calendar className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                                    <p className="text-sm">
                                        {patient.dateOfBirth
                                            ? format(new Date(patient.dateOfBirth), 'MMMM do, yyyy')
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <User className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Gender</p>
                                    <p className="text-sm capitalize">{patient.gender}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <h4 className="font-semibold mb-3 flex items-center">
                                    Contact Information
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{patient.contact?.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{patient.contact?.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{patient.contact?.address || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admission Details Card - Only visible if admitted */}
                    {isAdmitted && (
                        <Card className="shadow-lg border-t-4 border-t-green-500">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl">
                                    <Building className="mr-2 h-5 w-5 text-green-600" />
                                    Admission Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <Stethoscope className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Assigned Doctor</p>
                                        <p className="text-sm font-semibold">{patient.assignedDoctor || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <Building className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Ward</p>
                                        <p className="text-sm font-semibold">{patient.ward || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <Bed className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Bed Number</p>
                                        <p className="text-sm font-semibold">{patient.bedNumber || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <FileText className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Admission Type</p>
                                        <p className="text-sm font-semibold">{patient.admissionType || 'N/A'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Encounters History Section */}
                <Card className="md:col-span-2 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="flex items-center text-xl">
                            <FileText className="mr-2 h-5 w-5 text-primary" />
                            Encounter History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Search and Filter Controls */}
                        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
                            <div className="grid gap-4 md:grid-cols-4">
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search notes..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="Start Date"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="End Date"
                                    />
                                    {(search || startDate || endDate) && (
                                        <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear Filters">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {isLoadingEncounters ? (
                            <div className="space-y-4">
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        ) : isErrorEncounters ? (
                            <div className="text-center py-12 text-red-500">
                                <p>Failed to load encounters. Please try again later.</p>
                            </div>
                        ) : encounters && encounters.length > 0 ? (
                            <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-8">
                                {encounters.map((encounter) => {
                                    const isDischarge = encounter.type === 'Discharge';
                                    return (
                                        <div key={encounter._id} className="mb-8 ml-6 relative group">
                                            <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-[2.8rem] ring-8 ring-white dark:ring-gray-900 ${isDischarge ? 'bg-red-100 dark:bg-red-900' : 'bg-blue-100 dark:bg-blue-900'
                                                }`}>
                                                {isDischarge ? (
                                                    <LogOut className={`w-4 h-4 ${isDischarge ? 'text-red-600 dark:text-red-300' : 'text-blue-800 dark:text-blue-300'}`} />
                                                ) : (
                                                    <Clock className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                                                )}
                                            </span>
                                            <div className={`p-4 bg-white dark:bg-gray-800 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${isDischarge ? 'border-red-200 dark:border-red-900' : 'border-gray-200 dark:border-gray-700'
                                                }`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <time className="mb-1 text-sm font-normal text-gray-400 dark:text-gray-500">
                                                        {format(new Date(encounter.timestamp), 'PPpp')}
                                                    </time>
                                                    {isDischarge && (
                                                        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                                            Discharge
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    {isDischarge ? 'Discharge Summary' : 'Clinical Notes'}
                                                </h3>
                                                <p className="text-base font-normal text-gray-500 dark:text-gray-400 whitespace-pre-wrap mb-4">
                                                    {encounter.notes || "No notes recorded."}
                                                </p>

                                                {encounter.vitals && Object.keys(encounter.vitals).length > 0 && (
                                                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-100 dark:border-gray-800">
                                                        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Vitals</h4>
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                                            {encounter.vitals.bpSystolic && (
                                                                <div>
                                                                    <span className="text-gray-500">BP:</span>{' '}
                                                                    <span className="font-medium">{encounter.vitals.bpSystolic}/{encounter.vitals.bpDiastolic} mmHg</span>
                                                                </div>
                                                            )}
                                                            {encounter.vitals.heartRate && (
                                                                <div>
                                                                    <span className="text-gray-500">HR:</span>{' '}
                                                                    <span className="font-medium">{encounter.vitals.heartRate} bpm</span>
                                                                </div>
                                                            )}
                                                            {encounter.vitals.respRate && (
                                                                <div>
                                                                    <span className="text-gray-500">RR:</span>{' '}
                                                                    <span className="font-medium">{encounter.vitals.respRate} /min</span>
                                                                </div>
                                                            )}
                                                            {encounter.vitals.tempC && (
                                                                <div>
                                                                    <span className="text-gray-500">Temp:</span>{' '}
                                                                    <span className="font-medium">{encounter.vitals.tempC} °C</span>
                                                                </div>
                                                            )}
                                                            {encounter.vitals.spo2 && (
                                                                <div>
                                                                    <span className="text-gray-500">SpO2:</span>{' '}
                                                                    <span className="font-medium">{encounter.vitals.spo2}%</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p>No encounters found matching your criteria.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Admit Patient Dialog */}
            <Dialog open={showAdmitDialog} onOpenChange={setShowAdmitDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Admit Patient</DialogTitle>
                        <DialogDescription>
                            Enter the admission details for {patient.firstName} {patient.lastName}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="assignedDoctor">Assigned Doctor *</Label>
                            <Input
                                id="assignedDoctor"
                                value={admitData.assignedDoctor}
                                onChange={(e) => setAdmitData({ ...admitData, assignedDoctor: e.target.value })}
                                placeholder="Dr. Smith"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="admissionType">Admission Type</Label>
                            <Input
                                id="admissionType"
                                value={admitData.admissionType}
                                onChange={(e) => setAdmitData({ ...admitData, admissionType: e.target.value })}
                                placeholder="Emergency, Elective, etc."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ward">Ward *</Label>
                            <Input
                                id="ward"
                                value={admitData.ward}
                                onChange={(e) => setAdmitData({ ...admitData, ward: e.target.value })}
                                placeholder="ICU, General, etc."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bedNumber">Bed Number *</Label>
                            <Input
                                id="bedNumber"
                                value={admitData.bedNumber}
                                onChange={(e) => setAdmitData({ ...admitData, bedNumber: e.target.value })}
                                placeholder="A-101"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAdmitDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAdmit} disabled={isAdmitting}>
                            {isAdmitting ? "Admitting..." : "Admit Patient"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ViewPatient;
