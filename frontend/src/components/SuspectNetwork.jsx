import { motion } from "framer-motion";

export default function SuspectNetwork({ nodes = [], edges = [] }) {
  // If no data, show mock "Scanning" state
  if (!nodes.length) {
    return (
      <div className="h-[300px] flex items-center justify-center border border-cyber-border rounded-lg bg-black/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyber border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyber-dim animate-pulse font-mono">SCANNING NETWORK CONNECTIONS...</p>
        </div>
      </div>
    );
  }

  // Simple force-directed-like layout (mock coordinates for now as we don't have a layout engine)
  // In a real app we'd use d3-force or similar
  const width = 600;
  const height = 400;
  
  // Randomly position nodes for the mock
  const positionedNodes = nodes.map((node, i) => ({
    ...node,
    x: width / 2 + Math.cos(i * (2 * Math.PI / nodes.length)) * 100,
    y: height / 2 + Math.sin(i * (2 * Math.PI / nodes.length)) * 100,
  }));

  return (
    <div className="cyber-panel relative h-[400px] bg-black overflow-hidden flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="20" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#333" />
          </marker>
        </defs>
        {edges.map((edge, i) => {
          const source = positionedNodes.find(n => n.id === edge.from);
          const target = positionedNodes.find(n => n.id === edge.to);
          if (!source || !target) return null;

          return (
            <motion.line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="#333"
              strokeWidth="2"
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          );
        })}
      </svg>

      {positionedNodes.map((node, i) => (
        <motion.div
           key={node.id}
           className="absolute flex flex-col items-center"
           style={{ left: node.x, top: node.y }}
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: i * 0.1 }}
        >
          <div 
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-black z-10 hover:scale-110 transition-transform cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            style={{ borderColor: node.color || '#00f0ff' }}
          >
             <span className="text-[10px] font-bold text-white">{node.label[0]}</span>
          </div>
          <span className="mt-2 text-[10px] bg-black/80 px-2 py-1 rounded text-gray-300 font-mono border border-gray-800">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
