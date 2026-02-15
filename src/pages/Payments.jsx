import React, { useState } from 'react';
import { Calendar, CreditCard, Clock, Bell, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import clsx from 'clsx';

const PlanOption = ({ period, price, selected, onSelect }) => (
    <div
        onClick={onSelect}
        className={clsx(
            "cursor-pointer border-2 rounded-xl p-4 transition-all relative",
            selected
                ? "border-green-600 bg-green-50"
                : "border-slate-200 hover:border-green-200"
        )}
    >
        {selected && (
            <div className="absolute top-2 right-2 text-green-600">
                <Check className="w-5 h-5" />
            </div>
        )}
        <h3 className="font-semibold text-slate-900 capitalize">{period}</h3>
        <p className="text-2xl font-bold text-slate-800 mt-2">₦{price.toLocaleString()}</p>
        <p className="text-xs text-slate-500 mt-1">/{period}</p>
    </div>
);

const Payments = () => {
    const [plan, setPlan] = useState('monthly');

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Payments & Calendar</h1>
                    <p className="text-slate-500">Flexible schedules that fit your income flow.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Payment Settings */}
                <div className="space-y-6">
                    <Card>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5" /> Payment Schedule
                        </h2>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <PlanOption
                                period="daily"
                                price="500"
                                selected={plan === 'daily'}
                                onSelect={() => setPlan('daily')}
                            />
                            <PlanOption
                                period="weekly"
                                price="3,200"
                                selected={plan === 'weekly'}
                                onSelect={() => setPlan('weekly')}
                            />
                            <PlanOption
                                period="monthly"
                                price="12,500"
                                selected={plan === 'monthly'}
                                onSelect={() => setPlan('monthly')}
                            />
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Next Payment Due</p>
                                <p className="text-xs text-slate-500">Auto-debit from card ending in 4242</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900">Feb 28, 2026</p>
                                <p className="text-xs text-green-600">Active</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button className="w-full">Update Payment Method</Button>
                        </div>
                    </Card>
                </div>

                {/* Policy Calendar */}
                <div className="space-y-6">
                    <Card className="h-full">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" /> Policy Calendar
                        </h2>
                        <div className="relative border-l border-slate-200 ml-3 space-y-8 py-2">
                            <div className="pl-6 relative">
                                <div className="absolute -left-1.5 top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow"></div>
                                <h4 className="text-sm font-bold text-slate-900">Policy Renewal due</h4>
                                <p className="text-xs text-slate-500 mt-1">March 01, 2026</p>
                                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-100">
                                    <Bell className="w-3 h-3" /> Reminder set for Feb 22
                                </div>
                            </div>

                            <div className="pl-6 relative opacity-50">
                                <div className="absolute -left-1.5 top-1 w-3 h-3 bg-slate-300 rounded-full border-2 border-white"></div>
                                <h4 className="text-sm font-medium text-slate-900">Vehicle Inspection</h4>
                                <p className="text-xs text-slate-500 mt-1">June 15, 2026</p>
                            </div>
                        </div>

                        <div className="mt-8 bg-green-50 p-4 rounded-xl flex gap-3 text-green-800">
                            <Clock className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">
                                <strong>Don't get caught!</strong> We automatically sync renewal dates to your phone calendar so you never drive with expired papers.
                            </p>
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" className="w-full">Sync to Google Calendar</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Payments;
