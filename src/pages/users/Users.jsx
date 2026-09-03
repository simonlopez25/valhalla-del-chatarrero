import { useEffect, useState } from "react";
import CreateButton from "../../components/atoms/createButton/CreateButton";
import EditButton from "../../components/atoms/editButton/EditButton";
import DeleteButton from "../../components/atoms/deleteButton/DeleteButton";
import ViewButton from "../../components/atoms/viewButton/ViewButton";
import Pagination from "../../components/molecules/pagination/Pagination";
import UpdateUserModal from "../../components/organisms/updateUserModal/UpdateUserModal";
import { deleteUser } from "../../services/UserServicesDelete.js";
import { fetchAllUsers } from "../../services/usersService";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const usersPerPage = 10;
  

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsers(await fetchAllUsers());
      } catch {
        setError("No se pudieron cargar los registros de usuarios.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <div className="loadingScreen">Cargando registros del páramo...</div>;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  
  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete);
      setUsers(users.filter((user) => user.id !== userToDelete));
      setShowModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
      setError("No se pudo eliminar el registro.");
      setShowModal(false);
    }
  };

  
  const cancelDelete = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleUserUpdated = (message, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <main className="usersMainContainer">
      <div className="usersHeaderSection">
        <div>
          <h1>REGISTRO DE SUPERVIVIENTES</h1>
          <p>Administración del censo del páramo. Añade, modifica o purga registros de individuos conocidos en el sector.</p>
        </div>
        <CreateButton />
      </div>

      {error && <p className="usersError">{error}</p>}

      {successMessage && <p className="usersSuccess">{successMessage}</p>}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>IDENTIDAD</th>
              <th>LOCALIZACIÓN</th>
              <th>CLASIFICACIÓN</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>
                  <div className="identityCell">
                    <img src={user.avatar} alt={user.name} className="userAvatar" />
                    <div>
                      <span className="userName">{user.name}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="userRole">{user.email}</span>
                </td>
                <td>
                  <span className="classificationBadge">{user.role}</span>
                </td>
                <td>
                  <div className="actionButtons">
                    <ViewButton userId={user.id} />
                    <EditButton
                      onClick={() => setEditingUser(user)}
                      ariaLabel={`Actualizar usuario ${user?.name ?? ""}`}
                    />
                    <DeleteButton onClick={() => handleDeleteClick(user.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          currentCount={currentUsers.length}
          totalCount={users.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      
      {showModal && (
        <div className="modalOverlay">
          <div className="modalCard">
            <h2>⚠️ ELIMINAR REGISTRO</h2>
            <p>¿Estás seguro de que deseas eliminar este superviviente del censo del páramo?</p>
            <div className="modalButtons">
              <button className="modalBtnCancel" onClick={cancelDelete}>
                Cancelar
              </button>
              <button className="modalBtnConfirm" onClick={confirmDelete}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {editingUser && (
        <UpdateUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUserUpdated={(message, updatedUser) => {
            setEditingUser(null);
            handleUserUpdated(message, updatedUser);
          }}
        />
      )}
    </main>
  );
}

export default Users;