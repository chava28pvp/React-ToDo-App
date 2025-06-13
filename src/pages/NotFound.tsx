import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button 
        variant="primary" 
        size="lg"
        onClick={() => navigate(-1)} // Vuelve a la página anterior
        className="me-3"
      >
        Go Back
      </Button>
      <Button 
        variant="outline-primary" 
        size="lg"
        onClick={() => navigate('/')} // Va al inicio (login)
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;