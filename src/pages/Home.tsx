import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Activity, Sparkles, Stethoscope, Clock, ShieldCheck, HeartPulse, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20 md:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/50 to-transparent dark:from-blue-900/20 rounded-l-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-teal-100/50 to-transparent dark:from-teal-900/20 rounded-r-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            24/7 Emergency Services Available
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                            Advanced Care for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400">
                                Your Health & Beauty
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                            Shree Ram Physiotherapy, Cosmetic & Nursing Clinic provides world-class treatments with a personal touch. From physiotherapy to advanced cosmetic procedures.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/contact">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-blue-600/20">
                                    Book Appointment
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button size="lg" variant="outline" className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full px-8 h-12 text-base">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative animate-in slide-in-from-right-10 duration-700 fade-in delay-200 hidden md:block">
                        {/* Abstract visual representation since we don't have the image asset */}
                        <div className="relative z-10 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')] bg-cover bg-center opacity-90 hover:scale-105 transition-transform duration-700"></div>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Dr. Khushboo Patidar</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Consultant Physiotherapist</p>
                                    </div>
                                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 p-3 rounded-xl">
                                    <Clock className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                                    <span>10:00 AM - 01:00 PM | 04:00 PM - 07:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-10 -right-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Experience</p>
                                    <p className="font-bold text-slate-900 dark:text-white">Top Rated</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Premium Services</h2>
                    <p className="text-slate-600 dark:text-slate-300">We offer a comprehensive range of treatments designed to help you look and feel your best.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Cosmetic */}
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden dark:bg-slate-800">
                        <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500" />
                        <CardHeader>
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-600 dark:text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl dark:text-white">Cosmetic Treatments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Laser Treatment</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-400" /> PRP (Face & Hair)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Hydra Facial</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Tattoo Removal</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Skin Rejuvenation</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Acne Treatment</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Physiotherapy */}
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden dark:bg-slate-800">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <CardHeader>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                                <Activity className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl dark:text-white">Physiotherapy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Back, Knee & Neck Pain</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Sprain & Strain</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Post Surgical Rehab</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Sciatica & Arthritis</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Stroke & Paralysis</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Pediatric Physiotherapy</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* General */}
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden dark:bg-slate-800">
                        <div className="h-2 bg-gradient-to-r from-teal-500 to-emerald-500" />
                        <CardHeader>
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl dark:text-white">General Treatment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Cold, Cough & Fever</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Dengue, Malaria, Typhoid</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> BP & Sugar Management</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> ECG Services</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Home Care Available</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Health Check-ups</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 mt-8">
                <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to prioritize your health?</h2>
                        <p className="text-slate-300 text-lg">
                            Book an appointment with our expert doctors today and experience the best medical care.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link to="/contact">
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 h-12 text-base">
                                    Contact Us Now
                                </Button>
                            </Link>
                            <a href="tel:+917898972970">
                                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 hover:text-white rounded-full px-8 h-12 text-base">
                                    <Phone className="mr-2 h-4 w-4" /> Call +91-7898972970
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
