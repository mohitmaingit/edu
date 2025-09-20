@@ .. @@
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 50 }}
+          transition={{ type: "spring", stiffness: 300, damping: 30 }}
           className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto"
         >
-          <div className="bg-white rounded-xl shadow-lg border p-4">
+          <div className="bg-white rounded-xl shadow-xl border p-4 backdrop-blur-sm bg-white/95">
             <div className="flex items-start justify-between mb-3">
               <div className="flex items-center space-x-3">
-                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
+                <motion.div 
+                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
+                  whileHover={{ scale: 1.1, rotate: 5 }}
+                >
                   <span className="text-white font-bold text-sm">E</span>
-                </div>
+                </motion.div>
                 <div>
                   <h3 className="font-semibold text-gray-900">Install EduSpark</h3>
                   <p className="text-sm text-gray-600">Get the full app experience</p>
                 </div>
               </div>
               <Button variant="ghost" size="sm" onClick={handleDismiss}>
                 <X className="w-4 h-4" />
               </Button>
             </div>
             
             <div className="flex space-x-2">
               <Button onClick={handleInstall} size="sm" className="flex-1">
                 <Download className="w-4 h-4 mr-2" />
                 Install
               </Button>
               <Button variant="outline" onClick={handleDismiss} size="sm">
                 Not Now
               </Button>
             </div>
           </div>
         </motion.div>
       )}
     </AnimatePresence>
   )
 }