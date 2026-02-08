import { useEffect, useState } from "react";
import { Activity, Shield, Users, AlertTriangle } from "lucide-react";
import StatsCard from "../components/StatsCard";
import CrimeActivityOverview from "../components/CrimeActivityOverview";
import LiveFeed from "../components/LiveFeed";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-cyber" />
          <h1 className="text-2xl font-bold font-mono text-white tracking-widest">
            OPERATIONS <span className="text-cyber">DASHBOARD</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-cyber-dark border border-cyber text-cyber text-xs font-mono rounded hover:bg-cyber hover:text-white transition-colors">LIVE</button>
          <button className="px-3 py-1 bg-cyber-danger/10 border border-cyber-danger text-cyber-danger text-xs font-mono rounded animate-pulse">DEFCON 3</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Cases" value={stats?.active_cases || "--"} trend="+12%" positive={true} type="activity" iconName="activity" />
        <StatsCard title="High Risk Targets" value={stats?.high_risk_targets || "--"} trend="+5%" positive={false} type="alert" iconName="alert" />
        <StatsCard title="Intel Reports" value={stats?.intel_reports || "--"} trend="-2%" positive={false} type="shield" iconName="shield" />
        <StatsCard title="Clearance Rate" value={stats?.clearance_rate || "--"} trend="+8%" positive={true} type="users" iconName="users" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <div className="lg:col-span-2 space-y-4">
            <div className="h-[400px] border border-cyber-border rounded-lg overflow-hidden relative group">
                <CrimeActivityOverview />
                <div className="absolute inset-0 border-[4px] border-cyber-dim pointer-events-none rounded-lg z-20" />
                {/* Crosshairs */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 border border-cyber opacity-50 z-20" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyber opacity-20 z-20" />
                <div className="absolute top-0 left-1/2 h-full w-[1px] bg-cyber opacity-20 z-20" />
            </div>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-lg font-mono font-bold text-gray-400">INCOMING INTEL</h2>
            <LiveFeed />
        </div>
      </div>
    </div>
  );
}
