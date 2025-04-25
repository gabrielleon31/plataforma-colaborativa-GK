import React, { useEffect, useState } from 'react';
import api from './axiosConfig';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    api.get('projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error al cargar proyectos:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('projects/', {
      title,
      description,
      date_start: '2025-04-24',
      date_end: '2025-06-30'
    })
      .then(res => {
        setProjects(prev => [...prev, res.data]);
        setTitle('');
        setDescription('');
      })
      .catch(err => console.error('Error al crear proyecto:', err));
  };

  return (
    <div>
      <h2>Proyectos</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título del proyecto"
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
        <button type="submit">Crear proyecto</button>
      </form>

      <h3>Lista de proyectos:</h3>
      <ul>
        {projects.map(proj => (
          <li key={proj.id}>{proj.title} — {proj.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
