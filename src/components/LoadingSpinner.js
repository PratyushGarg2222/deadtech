import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';


export default function LoadingSpinner({ message = "Loading technologies..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 space-y-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-12 h-12 text-blue-400" />
      </motion.div>
      <p className="text-slate-400 text-lg">{message}</p>
    </motion.div>
  );
}