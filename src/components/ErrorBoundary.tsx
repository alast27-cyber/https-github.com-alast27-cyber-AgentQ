import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-red-900/20 border border-red-500/50 rounded-2xl p-8 backdrop-blur-xl">
            <h1 className="text-2xl font-black text-red-500 mb-4 uppercase tracking-tighter italic">Quantum Collapse Detected</h1>
            <p className="text-red-400/80 font-mono text-sm mb-6 leading-relaxed">
              The neural substrate has encountered a critical parity error. Parity check failed at index 0x7F.
            </p>
            <div className="bg-black/50 rounded-lg p-4 mb-6 border border-red-500/20">
              <p className="text-red-500 font-mono text-xs break-all">
                {this.state.error?.message || 'Unknown quantum anomaly'}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-red-500 hover:bg-red-400 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-red-500/20"
            >
              Re-initialize Substrate
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
