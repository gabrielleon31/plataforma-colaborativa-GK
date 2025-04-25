import React, { useEffect, useState } from 'react';
import api from './axiosConfig';

function Files() {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    fetchFiles();
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchFiles = () => {
    api.get('files/')
      .then(res => setFiles(res.data))
      .catch(err => console.error('Error al cargar archivos:', err));
  };

  const fetchProjects = () => {
    api.get('projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error al cargar proyectos:', err));
  };

  const fetchTasks = () => {
    api.get('tasks/')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error al cargar tareas:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    if (selectedProject) formData.append('project', selectedProject);
    if (selectedTask) formData.append('task', selectedTask);

    api.post('files/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(res => {
        setFiles(prev => [...prev, res.data]);
        setName('');
        setFile(null);
        setSelectedProject('');
        setSelectedTask('');
      })
      .catch(err => console.error('Error al subir archivo:', err));
  };

  return (
    <div>
      <h2>Subida de Archivos</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del archivo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <br />
        <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
          <option value="">Seleccionar proyecto</option>
          {projects.map(proj => (
            <option key={proj.id} value={proj.id}>{proj.title}</option>
          ))}
        </select>
        <br />
        <select value={selectedTask} onChange={e => setSelectedTask(e.target.value)}>
          <option value="">Seleccionar tarea (opcional)</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>{task.title}</option>
          ))}
        </select>
        <br />
        <button type="submit">Subir archivo</button>
      </form>

      <h3>Archivos subidos:</h3>
      <ul>
        {files.map(f => (
          <li key={f.id}>
            <a href={f.file} target="_blank" rel="noopener noreferrer">{f.name}</a>
            {f.project && ` — Proyecto #${f.project}`}
            {f.task && ` — Tarea #${f.task}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Files;
