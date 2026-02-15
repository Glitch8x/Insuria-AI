import React, { createContext, useContext, useState, useEffect } from 'react';

const ClaimsContext = createContext();

export const useClaims = () => useContext(ClaimsContext);

export const ClaimsProvider = ({ children }) => {
    // Initial dummy documents
    const initialDocuments = [
        { id: 1, name: "Driver's License", type: "Identification", date: "Oct 24, 2025", status: "verified" },
        { id: 2, name: "Vehicle Registration (Lagos)", type: "Vehicle Paper", date: "Jan 10, 2026", status: "verified" },
        { id: 3, name: "Insurance Certificate", type: "Policy", date: "Dec 01, 2025", status: "verified" },
    ];

    const [claims, setClaims] = useState(() => {
        const saved = localStorage.getItem('insuria_claims');
        return saved ? JSON.parse(saved) : [];
    });

    const [documents, setDocuments] = useState(() => {
        const saved = localStorage.getItem('insuria_documents');
        return saved ? JSON.parse(saved) : initialDocuments;
    });

    useEffect(() => {
        localStorage.setItem('insuria_claims', JSON.stringify(claims));
    }, [claims]);

    useEffect(() => {
        localStorage.setItem('insuria_documents', JSON.stringify(documents));
    }, [documents]);

    const addClaim = (claimData) => {
        const newClaim = {
            id: Date.now(),
            claimNumber: Math.floor(100 + Math.random() * 900),
            date: new Date().toLocaleString(),
            status: 'submitted',
            ...claimData
        };
        setClaims([newClaim, ...claims]);
        return newClaim;
    };

    const addDocument = (file) => {
        const newDoc = {
            id: Date.now(),
            name: file.name,
            type: file.type.split('/')[1]?.toUpperCase() || 'FILE',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            status: 'pending'
        };
        setDocuments([newDoc, ...documents]);
    };

    const activeClaim = claims[0] || null;

    return (
        <ClaimsContext.Provider value={{ claims, documents, activeClaim, addClaim, addDocument }}>
            {children}
        </ClaimsContext.Provider>
    );
};
