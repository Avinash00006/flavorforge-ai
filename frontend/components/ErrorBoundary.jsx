"use client";

import React from 'react';
import { Button } from './ui';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for diagnostic review
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-6 py-12">
          <div className="max-w-md w-full text-center space-y-6 p-8 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-sm animate-fade-in">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl border border-red-500/20">
              ⚠️
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Something went wrong
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                An unexpected rendering error occurred inside the application. Try refreshing or going back.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto max-h-40 border border-zinc-200 dark:border-zinc-800">
                <pre className="text-xs font-mono text-red-600 dark:text-red-400 whitespace-pre-wrap break-all">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}

            <div className="flex gap-4 justify-center pt-2">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Go Home
              </Button>
              <Button variant="primary" onClick={this.handleReset}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
