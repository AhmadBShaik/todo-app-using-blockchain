import TodoListJSON from '../build/contracts/TodoList.json';

const contract = require('@truffle/contract')
import Web3 from 'web3';

export const load = async () => {
    await loadWeb3();
    const accountAddress = await loadAccount();
    const {todoContract, tasks, tasksCount} = await loadContract(accountAddress);
    return {accountAddress, todoContract, tasks, tasksCount}
    // return {accountAddress}
}


const loadAccount = async () => {
    const accountAddress = await web3.eth.getCoinbase();
    return accountAddress;
}

const loadTasks = async (contract, accountAddress) => {
    const tasksCount = await contract.taskCount(accountAddress);
    const tasks = [];

    for(let i=0;i<tasksCount;i++){
        const task = await contract.tasks(accountAddress, i);
        tasks.push(task);
    }

    return {tasksCount, tasks};
}

const loadContract = async (accountAddress) => {
    const theContract = await contract(TodoListJSON);
    theContract.setProvider(web3.eth.currentProvider);

    const todoContract = await theContract.deployed();
    const {tasksCount, tasks} = await loadTasks(todoContract, accountAddress);

    return {todoContract, tasks, tasksCount}
}

const loadWeb3 = async () => {
    if(window.ethereum){
        window.web3 = new Web3(ethereum);
        try{
            await ethereum.enable();
        }catch(e){
            console.log(e);
        }
    }else if(window.web3){
        window.web3 = new Web3(web3.currentProvider);
    }else{
        console.log("Metamask is not installed");
    }
}