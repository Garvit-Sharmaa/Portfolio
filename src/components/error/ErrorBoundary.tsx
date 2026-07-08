"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught OS error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-background text-error p-8 font-mono select-none">
          <AlertTriangle className="w-16 h-16 mb-6 text-industrial-orange animate-pulse" />
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Kernel Panic</h1>
          <p className="text-foreground/70 mb-8 max-w-lg text-center">
            A critical fault occurred in the AURA OS rendering engine. The process has been halted to prevent corruption.
          </p>
          <div className="bg-surface1 p-6 border border-error/30 w-full max-w-2xl overflow-auto text-xs text-error/80 whitespace-pre-wrap">
            {this.state.error?.message || "Unknown rendering exception."}
          </div>
          <button
            className="mt-12 px-6 py-2 border-2 border-industrial-orange text-industrial-orange hover:bg-industrial-orange hover:text-background uppercase tracking-widest font-bold transition-colors"
            onClick={() => window.location.reload()}
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
