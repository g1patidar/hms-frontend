import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";

const ContactUs = () => {
    return (
        <div className="flex flex-col gap-16 pt-7 pb-16">


            <section className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-lg dark:bg-slate-800">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Phone</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Call us for appointments</p>
                                    <a href="tel:+917898972970" className="block text-blue-600 dark:text-blue-400 font-semibold hover:underline">+91-7898972970</a>
                                    <a href="tel:+917909808207" className="block text-blue-600 dark:text-blue-400 font-semibold hover:underline">+91-7909808207</a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg dark:bg-slate-800">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl text-teal-600 dark:text-teal-400">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Email</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">Send us your queries</p>
                                    <a href="mailto:deepakpatidar144@gmail.com" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline break-all">
                                        deepakpatidar144@gmail.com
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg dark:bg-slate-800">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl text-pink-600 dark:text-pink-400">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Location</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        Sanghai Plaza, near Dwarkapuri Dharamshala,<br />
                                        Manasa, Dist - Neemuch
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg dark:bg-slate-800">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl text-orange-600 dark:text-orange-400">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Clinic Hours</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        <span className="font-semibold">Morning:</span> 10:00 AM - 01:00 PM<br />
                                        <span className="font-semibold">Evening:</span> 04:00 PM - 07:00 PM<br />
                                        <span className="text-red-500 font-semibold mt-1 block">24/7 Emergency Services</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="border-none shadow-xl h-full dark:bg-slate-800">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                            <Input id="name" placeholder="John Doe" className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                                            <Input id="phone" placeholder="+91 98765 43210" className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                        <Input id="email" type="email" placeholder="john@example.com" className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                        <Input id="subject" placeholder="Appointment Request / Inquiry" className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                        <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800" />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                        <Send className="h-4 w-4" /> Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] bg-slate-100 w-full relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d320.95599143892156!2d75.13917559991275!3d24.47843861276921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3965dcc59e70df39%3A0xb8619b12233dbda3!2sManasa%2C%20Madhya%20Pradesh%20458110!5e0!3m2!1sen!2sin!4v1766405837838!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactUs;
