import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Navbar, Nav, Container, NavDropdown
} from 'react-bootstrap';
import { useSelector, useStore } from 'react-redux';
import agent from 'axios';
import { useNavigate } from 'react-router';
import { actions } from './store/slices/user.js';

export default function Layout () {
  const store = useStore();
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  function logout () {
    agent.put('/api/auth/logout')
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        store.dispatch(actions.logout());
        navigate('/');
      });
  }

  const loginedControls = <>
    <NavDropdown title={user?.nickname}>
      <NavDropdown.Item as={Link} to={'/profile/' + user?._id}>Profile</NavDropdown.Item>
      <NavDropdown.Divider/>
      <NavDropdown.Item href="#" onClick={logout}>Log Out</NavDropdown.Item>
    </NavDropdown>
  </>;
  const notLoginedConttrols = <>
    <Nav.Link as={Link} to="/login">Log In</Nav.Link>
    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
  </>;

  return (
    <div>
      <header className={'mb-4'}>
        <Navbar expand={'md'}>
          <Container>
            <Navbar.Brand as={Link} to="/">TwitterApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav"/>
            <Navbar.Collapse id={'navbar-nav'}>
              <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
              </Nav>
              <Nav className={'flex-grow-1'}/>
              <Nav>
                {
                  user ? loginedControls : notLoginedConttrols
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Container>
        <Outlet/>
      </Container>
    </div>
  );
}
