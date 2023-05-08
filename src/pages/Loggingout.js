import React, { useState } from "react";
import {  Alert, Button } from "react-bootstrap";
import { useAuth } from "../context/ContextFirebase";
import {  useNavigate } from "react-router-dom";

const Loggingout = () => {
  const [error, setError] = useState("");
  const {  logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div>



      <div className="w-100 text-center m-2">
      {error && <Alert variant="danger">{error}</Alert>}
        <Button className="btn btn-danger" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

    </div>
  )
}

export default Loggingout