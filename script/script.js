var inputData = document.querySelector('#inputTask');
var btnAddTask = document.querySelector('#btn-add');
var ulList = document.querySelector('#list');
var spans = document.getElementsByTagName('span');


//<li>Task1 <span>Delete</span></li>
function createTask(){
    var inputValue = inputData.value;
    inputData.value = '';

    var newLi = document.createElement('li');
    newLi.innerText = inputValue;

    var newSpan = document.createElement('span');
    newSpan.innerText = ' DELETE';

    newLi.append(newSpan);
    ulList.append(newLi);

    removeTask();
} 

//btnAddTask.onclick = createTask;



function removeTask(){
    for(let spanItem of spans){
        spanItem.onclick = function(){
            spanItem.parentElement.remove();
        }
    }
}

removeTask();


const getTodos = () => {
    fetch('https://todo-app342242.herokuapp.com/api/post?id=1').then(
        res => res.json()
    ).then(
        data =>{
            ulList.innerHTML = '';
            data.forEach((item) => {
                ulList.innerHTML += `
                    <li>${item.content} <span>Delete</span></li>
                `
            })
        } 
    )
}

getTodos();


const postTodo = () => {
    var inputValue = inputData.value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body : JSON.stringify(
            {
                "title": "test",
                "content": inputValue,
                "user_id": 1
            }
        )
    };

    fetch('https://todo-app342242.herokuapp.com/api/post', options).then(
        res => res.json()
    ).then(
        data => console.log(data)
    )
}

btnAddTask.addEventListener('click', postTodo);
btnAddTask.addEventListener('click', createTask);

