const alertFormDOM = document.querySelector('.alert-form');
const formTaskDOM = document.querySelector('.form-task');
const inputTaskDOM = document.querySelector('.input-task');
const containerTasksDOM = document.querySelector('.container-tasks');
const loadingMessageDOM = document.querySelector('.loading-message');
const tasksListDOM = document.querySelector('.tasks-list');



const url = 'http://localhost:8000/api/v1/tasks';



const showAlert = (text, action) => {
    alertFormDOM.textContent = text;
    alertFormDOM.classList.add(action);

    setTimeout(() => {
        alertFormDOM.textContent = '';
        alertFormDOM.classList.remove(action);
    }, 3000);
};



const getTasks = async () => {
    loadingMessageDOM.style.display = 'block';
    try {
        const { data: tasks } = await axios.get(url);
        if (tasks.length < 1) {
            tasksListDOM.innerHTML = '<h5 class="empty-list">No tasks in list</h5>';
            loadingMessageDOM.style.display = 'none';
            return;
        }
        const allTasks = tasks.map((task) => {
            const { _id: taskID, completed, name } = task;
            return `<div class="task ${completed && 'task-complete'}">
                <input type="checkbox" ${completed && 'checked'}>
                <p class="name-task">${name}</p>
                <div class="actions-task">
                <a href="Task.html?id=${taskID}" class="edit-icon">
                 
                    <i class="fas fa-edit"></i>
                  </a>
                  <button type="button" class="delete-icon" data-id="${taskID}">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>`;
        }).join('');
        tasksListDOM.innerHTML = allTasks;
    } catch (error) {
        tasksListDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
    loadingMessageDOM.style.display = 'none';
};

getTasks();


formTaskDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = inputTaskDOM.value;

    try {
        await axios.post(url, { name });
        showAlert('Added Successfully', "alert-success");
        getTasks();
        inputTaskDOM.value = '';
    } catch (error) {
        showAlert("Type somthing..(max-length-20)", 'alert-danger');
        console.log(error);
    }
});


tasksListDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.parentElement.classList.contains('delete-icon')) {
        const id = el.parentElement.dataset.id;
        try {
            await axios.delete(`${url}/${id}`);
            showAlert("Deleted Successfully ", 'alert-success')
            getTasks();
        } catch (error) {
            showAlert("Add Some Text ", 'alert-danger');
        }
    }
});
