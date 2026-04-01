import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrowserTab } from '../types';

interface BrowserContextType {
  tabs: BrowserTab[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  addTab: (tab: Partial<BrowserTab>) => void;
  closeTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<BrowserTab>) => void;
}

const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

export const BrowserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    {
      id: 'tab-1',
      title: 'QCOS Neural Bridge',
      uri: 'https://qcos.network/bridge',
      history: ['https://qcos.network/bridge'],
      historyIndex: 0,
      isLoading: false,
      aiContext: {
        summary: 'Neural bridge interface for QCOS substrate.',
        entities: ['QCOS', 'Neural Bridge', 'Substrate'],
        actions: ['Initialize', 'Sync', 'Bridge'],
        confidence: 0.99,
        vectorState: '0x7F...3A'
      }
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');

  const addTab = (tab: Partial<BrowserTab>) => {
    const newTab: BrowserTab = {
      id: `tab-${Date.now()}`,
      title: 'New Tab',
      uri: 'about:blank',
      history: ['about:blank'],
      historyIndex: 0,
      isLoading: false,
      aiContext: {
        summary: '',
        entities: [],
        actions: [],
        confidence: 0,
        vectorState: ''
      },
      ...tab
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string) => {
    setTabs(prev => {
      const next = prev.filter(t => t.id !== id);
      if (activeTabId === id && next.length > 0) {
        setActiveTabId(next[next.length - 1].id);
      }
      return next;
    });
  };

  const updateTab = (id: string, updates: Partial<BrowserTab>) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return (
    <BrowserContext.Provider value={{ tabs, activeTabId, setActiveTabId, addTab, closeTab, updateTab }}>
      {children}
    </BrowserContext.Provider>
  );
};

export const useBrowser = () => {
  const context = useContext(BrowserContext);
  if (!context) {
    throw new Error('useBrowser must be used within a BrowserProvider');
  }
  return context;
};
