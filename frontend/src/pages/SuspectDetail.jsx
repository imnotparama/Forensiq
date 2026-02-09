import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Cpu, Network, Shield } from "lucide-react";
import SuspectNetwork from "../components/SuspectNetwork";

export default function SuspectDetail() {
  const { id } = useParams();
  const [suspect, setSuspect] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [networkData, setNetworkData] = useState(null);

  useEffect(() => {
    fetch(`/api/suspects/${id}`)
      .then((res) => res.json())
      .then((data) => setSuspect(data));

    // Fetch network data
    fetch(`/api/network/${id}`)
      .then((res) => res.json())
      .then((data) => setNetworkData(data));
  }, [id]);

  const runAnalysis = () => {
    setAnalyzing(true);
    fetch(`/api/analyze/suspect/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Simulate delay for "processing" effect
        setTimeout(() => {
          setAiAnalysis(data);
          setAnalyzing(false);
        }, 1500);
      });
  };

  // --- DEBUG PROBE ---
  // Un-comment the line below to test if component mounts
  // return <div className="p-20 text-4xl text-white font-bold bg-red-600 z-50 relative">DEBUG: COMPONENT MOUNTED. ID: {id}</div>;

  if (!suspect) return <div className="p-8 text-cyber font-mono animate-pulse">ACCESSING ENCRYPTED FILE...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-cyber-blue hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-mono text-sm tracking-wider">BACK TO DATABASE</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"/> 
           SYSTEM ONLINE
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Analysis */}
        <div className="space-y-6">
            {/* Profile Card */}
            <div className="cyber-panel relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="aspect-square bg-gray-900/50 rounded-lg mb-4 flex items-center justify-center border border-gray-800/50 overflow-hidden">
                        {suspect.image_url ? (
                            <img src={suspect.image_url} alt={suspect.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                            <span className="text-gray-600 font-mono text-xs">NO IMAGE DATA</span>
                        )}
                    </div>

                    <h1 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">{suspect.name}</h1>
                    <div className="flex items-center gap-2 mb-6">
                        <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded border ${
                            suspect.status === 'WANTED' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                            suspect.status === 'IN CUSTODY' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                            'bg-gray-500/10 text-gray-500 border-gray-500/20'
                        }`}>
                            {suspect.status || 'UNKNOWN'}
                        </span>
                        <span className="text-gray-500 text-xs font-mono">{suspect.id_code || 'ID-UNKNOWN'}</span>
                    </div>

                    <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between border-b border-gray-800/50 pb-2">
                            <span className="text-gray-500">KNOWN ALIAS</span>
                            <span className="text-gray-300">{suspect.alias || 'None'}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800/50 pb-2">
                            <span className="text-gray-500">LAST SEEN</span>
                            <span className="text-gray-300">{suspect.last_seen || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800/50 pb-2">
                            <span className="text-gray-500">THREAT LEVEL</span>
                            <span className="text-red-400">{suspect.threat_level || 'LOW'}</span>
                        </div>
                    </div>

                    <button 
                        onClick={runAnalysis}
                        disabled={analyzing || aiAnalysis}
                        className="w-full mt-6 py-3 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue/20 hover:border-cyber-blue/60 transition-all duration-300 flex items-center justify-center gap-3 font-mono text-xs tracking-wider group/btn"
                    >
                        {analyzing ? (
                            <Cpu className="w-4 h-4 animate-spin"/>
                        ) : (
                            <Cpu className="w-4 h-4 group-hover/btn:scale-110 transition-transform"/>
                        )}
                        {analyzing ? 'PROCESSING DATA...' : 'RUN AI ANALYSIS'}
                    </button>
                </div>
            </div>

            {/* AI Analysis Result */}
            {aiAnalysis && (
                <div className="cyber-panel p-5 border-l-2 border-l-cyber-blue animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Cpu className="w-16 h-16 text-cyber-blue" />
                    </div>
                    
                    <h3 className="text-sm font-bold text-cyber-blue mb-3 flex items-center gap-2 relative z-10">
                        <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-pulse" />
                        AI INSIGHT
                    </h3>
                    
                    <div className="text-sm text-gray-300 leading-relaxed mb-4 font-mono relative z-10">
                        {aiAnalysis.summary}
                    </div>
                    
                    <button
                        onClick={() => setAiAnalysis(null)}
                        className="text-[10px] text-gray-500 hover:text-white underline uppercase tracking-wider relative z-10 transition-colors"
                    >
                        RESET ANALYSIS
                    </button>
                </div>
            )}
        </div>

        {/* Existing Layout for Columns 2 & 3 (Visualization) */}
        <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
                <h2 className="text-lg font-mono font-bold text-gray-400 flex items-center gap-2">
                    <Network className="w-5 h-5" /> KNOWN ASSOCIATES
                </h2>
                <div className="cyber-panel p-0 overflow-hidden h-[400px]">
                     {networkData ? (
                        <SuspectNetwork nodes={networkData.nodes} edges={networkData.edges} />
                     ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 font-mono text-sm animate-pulse">
                            Establishing secure connection...
                        </div>
                     )}
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-mono font-bold text-gray-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> CRIMINAL RECORD
                </h2>
                <div className="cyber-panel">
                    <div className="space-y-2">
                        {suspect.crimes && suspect.crimes.map((crime, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-black/40 border border-gray-800/50 rounded hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300 group">
                                <div className="w-1.5 h-1.5 bg-red-500/50 group-hover:bg-red-500 rounded-full transition-colors" />
                                <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors uppercase tracking-tight">{crime}</span>
                            </div>
                        ))}
                        {(!suspect.crimes || suspect.crimes.length === 0) && (
                            <div className="text-sm text-gray-500 italic p-4 text-center font-mono">No criminal records found in database.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
