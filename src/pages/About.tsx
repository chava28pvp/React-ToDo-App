import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-4">
      <h1>About</h1>
      <p>
        This is a simple Todo List application built with React, TypeScript, and Bootstrap.
        It allows users to register, login, and manage their tasks.
      </p>
      <p>
        Features include:
      </p>
      <ul>
        <li>User authentication (login/register)</li>
        <li>Create, view, update, and delete tasks</li>
        <li>Filter tasks by status (all, completed, pending)</li>
        <li>Responsive design</li>
      </ul>
    </Container>
  );
};

export default About;