import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, Mail, Github } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import logo from '../assets/logo.jpg';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-700 p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 100, 0],
                    y: [0, -50, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-3xl"
            />

            <Card className="max-w-md w-full relative z-10 bg-white shadow-2xl shadow-green-900/20 border-none">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center shadow-inner mx-auto mb-4 overflow-hidden"
                        >
                            <img
                                src={logo}
                                alt="Insuria Logo"
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 mt-2">Sign in to your Insuria account</p>
                        <Link to="/" className="inline-block mt-3 text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                            ← Back to Home
                        </Link>
                    </motion.div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <motion.div variants={itemVariants} className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                            <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex justify-end pt-1">
                                <a href="#" className="text-xs font-medium text-green-600 hover:text-green-700 transition-colors">Forgot password?</a>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full text-lg h-12 shadow-xl shadow-green-500/20 bg-green-600 hover:bg-green-700 text-white border-none"
                                isLoading={isLoading}
                            >
                                Sign In <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500 rounded">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl bg-white transition-colors text-slate-600 font-medium text-sm hover:border-slate-300"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.17c-.22-.66-.35-1.36-.35-2.17s.13-1.51.35-2.17V7.01H2.18C.8 9.87.8 13.91 2.18 16.74l3.66-2.57z" fill="#FBBC05" />
                                    <path d="M12 4.81c1.61 0 3.09.56 4.13 1.57l3.1-3.1C17.45 1.53 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.01l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl bg-white transition-colors text-slate-600 font-medium text-sm hover:border-slate-300"
                            >
                                <Github className="w-5 h-5 mr-2 text-slate-800" />
                                GitHub
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account? <Link to="/signup" className="font-semibold text-green-600 hover:text-green-700 transition-colors">Create account</Link>
                    </motion.p>
                </motion.div>
            </Card>
        </div>
    );
};

export default Login;
