import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import './UsersView.css';

const SITE_USER_AVATARS = {
  'john@mail.com': 'https://i.imgur.com/LDOO4Qs.jpg',
  'maria@mail.com': 'https://i.imgur.com/DTfowdu.jpg',
  'admin@mail.com': 'https://i.imgur.com/yhW6Yw1.jpg',
};

const FALLBACK_AVATARS = [
  'https://i.imgur.com/LDOO4Qs.jpg',
  'https://i.imgur.com/DTfowdu.jpg',
  'https://i.imgur.com/yhW6Yw1.jpg',
];

export default function UsersView() {
  const { items, loading, error, create, update, remove } = useUsers();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer', avatar: '' });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', role: 'customer', avatar: '' });
    setEditing(null);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      avatar: form.avatar || SITE_USER_AVATARS[form.email] || 'https://i.imgur.com/LDOO4Qs.jpg',
    };

    try {
      if (editing) {
        await update(editing.id, payload);
        setMessage('Sobreviviente actualizado correctamente.');
      } else {
        await create(payload);
        setMessage('Sobreviviente registrado.');
      }
      resetForm();
    } catch (err) {
      setMessage(err.message || 'Error en el protocolo.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name ?? '',
      email: item.email ?? '',
      password: '',
      role: item.role ?? 'customer',
      avatar: item.avatar ?? '',
    });
    setMessage('');
  };

  const handleDelete = async (item) => {
    if (!confirm(`¿Expulsar a "${item.name}" del refugio?`)) return;
    await remove(item.id);
  };

  if (loading) {
    return <div className="scrap-state">Escaneando supervivientes...</div>;
  }

  if (error) {
    return <div className="scrap-state scrap-state--error">Fallo de comunicación: {error.message}</div>;
  }

  return (
    <div className="users-view">
      <div className="scrap-header">
        <div>
          <h1>REGISTRO DE SUPERVIVIENTES</h1>
          <p>
            Miembros autorizados dentro del refugio. Mantén actualizado el registro para acceder a recursos,
            intercambios y protocolos de defensa.
          </p>
        </div>
        <button className="scrap-button scrap-button--accent" onClick={() => resetForm()}>
          + NUEVO SUPERVIVIENTE
        </button>
      </div>

      <div className="scrap-panel">
        <form className="scrap-form" onSubmit={handleSubmit}>
          <h2>{editing ? 'Editar superviviente' : 'Registrar superviviente'}</h2>

          <label>
            Nombre
            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="text"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              required={!editing}
              placeholder={editing ? 'Dejar vacío para mantener actual' : ''}
            />
          </label>

          <label>
            Avatar URL
            <input
              value={form.avatar}
              onChange={(e) => setForm((prev) => ({ ...prev, avatar: e.target.value }))}
            />
          </label>

          <label>
            Rol
            <select
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
            >
              <option value="customer">Sobreviviente</option>
              <option value="admin">Líder</option>
            </select>
          </label>

          <div className="scrap-form-actions">
            <button className="scrap-button scrap-button--accent" type="submit" disabled={saving}>
              {saving ? 'Procesando...' : editing ? 'Actualizar' : 'Registrar'}
            </button>
            {editing && (
              <button className="scrap-button scrap-button--ghost" type="button" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {message && <div className="scrap-state">{message}</div>}

      <div className="scrap-grid">
        {items.map((item) => {
          const name = item?.name ?? 'Desconocido';
          const email = item?.email ?? '';
          const image =
            item?.avatar ||
            SITE_USER_AVATARS[email] ||
            FALLBACK_AVATARS[Number(item?.id || 0) % FALLBACK_AVATARS.length];

          return (
            <div className="scrap-card" key={item.id}>
              <span className="scrap-badge">{item?.role?.toUpperCase() ?? 'SIN_ROLE'}</span>

              <div className="scrap-card__media">
                <img src={image} alt={name} loading="lazy" />
              </div>

              <div className="scrap-card__body">
                <h3>{name}</h3>
                <p>{email}</p>
              </div>

              <div className="scrap-card__footer">
                <span className="scrap-price">ID: {item.id}</span>
                <div className="scrap-card__actions">
                  <button className="scrap-button scrap-button--ghost" onClick={() => handleEdit(item)}>Editar</button>
                  <button className="scrap-button scrap-button--danger" onClick={() => handleDelete(item)}>Borrar</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
