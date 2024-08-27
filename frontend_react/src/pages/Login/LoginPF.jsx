// LoginPF.jsx
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContextPF";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

const LoginPF = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    await loginUser(email, password);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (loading) {
    return <div>Loading...</div>; // Mostrar una pantalla de carga mientras se verifica el estado de autenticación
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6} className="w-100">
          <img
            className="logo-login"
            src={Logo}
            alt="Logo"
          />
          <Card className="login-card rounded-5 shadow p-4">
            <Card.Title className="text-center my-4 fs-2 fw-bold">
              Login
            </Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    autoFocus
                    {...register("email", {
                      required: "El correo es requerido",
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-5">
                  <div className="float-end">
                    <small>
                      <a href="#" className="text-primary">
                        Olvidaste tu contraseña
                      </a>
                    </small>
                  </div>
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "La contraseña es requerida",
                      })}
                    />
                    <div
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                  </div>
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </Form.Group>
                <Button
                  className="mb-3 btn-lg d-block w-100 rounded-5"
                  variant="primary"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPF;
