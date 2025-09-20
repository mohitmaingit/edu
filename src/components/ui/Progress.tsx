@@ .. @@
 export function Progress({ value, max = 100, className, showLabel = false }: ProgressProps) {
   const percentage = Math.min(100, Math.max(0, (value / max) * 100))
   
   return (
     <div className={cn('w-full', className)}>
-      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
+      <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
         <motion.div
-          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
+          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-sm"
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
-          transition={{ duration: 0.5, ease: "easeOut" }}
+          transition={{ duration: 0.8, ease: "easeOut" }}
         />
       </div>
       {showLabel && (
         <div className="mt-1 text-sm text-gray-600">
           {value} / {max}
         </div>
       )}
     </div>
   )
 }