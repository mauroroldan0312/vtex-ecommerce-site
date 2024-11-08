import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../shared";

export const Header = () => {
  const { user, handleLogout } = useUserStore();
  const navigate = useNavigate();

  return (
    <header
      id="header-container"
      className="fixed top-0 w-100 bg-dark-gray white flex justify-between items-center pa3"
    >
      <h1 className="ma0">VTEX Ecommerce site</h1>
      <div className="flex items-center">
      {user && <span className="ml3 mr3">Welcome, {user.name}</span>}
      {user && (
        <div className="flex">
        <button
          onClick={() => navigate("/user-detail")}
          className="bg-green-500 mr2 hover:bg-green-700 white font-bold py-2 px-4 rounded ml-2"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 white font-bold py-2 px-4 rounded ml-2"
        >
          Logout
        </button>
        </div>
      )}
      </div>
    </header>
  );
};
