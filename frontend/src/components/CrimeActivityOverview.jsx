import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { time: '00:00', incidents: 12, intel: 45, arrests: 2 },
  { time: '04:00', incidents: 8, intel: 30, arrests: 1 },
  { time: '08:00', incidents: 25, intel: 65, arrests: 5 },
  { time: '12:00', incidents: 40, intel: 85, arrests: 12 },
  { time: '16:00', incidents: 35, intel: 70, arrests: 8 },
  { time: '20:00', incidents: 55, intel: 90, arrests: 15 },
  { time: '24:00', incidents: 45, intel: 60, arrests: 10 },
];

export default function CrimeActivityOverview() {
  return (
    <div className="cyber-panel h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-mono font-bold text-cyber-muted tracking-widest flex items-center gap-2 uppercase">
            <Activity className="w-4 h-4 text-cyber" />
            CRIME ACTIVITY OVERVIEW
        </h2>
        <div className="flex gap-4 text-[10px] font-mono">
           <span className="text-cyber-danger flex items-center gap-1"><div className="w-2 h-2 bg-cyber-danger rounded-full"/> INCIDENTS</span>
           <span className="text-cyber flex items-center gap-1"><div className="w-2 h-2 bg-cyber rounded-full"/> INTEL CHATTER</span>
           <span className="text-cyber-success flex items-center gap-1"><div className="w-2 h-2 bg-cyber-success rounded-full"/> ARRESTS</span>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} />
            <YAxis stroke="#666" fontSize={10} tickLine={false} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
                itemStyle={{ fontSize: '12px' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '0.25rem' }}
            />
            <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="intel" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="arrests" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
