import React, { useState, useEffect, useRef } from 'react';
import {
    ShieldCheck, Menu, X, ArrowRight, Twitter, Facebook, Instagram, Linkedin,
    Zap, Globe, Cpu, Heart, Car, HelpCircle, ChevronDown, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Reveal Hook
const useReveal = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
};

const SectionReveal = ({ children, className = "" }) => {
    const [ref, isVisible] = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${className} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
        >
            {children}
        </div>
    );
};

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    const assets = [
        { title: "Renewable Energy", icon: Zap, pool: "v1.2B", yield: "12%", color: "text-yellow-400" },
        { title: "Tech Infrastructure", icon: Cpu, pool: "v3.4B", yield: "15%", color: "text-blue-400" },
        { title: "Global Logisitics", icon: Globe, pool: "v850M", yield: "11%", color: "text-green-400" },
        { title: "Health Innovation", icon: Heart, pool: "v2.1B", yield: "18%", color: "text-red-400" },
        { title: "Smart Mobility", icon: Car, pool: "v1.1B", yield: "14%", color: "text-emerald-400" },
    ];

    const steps = [
        { title: "Scan", desc: "Our AI assesses your assets or documents in seconds.", icon: ShieldCheck },
        { title: "Predict", desc: "Risk models calculate the most fair and transparent pricing.", icon: Cpu },
        { title: "Secure", desc: "Instant protection with automated smart-contract payouts.", icon: CheckCircle2 },
    ];

    const faqs = [
        { q: "How does the AI assessment work?", a: "Insuria uses advanced computer vision to analyze damage photos and natural language processing to summarize complex policy documents instantly." },
        { q: "What markets does Insuria cover?", a: "Insuria covers the broad African market, providing localized expertise and indigenous language support for AI interactions across the continent." },
        { q: "Are payouts really automated?", a: "Yes, our Smart Claims Vault uses verified data triggers to release funds instantly upon claim approval, bypassing traditional bureaucracy." }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-green-500 selection:text-white overflow-x-hidden scroll-smooth">
            {/* Floating Navbar */}
            <div className="fixed top-6 left-0 w-full z-50 px-4 flex justify-center">
                <nav className="w-full max-w-6xl bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl py-1.5 px-6">
                    <div className="flex items-center justify-between h-12 md:h-14">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <ShieldCheck className="text-white w-5 h-5" />
                            </div>
                            <span className="text-lg md:text-xl font-bold tracking-tight">Insuria</span>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-sm font-medium text-slate-200 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Home</a>
                            <a href="#assets" className="text-sm font-medium text-slate-200 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Our Assets</a>
                            <a href="#about" className="text-sm font-medium text-slate-200 hover:text-white transition-colors uppercase tracking-widest text-[10px]">How it Works</a>
                            <a href="#faq" className="text-sm font-medium text-slate-200 hover:text-white transition-colors uppercase tracking-widest text-[10px]">FAQ</a>
                        </div>

                        {/* Launch App Button */}
                        <div className="hidden md:block">
                            <Link to="/login">
                                <button className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-2 rounded-2xl font-bold text-xs transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider">
                                    Launch App
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-200 hover:text-white">
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 space-y-2 border-t border-white/5 mt-2 animate-in slide-in-from-top-2">
                            <a href="#" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-xl">Home</a>
                            <a href="#assets" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-xl">Our Assets</a>
                            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-xl">About Us</a>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-green-400 hover:bg-white/5 rounded-xl">Launch App</Link>
                        </div>
                    )}
                </nav>
            </div>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 scale-110">
                    <img
                        src="/hero-bg-v4.jpg"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 space-y-12 transition-all duration-1000 animate-in fade-in zoom-in-95">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1]">
                        Investing in <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Resilient Futures</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        The world's first AI-driven insurance protocol. Transparent, instant, and borderless protection for everyone.
                    </p>

                    <div className="flex justify-center">
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-2 rounded-[2rem] md:rounded-[4rem] shadow-2xl inline-flex items-center gap-4 group hover:border-green-500/30 transition-all duration-500">
                            <span className="hidden md:block pl-8 text-sm font-medium text-slate-400 group-hover:text-slate-200">Start your smart protection journey</span>
                            <Link to="/login">
                                <button className="px-10 py-4 bg-green-500 text-white rounded-[1.5rem] md:rounded-[3.5rem] font-bold hover:bg-green-400 transition-all transform hover:scale-105 shadow-2xl shadow-green-500/40">
                                    Launch Pad <ArrowRight className="inline-block ml-2 w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Our Assets Section */}
            <section id="assets" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionReveal className="mb-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Our Insurance Pools</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Diverse, verified, and high-performance risk pools powered by smart contracts.</p>
                    </SectionReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {assets.map((asset, i) => (
                            <SectionReveal key={i} className={`delay-[${i * 100}ms]`}>
                                <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-green-500/50">
                                    <div className={`p-4 rounded-2xl bg-slate-900 inline-block mb-8 ${asset.color}`}>
                                        <asset.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{asset.title}</h3>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Value</p>
                                            <p className="text-2xl font-mono text-white">{asset.pool}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Efficiency</p>
                                            <p className="text-2xl font-mono text-green-400">{asset.yield}</p>
                                        </div>
                                    </div>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section id="about" className="py-32 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionReveal className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">How Insuria Works</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">From interaction to protection in three seamless steps.</p>
                    </SectionReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-24 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent z-0"></div>

                        {steps.map((step, i) => (
                            <SectionReveal key={i} className="text-center relative z-10">
                                <div className="w-20 h-20 bg-green-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20 transform group-hover:rotate-12 transition-transform">
                                    <step.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-32">
                <div className="max-w-4xl mx-auto px-4">
                    <SectionReveal className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Common Questions</h2>
                    </SectionReveal>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <SectionReveal key={i}>
                                <div
                                    className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === i ? 'ring-2 ring-green-500/50' : ''}`}
                                >
                                    <button
                                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                        className="w-full p-6 text-left flex justify-between items-center group"
                                    >
                                        <span className="text-lg font-medium group-hover:text-green-400 transition-colors">{faq.q}</span>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                                        <div className="p-6 pt-0 text-slate-400 border-t border-white/5 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32">
                <div className="max-w-5xl mx-auto px-4">
                    <SectionReveal className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-green-600/20">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl md:text-7xl font-black">Ready to secure?</h2>
                            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">Join the future of insurance on-chain. Zero paperwork, 100% intelligence.</p>
                            <Link to="/signup">
                                <button className="px-12 py-5 bg-white text-green-700 rounded-full font-bold text-xl hover:bg-slate-100 transition-all transform hover:scale-110 shadow-xl">
                                    Create Free Account
                                </button>
                            </Link>
                        </div>
                    </SectionReveal>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 py-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-500 w-8 h-8" />
                            <span className="text-2xl font-black">Insuria</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">Accelerating the transition to a safer, more transparent world through AI and blockchain.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-white transition-colors">Our Assets</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Yield Pools</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">DEX Swap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-bold">Community</h4>
                        <div className="flex gap-6">
                            <Twitter className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
                            <Linkedin className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
                            <Instagram className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-white/5 text-center text-slate-600 text-xs">
                    © 2026 Insuria AI Protocol. Built for a resilient tomorrow.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
