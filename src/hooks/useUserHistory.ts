import { useState, useEffect, useCallback } from 'react';

export type HistoryItemType = 'course' | 'purchase' | 'support' | 'idea' | 'message' | 'ad' | 'participate' | 'digital_twin' | 'view';
export type HistoryItemStatus = 'completed' | 'pending' | 'viewed' | 'rejected';

export interface HistoryItem {
    id: string;
    type: HistoryItemType;
    title: string;
    timestamp: number;
    amount?: string;
    rawAmount?: number; // For calculations
    details?: string;
    status: HistoryItemStatus;
}

const STORAGE_KEY = 'user_activity_history';

const DEMO_COURSE_ITEM: HistoryItem = {
    id: 'demo-course',
    type: 'course',
    title: 'Курс: Базовый',
    timestamp: new Date(new Date().getFullYear(), 1, 21, 13, 29).getTime(),
    amount: '15 000 с',
    rawAmount: 15000,
    details: 'Заявка на обучение',
    status: 'pending',
};

export function useUserHistory() {
    const [history, setHistory] = useState<HistoryItem[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
            return [DEMO_COURSE_ITEM];
        } catch (e) {
            console.error("Failed to load history", e);
            return [DEMO_COURSE_ITEM];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }, [history]);

    const addHistoryItem = useCallback((item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
        };
        setHistory(prev => [newItem, ...prev]);
        return newItem;
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const getStats = useCallback(() => {
        return history.reduce((acc, item) => {
            if (item.type === 'purchase' && item.status === 'completed') {
                acc.totalSpent += item.rawAmount || 0;
            }
            if (item.type === 'support') {
                acc.supportCount += 1;
            }
            acc.totalActions += 1;
            return acc;
        }, { totalSpent: 0, supportCount: 0, totalActions: 0 });
    }, [history]);

    return {
        history,
        addHistoryItem,
        clearHistory,
        getStats
    };
}
