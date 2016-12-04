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
            todos: '='
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
        console.log(todo);
        console.log(self.todos.indexOf(todo));
        var idx = self.todos.indexOf(todo);
        self.todos.splice(idx, 1);
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

    self.add = function () {
        //self.onAdd({todo: self.todo});
        //self.todo = {};
    };

    //self.tdList.addTodo(this);
}