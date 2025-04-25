import React, { useEffect, useState } from 'react';
import api from './axiosConfig';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [state, setState] = useState('pendiente');
  const [priority, setPriority] = useState('media');
  const [project, setProject] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = () => {
    api.get('tasks/')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error al cargar tareas:', err));
  };

  const fetchProjects = () => {
    api.get('projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error al cargar proyectos:', err));
  };

  const fetchUsers = () => {
    api.get('accounts/users/admin/')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('tasks/', {
      title,
      description,
      due_date: dueDate,
      state,
      priority,
      project: parseInt(project),
      assigned_users: assignedUsers
    })
      .then(res => {
        setTasks(prev => [...prev, res.data]);
        setTitle('');
        setDescription('');
        setDueDate('');
        setState('pendiente');
        setPriority('media');
        setProject('');
        setAssignedUsers([]);
      })
      .catch(err => console.error('Error al crear tarea:', err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta tarea?")) return;
    api.delete(`tasks/${id}/`)
      .then(() => {
        setTasks(prev => prev.filter(task => task.id !== id));
      })
      .catch(err => console.error('Error al eliminar tarea:', err));
  };

  return (
    <div>
      <h2>Tareas</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />
        <br />
        <select value={state} onChange={e => setState(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <br />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <br />
        <select value={project} onChange={e => setProject(e.target.value)} required>
          <option value="">Seleccionar proyecto</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <br />
        <label>Asignar a:</label>
        <select
          multiple
          value={assignedUsers}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
            setAssignedUsers(selectedOptions);
          }}
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <br />
        <button type="submit">Crear tarea</button>
      </form>

      <h3>Lista de tareas:</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.state} — Prioridad: {task.priority} — Proyecto #{task.project}
            {task.assigned_usernames?.length > 0 && (
              <div>
                Asignado a: {task.assigned_usernames.join(', ')}
                <br />
                <label>Reasignar:</label>
                <select
                  multiple
                  value={task.assigned_users}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(o => parseInt(o.value));
                    api.put(`tasks/${task.id}/`, { assigned_users: selected })
                      .then(res => {
                        setTasks(prev =>
                          prev.map(t => (t.id === task.id ? res.data : t))
                        );
                      })
                      .catch(err => console.error('Error al reasignar:', err));
                  }}
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>
            )}
            <br />
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;