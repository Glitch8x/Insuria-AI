import React, { useState } from 'react';
import { Camera, RefreshCw, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { analyzeDamage } from '../services/groq';
import FadeIn from '../components/animations/FadeIn';
import { useClaims } from '../context/ClaimsContext';
import { useNavigate } from 'react-router-dom';

const Assessor = () => {
    const [step, setStep] = useState('upload'); // upload, scanning, results
    const [selectedImage, setSelectedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const { addClaim } = useClaims();
    const navigate = useNavigate();

    const handleProceedToClaim = () => {
        if (!analysisResult) return;

        addClaim({
            vehicle: analysisResult.vehicle || "Toyota Camry 2018",
            incident: analysisResult.risk_title || "Accidental Damage",
            estimate: analysisResult.total_estimate,
            parts: analysisResult.parts
        });

        navigate('/dashboard/claims');
    };

    const processFile = async (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64Image = reader.result;
                setSelectedImage(base64Image);
                setStep('scanning');
                setIsAnalyzing(true);

                try {
                    // Call Real AI Service
                    const result = await analyzeDamage(base64Image);
                    setAnalysisResult(result);
                    setStep('results');
                } catch (error) {
                    console.error("Analysis Failed", error);
                    alert(`Analysis failed: ${error.message}`);
                    setStep('upload');
                    setSelectedImage(null);
                } finally {
                    setIsAnalyzing(false);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    };

    const reset = () => {
        setStep('upload');
        setSelectedImage(null);
        setAnalysisResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">AI Damage Assessor</h1>
                <p className="text-slate-500">Upload a photo of the damage to get an instant repair estimate.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column: Image Area */}
                <Card
                    className={`relative aspect-[4/3] flex items-center justify-center bg-slate-100 overflow-hidden border-2 border-dashed transition-colors duration-200 ${isDragging ? 'border-green-500 bg-green-50' : 'border-slate-300'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {step === 'upload' && (
                        <div className="text-center space-y-4 pointer-events-none">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-400">
                                <Camera className="w-8 h-8" />
                            </div>
                            <div className="pointer-events-auto">
                                <label htmlFor="file-upload" className="cursor-pointer inline-block">
                                    <Button as="span" variant="primary">
                                        <Upload className="w-4 h-4 mr-2" /> Upload Photo
                                    </Button>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleUpload}
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-slate-400">
                                Drag & Drop or Click to Upload<br />
                                Supports JPG, PNG (Max 5MB)
                            </p>
                        </div>
                    )}

                    {step !== 'upload' && selectedImage && (
                        <>
                            <img src={selectedImage} alt="Damage Analysis" className="w-full h-full object-cover" />
                            {step === 'scanning' && (
                                <div
                                    className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-10 animate-[spin_2s_linear_infinite]"
                                    style={{
                                        top: '0%',
                                        animation: 'scan 2s linear infinite'
                                    }}
                                />
                            )}
                            <style>{`
                @keyframes scan {
                  0% { top: 0%; }
                  100% { top: 100%; }
                }
              `}</style>
                        </>
                    )}
                </Card>

                {/* Right Column: Results & Info */}
                <div className="space-y-6">
                    {step === 'upload' && (
                        <Card className="h-full flex flex-col justify-center space-y-6 text-slate-600">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-100 rounded-lg text-green-700 mt-1">
                                    <Camera className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">1. Snap Photo</h3>
                                    <p className="text-sm">Take a clear picture of the affected area.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-700 mt-1">
                                    <RefreshCw className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">2. AI Analysis</h3>
                                    <p className="text-sm">Our vision model identifies parts and damage severity.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-700 mt-1">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">3. Instant Estimate</h3>
                                    <p className="text-sm">Get costs based on current localized African market prices.</p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {step === 'scanning' && (
                        <Card className="h-full flex flex-col items-center justify-center space-y-4">
                            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                            <p className="font-medium text-slate-600 animate-pulse">Analyzing damage structure...</p>
                        </Card>
                    )}

                    {step === 'results' && analysisResult && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="bg-red-50 border-red-100">
                                <div className="flex items-start gap-3 text-red-700">
                                    <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold">{analysisResult.risk_title}</h3>
                                        <p className="text-sm mt-1">{analysisResult.risk_description}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <h3 className="font-bold text-slate-900 mb-4">Repair Estimate</h3>
                                <div className="space-y-3">
                                    {analysisResult.parts.map((part, index) => (
                                        <div key={index} className="flex justify-between items-center pb-2 border-b border-slate-100">
                                            <span className="text-slate-600">{part.name}</span>
                                            <span className="font-semibold">{part.cost}</span>
                                        </div>
                                    ))}

                                    <div className="flex justify-between items-center pt-2 text-lg">
                                        <span className="font-bold text-slate-900">Total Estimate</span>
                                        <span className="font-bold text-green-700">{analysisResult.total_estimate}</span>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-2">
                                    <Button className="w-full" onClick={handleProceedToClaim}>Proceed to Claim</Button>
                                    <Button variant="outline" className="w-full" onClick={reset}>Scan Another</Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assessor;
