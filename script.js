const STORAGE_KEY = 'taskflow-tasks';
const THEME_KEY = 'taskflow-theme';
let tasks = loadTasks();
let activeFilter = 'all';

const elements = {
  form: document.querySelector('#taskForm'), taskInput: document.querySelector('#taskInput'), priority: document.querySelector('#priorityInput'), dueDate: document.querySelector('#dueDateInput'), message: document.querySelector('#formMessage'),
  list: document.querySelector('#taskList'), template: document.querySelector('#taskTemplate'), empty: document.querySelector('#emptyState'), emptyTitle: document.querySelector('#emptyTitle'), emptyText: document.querySelector('#emptyText'), total: document.querySelector('#totalCount'), completed: document.querySelector('#completedCount'), search: document.querySelector('#searchInput'), filters: document.querySelector('.filters'), theme: document.querySelector('#themeToggle'),
  dialog: document.querySelector('#editDialog'), editForm: document.querySelector('#editForm'), editInput: document.querySelector('#editTaskInput'), editPriority: document.querySelector('#editPriorityInput'), editDueDate: document.querySelector('#editDueDateInput'), closeEdit: document.querySelector('#closeEdit'), cancelEdit: document.querySelector('#cancelEdit')
};

function loadTasks() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(saved) ? saved : []; } catch { return []; } }
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
function makeId() { return `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function formatDate(value) { if (!value) return ''; const date = new Date(`${value}T00:00:00`); return `Due ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`; }

function render() {
  const query = elements.search.value.trim().toLowerCase();
  const visibleTasks = tasks.filter(task => (activeFilter === 'all' || activeFilter === 'active' && !task.completed || activeFilter === 'completed' && task.completed) && task.title.toLowerCase().includes(query));
  elements.list.replaceChildren();
  visibleTasks.forEach(task => {
    const node = elements.template.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id; node.classList.toggle('completed', task.completed);
    const checkbox = node.querySelector('.task-checkbox'); checkbox.checked = task.completed; checkbox.setAttribute('aria-label', task.completed ? 'Mark task as active' : 'Mark task as complete');
    node.querySelector('.task-title').textContent = task.title;
    const priority = node.querySelector('.priority-badge'); priority.textContent = `${task.priority} priority`; priority.classList.add(`priority-${task.priority}`);
    const due = node.querySelector('.due-date'); if (task.dueDate) due.textContent = formatDate(task.dueDate); else due.remove();
    elements.list.append(node);
  });
  elements.total.textContent = tasks.length;
  elements.completed.textContent = tasks.filter(task => task.completed).length;
  elements.empty.hidden = visibleTasks.length !== 0;
  if (!visibleTasks.length && tasks.length) { elements.emptyTitle.textContent = 'No matching tasks'; elements.emptyText.textContent = 'Try a different search or filter.'; } else { elements.emptyTitle.textContent = 'No tasks yet'; elements.emptyText.textContent = 'Add your first task above to get your day moving.'; }
}

function addTask(event) { event.preventDefault(); const title = elements.taskInput.value.trim(); if (!title) { elements.message.textContent = 'Please enter a task before adding it.'; elements.taskInput.focus(); return; } tasks.unshift({ id: makeId(), title, priority: elements.priority.value, dueDate: elements.dueDate.value, completed: false }); saveTasks(); elements.form.reset(); elements.priority.value = 'medium'; elements.message.textContent = ''; render(); elements.taskInput.focus(); }
function getTaskById(id) { return tasks.find(task => String(task.id) === String(id)); }
function openEdit(task) { if (!task) return; elements.editForm.dataset.taskId = task.id; elements.editInput.value = task.title; elements.editPriority.value = task.priority; elements.editDueDate.value = task.dueDate || ''; elements.dialog.hidden = false; elements.editInput.focus(); }
function closeEdit() { elements.dialog.hidden = true; delete elements.editForm.dataset.taskId; }
function applyTheme(theme) { document.body.classList.toggle('dark', theme === 'dark'); elements.theme.querySelector('span').textContent = theme === 'dark' ? '☀' : '☾'; elements.theme.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); }

elements.form.addEventListener('submit', addTask);
elements.search.addEventListener('input', render);
elements.filters.addEventListener('click', event => { const button = event.target.closest('[data-filter]'); if (!button) return; activeFilter = button.dataset.filter; document.querySelectorAll('.filter-button').forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', selected); }); render(); });
elements.list.addEventListener('change', event => { if (!event.target.matches('.task-checkbox')) return; const task = getTaskById(event.target.closest('.task-item').dataset.id); if (task) { task.completed = event.target.checked; saveTasks(); render(); } });
elements.list.addEventListener('click', event => { const row = event.target.closest('.task-item'); if (!row) return; const task = getTaskById(row.dataset.id); if (event.target.closest('.edit-button')) openEdit(task); if (event.target.closest('.delete-button') && task) { tasks = tasks.filter(item => String(item.id) !== String(task.id)); saveTasks(); render(); } });
elements.editForm.addEventListener('submit', event => { event.preventDefault(); const title = elements.editInput.value.trim(); if (!title) { elements.editInput.focus(); return; } const task = getTaskById(elements.editForm.dataset.taskId); if (!task) return; task.title = title; task.priority = elements.editPriority.value; task.dueDate = elements.editDueDate.value; saveTasks(); closeEdit(); render(); });
[elements.closeEdit, elements.cancelEdit].forEach(button => button.addEventListener('click', closeEdit));
elements.dialog.addEventListener('click', event => { if (event.target === elements.dialog) closeEdit(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !elements.dialog.hidden) closeEdit(); });
elements.theme.addEventListener('click', () => { const next = document.body.classList.contains('dark') ? 'light' : 'dark'; localStorage.setItem(THEME_KEY, next); applyTheme(next); });
applyTheme(localStorage.getItem(THEME_KEY) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
render();
