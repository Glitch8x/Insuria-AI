import React from 'react';
import { ShieldCheck, MessageSquareText, Camera, FileText, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import FadeIn from '../components/animations/FadeIn';

const FeatureCard = ({ icon: Icon, title, desc, to, color = "green" }) => (
    <Link to={to} className="block h-full">
        <Card hover className="h-full flex flex-col justify-between">
            <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${color}-100 text-${color}-600`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
            <div className="mt-6 flex items-center text-green-600 font-medium text-sm group">
                Try Now <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
        </Card>
    </Link>
);

const Home = () => {
    return (
        <div className="space-y-12 pb-20">
            {/* Hero Section */}
            <FadeIn>
                <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 border border-slate-200 text-slate-900 p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-xl transition-colors duration-300">
                    <div className="relative z-10 max-w-2xl space-y-6">
                        <div className="inline-flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full text-sm font-medium border border-green-100 text-green-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>AI-Powered Insurance for Everyone</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                            Smart Protection for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Your Life</span>
                        </h1>

                        <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                            From instant damage estimates to plain-English policy advice. Insuria uses AI to make insurance simple, transparent, and fair.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/dashboard/advisor">
                                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white border-0">
                                    Talk to Advisor
                                </Button>
                            </Link>
                            <Link to="/dashboard/marketplace">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-200 hover:bg-slate-50">
                                    Compare Quotes
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
                </section>
            </FadeIn>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FadeIn delay={0.1} className="h-full">
                    <FeatureCard
                        to="/dashboard/advisor"
                        icon={MessageSquareText}
                        title="Insurance Sense"
                        desc="AI explains policies in Pidgin, Yoruba, Hausa or Igbo. Upload documents for instant summaries."
                    />
                </FadeIn>
                <FadeIn delay={0.2} className="h-full">
                    <FeatureCard
                        to="/dashboard/assessor"
                        icon={Camera}
                        title="Damage Assessor"
                        desc="Scan car damage with your camera. Get instant repair estimates based on local market prices."
                    />
                </FadeIn>
                <FadeIn delay={0.3} className="h-full">
                    <FeatureCard
                        to="/dashboard/claims"
                        icon={FileText}
                        title="Smart Claims"
                        desc="One-click claim filing with fraud prevention. Document vault for all your papers."
                    />
                </FadeIn>
                <FadeIn delay={0.4} className="h-full">
                    <FeatureCard
                        to="/dashboard/marketplace"
                        icon={ShoppingBag}
                        title="Agency Marketplace"
                        desc="Compare top insurers like AXA & Leadway by real user ratings on payout speed."
                    />
                </FadeIn>
            </section>
        </div>
    );
};

export default Home;
