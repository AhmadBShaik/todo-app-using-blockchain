// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TodoList{
    
    struct Task {
        string content;
        bool completed;
    }

    event TaskCreated (
        string content,
        bool completed,
        uint listLength
    );

    event TaskCompleted (
        uint index,
        bool completed
    );

    event TaskUpdated(
        uint index,
        string content
    );

    event TaskDeleted (
        uint listLength
    );
    
    mapping(address => Task[]) public tasks;
    mapping(address => uint) public taskCount;

    function createTask(string memory _content) public {
        taskCount[msg.sender]++;
        tasks[msg.sender].push(
            Task({
                content: _content,
                completed: false
            })
        );
        emit TaskCreated(_content, false, taskCount[msg.sender]);
    }

    function toggleCompleted(uint _index) public {
        Task storage task = tasks[msg.sender][_index];
        task.completed = !task.completed;
        emit TaskCompleted(_index, task.completed);
    }
  
    function deleteTask(uint _index) public {
        taskCount[msg.sender]--;
        tasks[msg.sender][_index] = tasks[msg.sender][tasks[msg.sender].length - 1];
        tasks[msg.sender].pop();
        emit TaskDeleted(taskCount[msg.sender]);
    }

    function updateTask(uint _index, string memory _content) public{
        Task storage task = tasks[msg.sender][_index];
        task.content = _content;
        emit TaskUpdated(_index, task.content);
    }

}