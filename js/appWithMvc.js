(function (angular) {
    'use strict';
    // Your starting point. Enjoy the ride!
    var module = angular.module("MyTodoApp", ['ngRoute', 'app.controller.main']);
    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        /*'/:status'匹配锚点后面的值
         * '/:status?'代表可以为空
         * */
            .when('/:status?', {
                controller: 'MyTodoController',
                templateUrl: 'tmpl'
            })
        // .otherwise({
        //     redirectTo: '/'
        // });
    }]);
    /*注入路由指向此Controller时的路由参数，即$routeParams*/
    // module.controller("MyTodoController", ["$scope", "$location", '$routeParams', function ($scope, $location, $routeParams) {
    //     /*提供一个文本输入框的模型*/
    //     $scope.text = "";
    //     /* 提供一个数组，todo的任务列表
    //      * 单个任务的数据结构{id:0,content:'内容',completed:true}
    //      * */
    //     $scope.todos = [
    //         {id: 0.23, content: '吃饭', completed: false},
    //         {id: 0.12, content: '睡觉', completed: false},
    //         {id: 0.29, content: '打豆豆', completed: true},
    //     ];
    //     /*新增todo*/
    //     $scope.add = function () {
    //         if ($scope.text) {
    //             $scope.todos.push({
    //                 id: getId(),
    //                 content: $scope.text,
    //                 completed: false
    //             });
    //         } else {
    //             alert("请输入内容");
    //         }
    //         /*文本框模型恢复初始值*/
    //         $scope.text = "";
    //     };
    //     /*获取一个唯一id，有个递归的逻辑*/
    //     function getId() {
    //         var id = Math.random();
    //         for (var i = 0; i < $scope.todos.length; i++) {
    //             if (id === $scope.todos[i].id) {
    //                 id = getId();
    //                 break;
    //             }
    //         }
    //         return id;
    //     }
    //
    //     /*删除单个任务*/
    //     $scope.remove = function (id) {
    //         for (var i = 0; i < $scope.todos.length; i++) {
    //             if (id === $scope.todos[i].id) {
    //                 $scope.todos.splice(i, 1);
    //                 break;
    //             }
    //         }
    //     }
    //     /*删除已完成任务*/
    //     $scope.clearCompleted = function () {
    //         var tempArray = [];
    //         for (var i = 0; i < $scope.todos.length; i++) {
    //             if (!$scope.todos[i].completed) {
    //                 tempArray.push($scope.todos[i])
    //             }
    //         }
    //         $scope.todos = tempArray;
    //     };
    //     /*是否有未完成的任务*/
    //     $scope.existCompleted = function () {
    //         for (var i = 0; i < $scope.todos.length; i++) {
    //             if ($scope.todos[i].completed) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     };
    //     /*创建一个当前正在编辑的条目id的模型*/
    //     $scope.currentEditingId = -1;
    //     /*编辑*/
    //     $scope.toEdite = function (id) {
    //         $scope.currentEditingId = id;
    //     };
    //     /*保存编辑*/
    //     $scope.saveEdite = function () {
    //         $scope.currentEditingId = -1;//currentEditingId恢复默认值
    //     }
    //     /*全选/全不选*/
    //
    //     $scope.toggleAll = function (isChecked) {
    //         console.log("$scope", "toggleAll: " + isChecked);
    //         for (var i = 0; i < $scope.todos.length; i++) {
    //             $scope.todos[i].completed = isChecked;
    //         }
    //     }
    //     /*方式一：教学*/
    //     /*选择器，决定显示all、active或者completed*/
    //     $scope.selector = {};
    //
    //     //获取路由参数
    //     var status = $routeParams.status;
    //     console.log("路由参数", ": " + status);
    //     switch (status) {
    //         case 'active':
    //             $scope.selector = {completed: false};
    //             break;
    //         case 'completed':
    //             $scope.selector = {completed: true};
    //             break;
    //
    //         default:
    //             console.log("默认 ", ": " + "");
    //             $scope.selector = {};
    //             break;
    //     }
    //     // $scope.$loc = $location;
    //     // /*watch只能监视属于$scope的成员*/
    //     // $scope.$watch('$loc.path()', function (now, old) {
    //     //     console.log("监视到：" + now);
    //     //     switch (now) {
    //     //         case '/active':
    //     //             $scope.selector = {completed: false};
    //     //             break;
    //     //         case '/completed':
    //     //             $scope.selector = {completed: true};
    //     //             break;
    //     //
    //     //         default:
    //     //             $scope.selector = {};
    //     //             break;
    //     //     }
    //     // });
    //     /*通过window可以找到锚点，但是对于全局window的依赖提高，所以不建议这么做，要高内聚，低耦合*/
    //     // var hash = window.location.hash;
    //     // console.log("getId", ": " + hash);
    //     /*通过注入$location的方式拿到path*/
    //     // var path = $location.path();
    //     // console.log("getId", ": " + path);
    //
    //
    //     // /*方式二：自研*/
    //     // $scope.getSelector = function () {
    //     //     var path = $location.path();
    //     //     console.log("$scope", "getSelector: " + path);
    //     //     switch (path) {
    //     //         case '/active':
    //     //             $scope.selector = {completed: false};
    //     //             break;
    //     //         case '/completed':
    //     //             $scope.selector = {completed: true};
    //     //             break;
    //     //
    //     //         default:
    //     //             $scope.selector = {};
    //     //             break;
    //     //     }
    //     //     return $scope.selector;
    //     // }
    //
    //     /*自定义比较函数，默认filter过滤器使用的是模糊匹配*/
    //     $scope.equalCompare = function (source, target) {
    //         // console.log("$scope", "source: " + source);
    //         // console.log("$scope", "target: " + target);
    //         return source === target;
    //     }
    // }]);
})(angular);
