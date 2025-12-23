import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award, GraduationCap, Building2 } from "lucide-react";

const AboutUs = () => {
    const doctors = [
        {
            name: "Dr. Khushboo Patidar (PT)",
            role: "Consultant Physiotherapist",
            qualification: "BPT, MIAP, D.PHARMA",
            specialization: "Specialization in cupping, taping, dry needling",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
        },
        {
            name: "Deepak Patidar",
            role: "Nursing & Cosmetology Specialist",
            qualification: "Bsc, Msc Nursing (Pediatrics), PG Diploma In Cosmetology",
            specialization: "Advanced Cosmetic Treatments",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
        },
        {
            name: "Dr. Yashwant Patidar",
            role: "Orthopedic Specialist",
            qualification: "MS. Ortho",
            specialization: "Bone & Joint Care",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop"
        },
        {
            name: "Dr. Kamlesh Patidar",
            role: "General Physician",
            qualification: "MD. Medicine",
            specialization: "Internal Medicine",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <div className="flex flex-col gap-16 pt-7 pb-16">

            {/* Mission & Vision */}
            <section className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-square">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <Building2 className="h-10 w-10 mb-4 text-teal-400" />
                                <h3 className="text-2xl font-bold mb-2">State-of-the-art Facility</h3>
                                <p className="text-slate-200">Equipped with modern technology for the best patient outcomes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                To provide accessible, high-quality healthcare services that improve the quality of life for our community. We strive to combine traditional medical values with modern technology to deliver the best possible care.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Us?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Experienced Specialists</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">Our team consists of highly qualified and experienced doctors and therapists.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-teal-100 p-2 rounded-lg text-teal-600 mt-1">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Comprehensive Care</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">From physiotherapy to cosmetic treatments, we cover a wide range of medical needs.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-pink-100 p-2 rounded-lg text-pink-600 mt-1">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-white">Patient-Centric Approach</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">We treat every patient with personalized care and attention.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-4 bg-slate-50 dark:bg-slate-900 py-16 rounded-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Meet Our Expert Team</h2>
                    <p className="text-slate-600 dark:text-slate-300">The dedicated professionals behind your care.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {doctors.map((doctor, index) => (
                        <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group dark:bg-slate-800">
                            <div className="aspect-[3/4] overflow-hidden relative bg-slate-200 dark:bg-slate-700">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <p className="text-white text-sm font-medium">{doctor.specialization}</p>
                                </div>
                            </div>
                            <CardContent className="p-5 text-center">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{doctor.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{doctor.role}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">{doctor.qualification}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
