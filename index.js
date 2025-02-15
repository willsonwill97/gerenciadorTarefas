document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const tagInput = document.getElementById('tag-input');
    const taskList = document.getElementById('task-list');
    const completedCount = document.getElementById('completed-count');

    let tasks = [];

    // renderizar a tarefa 
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.innerHTML = `
               <span class="${task.completed ? 'completed' : ''}">${task.name} ${task.tag ? `<span class="tag">${task.tag}</span>` : ''}</span>
                <button class="complete-btn" data-index="${index}">${task.completed ? '✔️' : 'Concluir'}</button>
            `;
            taskList.appendChild(taskDiv);
        });

    }

    // tarefas concluídas
    function updateCompletedCount() {
        const completedTasks = tasks.filter(task => task.completed).length;
        completedCount.textContent = completedTasks;
    }

    // Adicionar nova tarefa
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            name: taskInput.value,
            tag: tagInput.value , // Adiciona a etiqueta
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        tagInput.value = ''; // Limpa a regiao da etiqueta
        renderTasks();
        updateCompletedCount();
    });

    // Marcar como concluída
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            const index = e.target.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
            updateCompletedCount();
        }
    });

    renderTasks();
});