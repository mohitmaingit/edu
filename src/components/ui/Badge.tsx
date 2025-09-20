@@ .. @@
 interface BadgeProps {
   children: React.ReactNode
   variant?: 'default' | 'success' | 'warning' | 'error'
   className?: string
 }
 
 export function Badge({ children, variant = 'default', className }: BadgeProps) {
   return (
     <motion.span
       initial={{ opacity: 0, scale: 0.8 }}
       animate={{ opacity: 1, scale: 1 }}
+      whileHover={{ scale: 1.05 }}
       className={cn(
         'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
         {
           'bg-blue-100 text-blue-800': variant === 'default',
           'bg-green-100 text-green-800': variant === 'success',
           'bg-yellow-100 text-yellow-800': variant === 'warning',
           'bg-red-100 text-red-800': variant === 'error',
         },
         className
       )}
     >
       {children}
     </motion.span>
   )
 }