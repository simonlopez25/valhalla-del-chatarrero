import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { fetchUsers } from "../../services/userService";

import NewSurvivorButton from "../../components/NewSurvivorButton/NewSurvivorButton";
import EditButton from "../../components/NewSurvivorButton/EditButton";
import DeleteButton from "../../components/NewSurvivorButton/DeleteButton";
import ViewButton from "../../components/NewSurvivorButton/ViewButton";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsers(await fetchUsers());
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

  return (
    <main className="usersMainContainer">
      <div className="usersHeaderSection">
        <div>
          <h1>REGISTRO DE SOBREVIVIENTES</h1>
          <p>Administración del censo del páramo. Añade, modifica o purga registros de individuos conocidos en el sector.</p>
        </div>
        <NewSurvivorButton />
      </div>

      {error && <p className="usersError">{error}</p>}

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
                    <EditButton userId={user.id} />
                    <DeleteButton userId={user.id} />
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
    </main>
  );
}

export default Users;