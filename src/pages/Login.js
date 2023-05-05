import { React, useRef, useState } from "react";
import { useAuth } from "../context/ContextFirebase";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
 const emailRef = useRef();
 const passwordRef = useRef();
 const { login } = useAuth();
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 async function handleSubmit(e) {
  e.preventDefault();

  try {
   setError("");
   setLoading(true);
   await login(emailRef.current.value, passwordRef.current.value);
   navigate("/control-panel/duyular-update");
  } catch {
   setError("Failed to log in");
  }

  setLoading(false);
 }

 return (
  <div className="mt-5 w-50 m-auto mb-5">
   <Card>
    <Card.Body>
     <h2 className="text-center mb-4">Log In</h2>
     {error && <Alert variant="danger">{error}</Alert>}
     <Form onSubmit={handleSubmit}>
      <Form.Group>
       <Form.Label htmlFor="email">Email</Form.Label>
       <Form.Control id="email" type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group>
       <Form.Label htmlFor="password">Password</Form.Label>
       <Form.Control
        id="password"
        type="password"
        ref={passwordRef}
        required
       />
      </Form.Group>
      <Button disabled={loading} className="w-100 mt-3 " type="submit" style={{ background: "#199db2" }}>
       Log In
      </Button>
     </Form>

    </Card.Body>
   </Card>
  </div>
 )
}

export default Login