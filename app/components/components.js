angular.module('todoApp')
    //td-list
    .component('tdList', {
        templateUrl: './app/components/list.html',
        controller: listCtrl,
        bindings: {
            todos: '<'
        }
    })
    //td-list-details
    .component('tdListDetails', {
        templateUrl: './app/components/list-details.html',
        controller: detailsCtrl,
        bindings: {
            todo: '<',
            onDelete: '&',
            onEdit: '&',
            setDate: '&'
        }
    })
    //td-form
    .component('tdForm', {
        templateUrl: './app/components/add-form.html',
        controller: formCtrl,
        bindings: {
            todos: '<',
            todo: '<',
            onAdd: '&'
        }
    });

/****************************************************************************************
 * td-list controller
 * @param todoService
 ****************************************************************************************/
function listCtrl (todoService) {
    var self = this;

    self.setDateTodo = function () {
        console.log('date edit clicked');
    };

    self.editTodo = function () {
        console.log('edit task clicked');

    };

    self.deleteTodo = function (todo) {
        self.todos.$remove(todo).then(function(ref){
            console.log('Item removed. Firebase reference: ', ref);
        }, function(err){
            console.warn('Error removing item: ', err);
        });
    };

    /*self.addTodo = function (todo) {
        console.log('add task clicked');
        todoService.addTodo(todo)
            .then(
                function (snapshot) {
                    self.todos = snapshot;
                    self.todo = {};
                },
                function (snapshot) {
                    console.warn('fail: ', snapshot);
                });
        self.todo = {};
    };*/

}
/****************************************************************************************
 * td-list-details controller
 ****************************************************************************************/
function detailsCtrl () {
    var self = this;

    self.delete = function () {
        self.onDelete({todo: self.todo});
    };

    self.edit = function () {
        self.onEdit({todo: self.todo});
        console.log({todo: self.todo});
    };
}
/****************************************************************************************
 * td-form controller
 ****************************************************************************************/
function formCtrl (todoService) {
    var self = this;

    self.addItem = function (todo) {
        todo.checked = false;
        todo.date = null;
        console.log(todo);
        console.info(self.todos);
        self.todos.$add(todo).then(function(){
            self.todo = {};
            console.info('Todo added!');
        });
        console.info(self.todos);
    };
}