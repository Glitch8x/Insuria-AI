import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShieldCheck, MessageSquareText, Camera, FileText, CreditCard, ShoppingBag, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label, end, onClick }) => (
    <NavLink
        to={to}
        end={end}
        onClick={onClick}
        className={({ isActive }) =>
            clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative group",
                isActive
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )
        }
    >
        {({ isActive }) => (
            <>
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-green-600 rounded-r-lg shadow-[2px_0_10px_rgba(22,163,74,0.4)]" />
                )}
                <Icon className={clsx("w-5 h-5 transition-transform duration-300", isActive ? "text-green-600 scale-110" : "group-hover:scale-110")} />
                <span className="font-medium">{label}</span>
            </>
        )}
    </NavLink >
);

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { to: "/dashboard", icon: ShieldCheck, label: "Home", end: true },
        { to: "/dashboard/advisor", icon: MessageSquareText, label: "Insurance Sense" },
        { to: "/dashboard/assessor", icon: Camera, label: "Damage Assessor" },
        { to: "/dashboard/claims", icon: FileText, label: "Smart Claims" },
        { to: "/dashboard/payments", icon: CreditCard, label: "Payments" },
        { to: "/dashboard/marketplace", icon: ShoppingBag, label: "Marketplace" },
    ];

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans transition-colors duration-300">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full p-4 z-20 shadow-xl transition-colors duration-300">
                <div className="flex items-center justify-between px-4 py-6 mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center shadow-lg shadow-green-600/30">
                            <ShieldCheck className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Insuria AI</h1>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavItem key={item.to} {...item} />
                    ))}
                </nav>

                <div className="p-4 mt-auto space-y-4">


                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm group hover:border-green-200 transition-colors">
                        <p className="text-sm font-bold text-slate-800 mb-1">Need specific help?</p>
                        <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-semibold">24/7 Premium Support</p>
                        <button className="text-xs bg-white border border-slate-200 hover:border-green-200 hover:text-green-600 px-3 py-2 rounded-lg transition-all w-full text-center font-bold shadow-sm">
                            Contact Support →
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md z-30 px-4 py-3 flex justify-between items-center border-b border-slate-200 transition-colors duration-300">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                        <ShieldCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900">Insuria</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-20 pt-20 px-4 md:hidden animate-in slide-in-from-top-10 duration-200">
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <NavItem key={item.to} {...item} onClick={() => setIsMobileMenuOpen(false)} />
                        ))}
                    </nav>
                </div>
            )}


            {/* Main Content Area */}
            <main className="flex-1 overflow-auto w-full relative z-10 pt-16 md:pt-0">
                <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
