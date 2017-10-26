/**
 * Created by Tevin on 2017/10/26 026.
 */
(function (angular) {
    var serviceModule = angular.module("app.service.main", []);
    serviceModule.service("MainService", ['$window', function ($window) {
        var localStorage = $window.localStorage;
        var todos = localStorage['my_todo_list'] ? JSON.parse(localStorage['my_todo_list']) : []
        console.log(typeof todos);
        // var todos = [
        //     {id: 0.23, content: '吃饭', completed: false},
        //     {id: 0.12, content: '睡觉', completed: false},
        //     {id: 0.29, content: '打豆豆', completed: true},
        // ];
        this.saveTevins = function () {
            localStorage['my_todo_list'] = JSON.stringify(todos);
        }
        this.getTodos = function () {
            return todos;
        };
        this.addTevins = function (text) {
            if (text) {
                todos.push({
                    id: getId(),
                    content: text,
                    completed: false
                });
            } else {
                alert("请输入内容");
            }
            this.saveTevins();

        };
        this.removeTevins = function (id) {
            for (var i = 0; i < todos.length; i++) {
                if (id === todos[i].id) {
                    todos.splice(i, 1);
                    break;
                }
            }
            this.saveTevins();
        };

        this.clearCompletedTevins = function () {
            var tempArray = [];
            for (var i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    tempArray.push(todos[i])
                }
            }
            todos = tempArray;
            this.saveTevins();
            return todos;
        };
        this.existCompletedTevins = function () {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].completed) {
                    return true;
                }
            }
            return false;
        };
        this.toggleSingleTevins = function () {
            this.saveTevins();
        };
        this.toggleAllTevins = function (isChecked) {
            for (var i = 0; i < todos.length; i++) {
                todos[i].completed = isChecked;
            }
            this.saveTevins();
        };
        /*获取一个唯一id，有个递归的逻辑*/
        function getId() {
            var id = Math.random();
            for (var i = 0; i < todos.length; i++) {
                if (id === todos[i].id) {
                    id = getId();
                    break;
                }
            }
            return id;
        }
    }]);
})(angular);