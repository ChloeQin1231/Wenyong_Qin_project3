import React, { useState } from 'react';
import agent from 'axios';
import { actions } from '../store/slices/user';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import { Row, Col, Button, FormLabel, FormControl } from 'react-bootstrap';
import { commonOnChange } from '../common/form.js';
import { Link } from 'react-router-dom';

export default function Login () {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const store = useStore();
  const navigate = useNavigate();

  async function onSubmit (e) {
    e.preventDefault();
    try {
      const login = await agent.post('/api/auth/login', form);
      store.dispatch(actions.login(login.data.data));
      navigate('/');
    } catch (err) {
      alert(err?.response?.data.msg ?? err.message ?? err);
    }
  }

  return <Row>
    <Col lg={5} md={6}>
      <form onSubmit={onSubmit}>
        <h1 className={'mb-5'}>Login to TwitterApp</h1>
        <div className={'mb-3'}>
          <FormLabel>Username</FormLabel>
          <FormControl type={'text'} size={'lg'} required name={'username'} value={form.username}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <FormLabel>Password</FormLabel>
          <FormControl type={'password'} size={'lg'} required name={'password'} value={form.password}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <Button variant={'primary'} type={'submit'} size={'lg'}>Log In</Button>
        </div>
        <p>No account yet? <Link to={'/signup'}>Sign Up here!</Link></p>
      </form>
    </Col>
  </Row>;
}
