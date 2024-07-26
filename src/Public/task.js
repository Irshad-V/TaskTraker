const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.name-task-edit');
const taskCompletedDOM = document.querySelector('.completed-task-edit');
const editFormDOM = document.querySelector('.form-single-task');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = new URLSearchParams(window.location.search);
const url = 'https://tasktraker-1.onrender.com/api/v1/tasks';

const id = params.get('id');
let tempName;

const showTask = async () => {
    try {
        const { data: task } = await axios.get(`${url}/${id}`);
        console.log(task)
        const { _id: taskID, completed, name } = task;
        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        taskCompletedDOM.checked = completed;
    } catch (error) {
        console.error(error);

    }
};

showTask();

editFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    editBtnDOM.textContent = 'Loading...';
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;
        await axios.patch(`${url}/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        showTask();
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Success, task edited';
        formAlertDOM.classList.add('text-success');

    } catch (error) {
        console.error(error);
        taskNameDOM.value = tempName;
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Error, please try again';
        formAlertDOM.classList.add('text-danger');
    }
    editBtnDOM.textContent = 'Edit';
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success', 'text-danger');
    }, 3000);
});
