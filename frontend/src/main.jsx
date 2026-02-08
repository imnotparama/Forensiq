import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: '#ff4444', backgroundColor: '#1a1a1a', height: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>SYSTEM CRITICAL ERROR</h1>
          <h2 style={{ fontSize: '18px', color: '#fff' }}>{this.state.error && this.state.error.toString()}</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', color: '#aaa', fontSize: '12px' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

