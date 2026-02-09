import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, AlertTriangle } from "lucide-react";
import { cn } from "../lib/utils";

export default function Suspects() {
    const [suspects, setSuspects] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/suspects/")
            .then(res => res.json())
            .then(data => {
                console.log("Fetched suspects:", data);
                setSuspects(data);
            })
            .catch(err => console.error("Error fetching suspects:", err));
    }, []);

    const riskColor = (level) => {
        switch(level) {
            case "High": return "text-cyber-danger border-cyber-danger bg-cyber-danger/10";
            case "Medium": return "text-cyber-warning border-cyber-warning bg-cyber-warning/10";
            case "Low": return "text-cyber-success border-cyber-success bg-cyber-success/10";
            default: return "text-gray-500 border-gray-500";
        }
    };

    const filtered = suspects.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold font-mono tracking-tighter text-white">
                    SUSPECT <span className="text-cyber">DATABASE</span>
                </h1>
                
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="SEARCH DATABASE..." 
                            className="bg-black border border-cyber-border rounded-lg pl-10 pr-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-cyber w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((suspect) => (
                    <Link to={`/suspects/${suspect.id}`} key={suspect.id} className="group block">
                        <div className="cyber-panel hover:bg-cyber-panel/80 transition-all duration-300 border-l-4 hover:border-l-cyber relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-white group-hover:text-cyber transition-colors font-mono">
                                    {suspect.name}
                                </h3>
                                <span className={cn("text-[10px] px-2 py-0.5 border rounded font-mono uppercase tracking-wider", riskColor(suspect.risk_level))}>
                                    {suspect.risk_level}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-400 mt-4">
                                <div>ID: <span className="text-white">#{suspect.id.toString().padStart(4, '0')}</span></div>
                                <div>STATUS: <span className="text-white">ACTIVE</span></div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-cyber-border/30 flex items-center justify-between">
                                <span className="text-[10px] text-cyber-muted">UPDATED: 14:00</span>
                                <div className="text-cyber text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    ACCESS FILE <span>→</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
