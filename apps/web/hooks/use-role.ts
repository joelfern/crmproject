"use client";

import { useState, useEffect } from "react";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

// Mock hook - in a real app, this would fetch from your auth provider or API
export function useRole() {
    // Default to ADMIN for development/testing purposes initially
    const [role, setRole] = useState<Role>(Role.ADMIN);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate async check
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Helper to toggle role for testing (exposed via window or dev tools if needed)
    // For now, we'll just return the state
    return { role, isLoading, setRole };
}
