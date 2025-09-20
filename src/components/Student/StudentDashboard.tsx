@@ .. @@
                   <div className="flex items-center space-x-4 mt-1">
                     <span className="flex items-center text-xs text-gray-500">
                       <Clock className="w-3 h-3 mr-1" />
                       {lesson.duration} min
                     </span>
                     <Badge variant={lesson.completed ? 'success' : 'default'}>
                       {lesson.completed ? 'Completed' : 'In Progress'}
                     </Badge>
                   </div>
                 </div>
               </div>
-              <Button size="sm">
+              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
+                <Button size="sm">
                 {lesson.completed ? t('retry') : t('continue')}
-              </Button>
+                </Button>
+              </motion.div>
             </div>
           ))}
         </div>