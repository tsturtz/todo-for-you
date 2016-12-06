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

    self.todos = [];

    //initiate preloader
    self.activated = true;

    todoService.getTodos()
        .then(
            function (snapshot) {
                self.todos = snapshot;
                console.log('todos array after successful data call: ', self.todos);
                //turn off preloader
                self.activated = false;
            },
            function (snapshot) {
                console.warn('fail: ', snapshot);
            });

    self.setDateTodo = function () {
        console.log('date edit clicked');
    };

    self.editTodo = function () {
        console.log('edit task clicked');

    };

    self.deleteTodo = function (todo) {
        console.log(todo);
        console.log(self.todos.indexOf(todo));
        var idx = self.todos.indexOf(todo);
        self.todos.splice(idx, 1);
    };

    self.addTodo = function (todo) {
        console.log('add task clicked');
        self.todos.push(self.todo);
        self.todo = {};
    };

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
function formCtrl () {
    var self = this;

    self.addItem = function () {
        self.onAdd({todo: self.todo});
    };

    //self.tdList.addTodo(this);
}