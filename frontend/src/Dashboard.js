import React, { useEffect, useState } from 'react';
import api from './axiosConfig';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('dashboard/task-stats/')
      .then(res => setStats(res.data))
      .catch(err => console.error("Error al cargar estadísticas:", err));
  }, []);

  return (
    <div>
      <h2>Estadísticas de Tareas</h2>
      {!stats ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <ul>
          <li>Total de tareas: {stats.total_tasks}</li>
          <li>Pendientes: {stats.pending}</li>
          <li>En progreso: {stats.in_progress}</li>
          <li>Completadas: {stats.completed}</li>
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
