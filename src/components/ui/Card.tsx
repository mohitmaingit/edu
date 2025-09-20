@@ .. @@
 export function Card({ className, children, ...props }: CardProps) {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
+      whileHover={{ y: -2, shadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)" }}
       className={cn(
-        'rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
+        'rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg backdrop-blur-sm',
         className
       )}
       {...props}
     >
       {children}
     </motion.div>
   )
 }