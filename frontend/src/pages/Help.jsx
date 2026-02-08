import { Terminal, Shield, Database, Activity } from "lucide-react";

export default function Help() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Terminal className="w-8 h-8 text-cyber" />
        <h1 className="text-3xl font-bold font-mono tracking-tighter text-white">
          SYSTEM <span className="text-cyber">MANUAL</span>
        </h1>
      </div>

      <div className="space-y-6 text-gray-300 font-mono">
        <section className="cyber-panel">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyber" /> 
            1. DASHBOARD OPERATIONS
          </h2>
          <p className="mb-2">The main dashboard provides real-time situational awareness.</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong className="text-cyber">Stats Overview:</strong> Tracks active cases, high-risk targets, and clearance rates.</li>
            <li><strong className="text-cyber">System Resources:</strong> Monitors server load (CPU, Memory, Network) to ensure grid stability.</li>
            <li><strong className="text-cyber">Live Feed:</strong> Displays real-time intelligence intercepts and field reports.</li>
          </ul>
        </section>

        <section className="cyber-panel">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyber" />
            2. SUSPECT DATABASE
          </h2>
          <p className="mb-2">Access the central repository of known entities.</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong className="text-cyber">Search:</strong> Use the global search bar to filter suspects by name.</li>
            <li><strong className="text-cyber">Risk Levels:</strong> Entities are color-coded (Green: Low, Yellow: Medium, Red: High).</li>
            <li><strong className="text-cyber">Profiles:</strong> Click any card to access detailed dossiers, including criminal history and network graph.</li>
          </ul>
        </section>

        <section className="cyber-panel">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber" />
            3. AI ANALYSIS
          </h2>
          <p className="mb-2">Use the <span className="text-cyber">RUN PREDICTIVE ANALYSIS</span> tool in a suspect's profile to generate behavioral insights.</p>
          <p className="text-xs text-cyber-dim mt-2">NOTE: AI Analysis is a simulated module for demonstration purposes.</p>
        </section>

        <div className="cyber-panel border-red-500/50 bg-red-500/5">
            <h3 className="text-red-500 font-bold mb-2">⚠ SECURITY PROTOCOLS</h3>
            <p className="text-xs">
                Unauthorized access to this system is a federal offense. 
                All actions are logged and monitored. 
                If you are not an authorized agent, terminate the session immediately.
            </p>
        </div>
      </div>
    </div>
  );
}
