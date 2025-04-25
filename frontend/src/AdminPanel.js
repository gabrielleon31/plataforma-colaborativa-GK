
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin-panel.css';

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [token] = useState(localStorage.getItem('accessToken'));

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    rol: 'user',
  });

  useEffect(() => {
    axios.get('/api/accounts/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      if (res.data.rol === 'admin') {
        setIsAdmin(true);
      }
    }).catch(err => {
      console.error("Error al verificar rol:", err);
    });
  }, [token]);

  useEffect(() => {
    if (isAdmin) {
      axios.get('/api/accounts/users/admin/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUsers(res.data);
      }).catch(err => {
        console.error("Error al cargar usuarios:", err);
      });
    }
  }, [isAdmin, token]);

  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    axios.delete(`/api/accounts/users/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setUsers(prev => prev.filter(user => user.id !== id));
    });
  };

  const handleRoleChange = (id, newRole) => {
    axios.put(`/api/accounts/users/${id}/`, { rol: newRole }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUsers(prev =>
        prev.map(user => (user.id === id ? res.data : user))
      );
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    axios.post('/api/accounts/register/', newUser)
      .then(res => {
        alert("Usuario creado correctamente");
        setUsers(prev => [...prev, res.data]);
        setNewUser({ username: '', email: '', password: '', rol: 'user' });
      })
      .catch(err => {
        console.error("Error al crear usuario:", err);
        alert("Error al crear usuario");
      });
  };

  if (!isAdmin) {
    return <p className="admin-error">No tienes acceso a esta sección.</p>;
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">Panel de Administración</h2>

      <div className="admin-form">
        <h3>Crear nuevo usuario</h3>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <select
            value={newUser.rol}
            onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit">Crear</button>
        </form>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.rol}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </td>
                <td>
                  <button
                    className="admin-delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="admin-empty">No hay usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
