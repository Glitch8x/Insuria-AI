import React, { useRef } from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, Plus, FolderLock, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import clsx from 'clsx';
import FadeIn from '../components/animations/FadeIn';
import { useClaims } from '../context/ClaimsContext';
import { useNavigate } from 'react-router-dom';

const DocumentItem = ({ name, type, date, status }) => {
    const handleDownload = () => {
        // Create dummy content
        const content = `This is a placeholder content for ${name}.\nType: ${type}\nUploaded: ${date}\nStatus: ${status}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        // Create invisible link and trigger click
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.replace(/\s+/g, '_')}.txt`; // simple sanitization
        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-medium text-slate-900">{name}</h4>
                    <p className="text-xs text-slate-500">{type} • Uploaded {date}</p>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                {status === 'verified' ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                ) : (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                )}
                <button
                    onClick={handleDownload}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
                    title="Download Document"
                >
                    <Download className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const TimelineItem = ({ title, date, status, isLast }) => {
    const statusColors = {
        completed: "bg-green-500",
        current: "bg-blue-500",
        pending: "bg-slate-300",
    };

    return (
        <div className="relative pl-8 pb-8">
            {!isLast && <div className="absolute left-[11px] top-3 h-full w-0.5 bg-slate-200"></div>}
            <div className={clsx(
                "absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10",
                statusColors[status]
            )}></div>
            <div>
                <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
                <p className="text-xs text-slate-500 mt-1">{date}</p>
            </div>
        </div>
    );
};

const Claims = () => {
    const { documents, activeClaim, addDocument } = useClaims();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            addDocument(file);
        }
    };

    return (
        <div className="space-y-8">
            <FadeIn>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Smart Claims Vault</h1>
                        <p className="text-slate-500">Manage your documents and track your claims in real-time.</p>
                    </div>
                    <Button onClick={() => navigate('/dashboard/assessor')}>
                        <Plus className="w-5 h-5 mr-2" /> Start New Claim
                    </Button>
                </div>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Document Vault Section */}
                <div className="lg:col-span-2 space-y-6">
                    <FadeIn delay={0.1} className="w-full">
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <FolderLock className="w-5 h-5 text-slate-400" /> My Documents
                                </h2>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <Button size="sm" variant="outline" onClick={handleUploadClick}>Upload New</Button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {documents.length > 0 ? (
                                    documents.map(doc => (
                                        <DocumentItem
                                            key={doc.id}
                                            name={doc.name}
                                            type={doc.type}
                                            date={doc.date}
                                            status={doc.status}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                                        <p className="text-slate-400">No documents uploaded yet.</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl h-fit">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-900">Fraud Protection Active</h3>
                                    <p className="text-sm text-blue-700 mt-1 leading-relaxed">
                                        Your claims are secured with Geofencing and Metadata Analysis.
                                        Always ensure photos are taken at the incident scene to speed up verification.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </FadeIn>
                </div>

                {/* Claim Status Section */}
                <div className="space-y-6">
                    <FadeIn delay={0.3}>
                        <Card>
                            <h2 className="text-xl font-bold text-slate-900 mb-6">
                                {activeClaim ? `Active Claim #${activeClaim.claimNumber}` : 'No Active Claim'}
                            </h2>

                            {activeClaim ? (
                                <>
                                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-medium text-slate-500 uppercase">Vehicle</span>
                                            <span className="text-xs font-bold text-slate-900 bg-white px-2 py-1 rounded border">
                                                {activeClaim.vehicle}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <span className="text-xs font-medium text-slate-500 uppercase">Incident</span>
                                            <span className="text-xs font-medium text-slate-700">
                                                {activeClaim.incident}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <TimelineItem
                                            title="Claim Submitted"
                                            date={activeClaim.date}
                                            status="completed"
                                        />
                                        <TimelineItem
                                            title="AI Assessment Verified"
                                            date="Verified"
                                            status="completed"
                                        />
                                        <TimelineItem
                                            title="Insurer Review"
                                            date="In Progress"
                                            status="current"
                                        />
                                        <TimelineItem
                                            title="Payout Approved"
                                            date="Estimated"
                                            status="pending"
                                            isLast
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-4">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No claims in progress</p>
                                    <p className="text-xs text-slate-400 mt-1 mb-6">Start a new assessment to file a claim.</p>
                                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/assessor')}>
                                        Go to Assessor
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default Claims;
