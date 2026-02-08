import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Fingerprint, ShieldAlert, Cpu, BookOpen } from "lucide-react";
import { cn } from "../lib/utils";

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-mono tracking-wide transition-all duration-200 border-l-2",
        isActive
          ? "border-cyber bg-cyber-dim text-white"
          : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className={cn("w-4 h-4", isActive ? "text-cyber" : "text-gray-500")} />
      {label}
    </Link>
  );
};

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-cyber-dark text-white overflow-hidden selection:bg-cyber selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-cyber-border flex flex-col relative z-20">
        <div className="p-6 border-b border-cyber-border bg-cyber-panel">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyber-dim rounded border border-cyber-border">
                <Cpu className="w-6 h-6 text-cyber animate-pulse" />
            </div>
            <div>
                <h1 className="text-lg font-bold font-mono tracking-wider text-white">
                FORENSIQ
                </h1>
                <p className="text-[10px] text-cyber-muted font-mono tracking-widest">VERSION 1.0 // CLASSIFIED</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/suspects" icon={Users} label="Suspects" />
          <NavItem to="/intel" icon={Fingerprint} label="Intel Feed" />
          <NavItem to="/alerts" icon={ShieldAlert} label="High Priority" />
          <NavItem to="/help" icon={BookOpen} label="System Manual" />
        </nav>

        <div className="p-4 border-t border-cyber-border/50 bg-cyber-panel/20 overflow-y-auto max-h-40">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-xs font-mono text-green-400">SYSTEM ONLINE</span>
          </div>
          
          <div className="space-y-1">
             <p className="text-[10px] text-cyber font-bold font-mono uppercase">StartUp Team</p>
             <ul className="text-[9px] text-gray-400 font-mono space-y-0.5">
                <li>Parameshwaran S</li>
                <li>Lohunn Lazaro W</li>
                <li>Gururajan Ganesh Babu</li>
                <li>C Monish Nandha Balan</li>
             </ul>
             <p className="text-[9px] text-gray-600 font-mono mt-1">Chennai, Tamil Nadu, India</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-cyber-dark to-black">
        {/* Grid Background Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="relative z-10 h-full overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
