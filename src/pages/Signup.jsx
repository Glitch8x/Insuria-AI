import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, Mail, User, Github } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Save token (mock)
            localStorage.setItem('insuria_auth', 'true');
            // Navigate to dashboard
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-slate-900 p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

            <Card className="max-w-md w-full relative z-10 glass border-t-white/20 border-l-white/20 shadow-2xl shadow-black/40">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 mx-auto mb-4">
                        <ShieldCheck className="text-white w-9 h-9" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
                    <p className="text-slate-500 mt-2">Join Insuria for smart protection</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full text-lg h-12 shadow-xl shadow-green-600/30 mt-2" isLoading={isLoading}>
                        Get Started <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white/80 px-2 text-slate-500 backdrop-blur-sm rounded">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors text-slate-600 font-medium text-sm">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.17c-.22-.66-.35-1.36-.35-2.17s.13-1.51.35-2.17V7.01H2.18C.8 9.87.8 13.91 2.18 16.74l3.66-2.57z" fill="#FBBC05" />
                                <path d="M12 4.81c1.61 0 3.09.56 4.13 1.57l3.1-3.1C17.45 1.53 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.01l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors text-slate-600 font-medium text-sm">
                            <Github className="w-5 h-5 mr-2 text-slate-800" />
                            GitHub
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="font-semibold text-green-600 hover:text-green-700">Sign in</Link>
                </p>
            </Card>
        </div>
    );
};

export default Signup;
