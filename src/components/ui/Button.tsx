@@ .. @@
 export function Button({ 
   className, 
   variant = 'primary', 
   size = 'md', 
   children, 
+  disabled,
   ...props 
 }: ButtonProps) {
   return (
     <motion.button
-      whileHover={{ scale: 1.02 }}
-      whileTap={{ scale: 0.98 }}
+      whileHover={disabled ? {} : { scale: 1.02 }}
+      whileTap={disabled ? {} : { scale: 0.98 }}
       className={cn(
-        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
+        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:shadow-md',
         {
-          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
-          'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
-          'border border-gray-200 bg-white hover:bg-gray-50': variant === 'outline',
-          'hover:bg-gray-100': variant === 'ghost',
+          'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800': variant === 'primary',
+          'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md': variant === 'secondary',
+          'border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300': variant === 'outline',
+          'hover:bg-gray-100 shadow-none hover:shadow-sm': variant === 'ghost',
         },
         {
           'h-8 px-3 text-sm': size === 'sm',
           'h-10 px-4 text-sm': size === 'md',
           'h-12 px-6 text-base': size === 'lg',
         },
         className
       )}
+      disabled={disabled}
       {...props}
     >
       {children}
     </motion.button>
   )
 }