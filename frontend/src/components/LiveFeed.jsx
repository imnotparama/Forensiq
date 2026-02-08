import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio } from "lucide-react";

export default function LiveFeed() {
  const [items, setItems] = useState([]);

  // Fetch feed every 5 seconds
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/feed");
        const data = await res.json();
        // Prepend new items to simulate a real feed, limiting to 10
        setItems(prev => {
          const newIds = new Set(data.map(d => d.id));
          const filteredPrev = prev.filter(p => !newIds.has(p.id));
          return [...data, ...filteredPrev].slice(0, 10);
        });
      } catch (err) {
        console.error("Feed error:", err);
      }
    };

    fetchFeed();
    const interval = setInterval(fetchFeed, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-panel h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
        <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          LIVE INTEL FEED
        </h2>
        <span className="text-[10px] text-cyber bg-cyber-dim px-2 py-0.5 rounded">REAL-TIME</span>
      </div>

      <div className="flex-1 overflow-hidden relative">
         <div className="absolute inset-0 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={`${item.id}-${i}`} // simple key fix
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 bg-black/40 border-l-2 border-cyber-border hover:border-cyber transition-all group"
                >
                  <div key={item.id} className="border-b border-cyber-border/50 pb-2 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-cyber-muted font-mono">{item.timestamp}</span>
                        <span className="text-[10px] px-1 bg-cyber-dim text-cyber border border-cyber-border rounded">INTEL</span>
                    </div>
                    <p className="text-sm text-gray-300 font-mono">{item.message}</p>
                </div>
                </motion.div>
              ))}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
