import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useUserStore, UPDATE_USER_MUTATION } from "../shared";

const UserDetail = () => {
  const { user, handleSetUser } = useUserStore();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    userType: "",
  });
  const navigate = useNavigate();

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          id: user?.id,
          ...formData,
        },
      });
      handleSetUser(data.updateUser);
      navigate("/products");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="mt6 mw8 center pa4 bg-white shadow-1 br3">
      <button
        onClick={() => window.history.back()}
        style={{
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        Volver
      </button>
      <h1 className="f2 lh-title black">Edit User Details</h1>
      <form onSubmit={handleSubmit} className="measure center">
        <div className="">
          <label htmlFor="username" className="db fw6 lh-copy f5">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="input-reset ba b--moon-gray pa3 mb2 db w-100 br2"
          />
        </div>
        <div className="">
          <label htmlFor="name" className="db fw6 lh-copy f5">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="input-reset ba b--moon-gray pa3 mb2 db w-100 br2"
          />
        </div>
        <div className="">
          <label htmlFor="lastName" className="db fw6 lh-copy f5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input-reset ba b--moon-gray pa3 mb2 db w-100 br2"
          />
        </div>
        <div className="">
          <label htmlFor="email" className="db fw6 lh-copy f5">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="input-reset ba b--moon-gray pa3 mb2 db w-100 br2"
          />
        </div>
        <div className="">
          <label htmlFor="userType" className="db fw6 lh-copy f5">
            User Type
          </label>
          <input
            type="text"
            name="userType"
            id="userType"
            value={formData.userType}
            onChange={handleChange}
            className="input-reset ba b--moon-gray pa3 mb2 db w-100 br2"
          />
        </div>
        <div className="mt4">
          <button
            type="submit"
            className="f5 link dim br2 ph3 pv3 mb2 dib white bg-blue"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
