import React, { useState } from 'react';
import { ShoppingBag, Star, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import clsx from 'clsx';
import FadeIn from '../components/animations/FadeIn';

const INSURERS = [
    {
        name: "Leadway Assurance",
        price: 15000,
        rating: 4.8,
        reviews: "2.4k",
        payoutSpeed: "24 Hours",
        bestFor: "Comprehensive Auto",
        popular: true,
        link: "https://www.leadway.com/"
    },
    {
        name: "AXA Mansard",
        price: 18500,
        rating: 4.7,
        reviews: "3.1k",
        payoutSpeed: "48 Hours",
        bestFor: "Health & Life",
        popular: false,
        link: "https://www.axamansard.com/"
    },
    {
        name: "AIICO Insurance",
        price: 12000,
        rating: 4.5,
        reviews: "1.8k",
        payoutSpeed: "3-5 Days",
        bestFor: "Budget Options",
        popular: false,
        link: "https://www.aiicoplc.com/"
    },
    {
        name: "Mutual Benefits",
        price: 9500,
        rating: 4.2,
        reviews: "950",
        payoutSpeed: "5 Days",
        bestFor: "Micro-Insurance",
        popular: false,
        link: "https://www.mutualbenefitsassurance.com/"
    }
];

const InsurerCard = ({ name, price, rating, reviews, payoutSpeed, bestFor, popular, link }) => (
    <Card className={clsx("relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mb-4", popular && "border-2 border-green-500 shadow-md shadow-green-100")}>
        {popular && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                Most Popular
            </div>
        )}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xl">
                    {name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold text-slate-900">{rating}</span>
                        <span className="text-slate-400 font-normal">({reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-500">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">Best for: {bestFor}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full md:w-auto">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold">Payout Speed</p>
                        <p className="font-bold text-slate-900">{payoutSpeed}</p>
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Starting From</p>
                    <p className="text-2xl font-bold text-green-700">₦{price.toLocaleString()}<span className="text-sm font-normal text-slate-400">/mo</span></p>
                </div>

                <a href={link} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                    <Button className="w-full md:w-auto">
                        View Plan <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </a>
            </div>
        </div>
    </Card>
);

const Marketplace = () => {
    const [sort, setSort] = useState('popular');

    const sortedInsurers = [...INSURERS].sort((a, b) => {
        if (sort === 'cheapest') return a.price - b.price;
        if (sort === 'fastest') return parseInt(a.payoutSpeed) - parseInt(b.payoutSpeed); // Simplified sort
        return 0; // Default (Popular) - keep original order
    });

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            <FadeIn>
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900">Agency Marketplace</h1>
                    <p className="text-slate-500">Compare top insurers across the African market side-by-side.</p>
                </div>
            </FadeIn>

            {/* Filters */}
            <FadeIn delay={0.1}>
                <div className="flex overflow-x-auto gap-2 pb-2">
                    <Button
                        size="sm"
                        variant={sort === 'popular' ? 'primary' : 'outline'}
                        onClick={() => setSort('popular')}
                        className="whitespace-nowrap"
                    >
                        Most Popular
                    </Button>
                    <Button
                        size="sm"
                        variant={sort === 'fastest' ? 'primary' : 'outline'}
                        onClick={() => setSort('fastest')}
                        className="whitespace-nowrap"
                    >
                        Fastest Payouts
                    </Button>
                    <Button
                        size="sm"
                        variant={sort === 'cheapest' ? 'primary' : 'outline'}
                        onClick={() => setSort('cheapest')}
                        className="whitespace-nowrap"
                    >
                        Lowest Price
                    </Button>
                </div>
            </FadeIn>

            <div className="space-y-4">
                {sortedInsurers.map((insurer, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                        <InsurerCard {...insurer} />
                    </FadeIn>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;
