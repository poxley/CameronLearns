tasksController = function() {
   function errorLogger(errorCode, errorMessage) {
      console.log(errorCode + ': ' + errorMessage);
   }

   var taskPage;
   var initialized = false;
   return {
      init : function(page) {
         if (!initialized) {
            taskPage = page;
            $.getScript('scripts/tasks-webstorage.js', function() {
               //storageEngine.init(function() {
               //   storageEngine.initObjectStore('task', function() {
                     
               //   }, errorLogger)
               //}, errorLogger);
            });
            $(taskPage).find('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required');
            $(taskPage).find('tbody tr:even').addClass('even');
            $(taskPage).find('#btnAddTask').click(function(evt) {
               evt.preventDefault();
               $(taskPage).find('#taskCreation').removeClass('not');
            });
            $(taskPage).find('tbody tr').click(function(evt) {
               $(evt.target).closest('td').siblings().addBack().toggleClass('rowHighlight');
            });
            $(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', function(evt) {
               evt.preventDefault();
               $(evt.target).parents('tr').remove();
            });
            $(taskPage).find('#saveTask').click(function(evt) {
               evt.preventDefault();
               if ($(taskPage).find('form').valid()) {
                  var task = $('form').toObject();
                  storageEngine.save('task', task, function(savedTask) {
                     $('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
                  }, errorLogger);
               }
            });
            initialized = true;
         }
      },
      loadTasks : function() {
			$.getScript('tasks-webstorage.js', storageEngine.findAll('task', function(tasks) {
			$.each(tasks, function(index, task) {
				$('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
			});
			}, errorLogger));
		} 
   }
}();