import { ArrowUpRight, ArrowDownRight, Activity, AlertTriangle, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const icons = {
    activity: Activity,
    alert: AlertTriangle,
    shield: Shield,
    users: Users
};

export default function StatsCard({ title, value, unit, iconName, trend, color = "cyber" }) {
  const colorClass = {
    cyber: "text-cyber border-cyber",
    success: "text-cyber-success border-cyber-success",
    warning: "text-cyber-warning border-cyber-warning",
    danger: "text-cyber-danger border-cyber-danger",
  }[color];

  const Icon = icons[iconName] || Activity; // Define Icon based on iconName prop

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-panel flex flex-col justify-between group hover:bg-white/5 transition-colors" // Changed to flex-col to accommodate new header layout
    >
      <div className="flex justify-between items-start mb-2"> {/* New header div */}
        <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest">{title}</h3>
        <Icon className={cn("w-4 h-4 text-gray-500 group-hover:text-cyber-accent transition-colors")} /> {/* Icon moved to header */}
      </div>
      
      <div> {/* This div now contains value, unit, and trend */}
        <div className="flex items-baseline gap-1">
          <span className={cn("text-3xl font-bold font-mono tracking-tighter drop-shadow-lg", colorClass.split(' ')[0])}>
            {value}
          </span>
          {unit && <span className="text-sm text-gray-500 font-mono">{unit}</span>}
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-xs font-mono">
            <span className={trend > 0 ? "text-green-400" : "text-red-400"}>
              {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
            </span>
            <span className="text-gray-600">vs last week</span>
          </div>
        )}
      </div>
      
      <div className={cn("p-2 rounded-lg border bg-black/50", colorClass)}>
        <Icon className="w-6 h-6" />
      </div>
    </motion.div>
  );
}
