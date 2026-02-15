import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, FileText, Globe, Volume2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import clsx from 'clsx';
import { getGroqResponse } from '../services/groq';
import { speakNative } from '../services/voice';
import FadeIn from '../components/animations/FadeIn';

const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pcm', name: 'Pidgin', flag: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', flag: '🦁' },
    { code: 'ha', name: 'Hausa', flag: '🦅' },
    { code: 'ig', name: 'Igbo', flag: '🐆' },
];

const Advisor = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your Insurance Sense Advisor. You fit upload your policy paper or ask me any question about insurance across Africa. How I fit help you today?", sender: 'ai', lang: 'pcm' }
    ]);
    const [input, setInput] = useState('');
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[1]); // Default Pidgin
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Fetch Real AI Response from Groq
        const responseText = await getGroqResponse(input, selectedLang.name);

        const aiMsg = { id: Date.now() + 1, text: responseText, sender: 'ai' };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
            {/* Sidebar / Info Panel */}
            <FadeIn direction="left" className="w-full md:w-80">
                <div className="space-y-4">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                        <h2 className="font-bold text-green-800 flex items-center gap-2 mb-2">
                            <Globe className="w-5 h-5" /> Language
                        </h2>
                        <div className="grid grid-cols-2 gap-2">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setSelectedLang(lang)}
                                    className={clsx(
                                        "p-2 rounded-lg text-sm text-left transition-colors flex items-center gap-2",
                                        selectedLang.code === lang.code
                                            ? "bg-green-600 text-white shadow-md"
                                            : "bg-white hover:bg-green-100 text-slate-700"
                                    )}
                                >
                                    <span>{lang.flag}</span>
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-semibold text-slate-700 mb-3">Quick Actions</h3>
                        <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start text-left h-auto py-3">
                                <FileText className="w-4 h-4 mr-2" />
                                <div>
                                    <span className="block font-medium">Upload Policy</span>
                                    <span className="block text-xs text-slate-500">Get 5-point summary</span>
                                </div>
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                                "What is covered?"
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                                "How to claim?"
                            </Button>
                        </div>
                    </Card>
                </div>
            </FadeIn>

            {/* Chat Area */}
            <FadeIn direction="up" delay={0.2} className="flex-1 h-full">
                <Card className="flex flex-col p-4 md:p-6 h-full relative overflow-hidden bg-slate-50/50">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={clsx(
                                    "flex w-full",
                                    msg.sender === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={clsx(
                                        "max-w-[80%] rounded-2xl px-5 py-3 shadow-sm text-sm md:text-base leading-relaxed animate-in zoom-in-95 duration-200",
                                        msg.sender === 'user'
                                            ? "bg-green-600 text-white rounded-br-none"
                                            : "bg-white text-slate-800 border border-slate-100 rounded-bl-none relative group"
                                    )}
                                >
                                    {msg.text}
                                    {msg.sender === 'ai' && (
                                        <button
                                            onClick={() => speakNative(msg.text, selectedLang.name)}
                                            className="absolute -right-10 top-2 p-2 text-slate-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-all bg-white shadow-sm rounded-full border border-slate-100"
                                            title="Listen to response"
                                        >
                                            <Volume2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                    <span className="flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="mt-4 flex gap-2 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                        <button className="p-3 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            placeholder="Type your question here..."
                            className="flex-1 bg-transparent border-0 focus:ring-0 resize-none py-3 max-h-32 text-slate-800 placeholder:text-slate-400"
                            rows="1"
                        />
                        <button className="p-3 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="rounded-lg px-4 h-12"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </Card>
            </FadeIn>
        </div>
    );
};

export default Advisor;
