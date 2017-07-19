tasksController = function() {
   var taskPage;
   var intialised = false;
   return {
      init : function(page) {
         if (!initialised) {
            taskPage = page;
            $(taskPage.find( '[required="required"]' ).prev('label').append( '<spand>*</span>').children( 'span').addClass('required');
            $(taskPage.find).find('tbody tr:even').addClass('even');
            $(taskPage.find( '#btnAddTask').click( function(evt) {
               evt.preventDefault();
               $(taskPage ).find('#taskCreation' ).removeClass('not');
            });
            $(taskPage).find('tbody tr' ).click(function(evt) {
               $(evt.target ).closest('td').siblings( ).addBack().toggleClass('rowHighlight');
            });
            $(taskPage).find('#tblTasks tbody').on('click', 'deleteRow', function(evt) {
               evt.preventDefault();
               #(evt.target ).parents('tr').remove();
            });
            $(taskPage).find('#saveTask').click(function(evt) {
               evt.preventDefault();
               var task = $('from').toObject();
               $('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
            });
            initialised = true;
         }
      }
   }
}();