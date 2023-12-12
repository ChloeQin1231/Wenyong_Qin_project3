import React, { useState } from 'react';
import agent from 'axios';
import { actions } from '../store/slices/user';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import { Row, Col, Button, FormLabel, FormControl } from 'react-bootstrap';
import { commonOnChange } from '../common/form.js';

export default function Signup () {
  const [form, setForm] = useState({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const store = useStore();
  const navigate = useNavigate();

  async function onSubmit (e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('passwords not match!')
      return
    }
    try {
      const signup = await agent.post('/api/auth/signup', form);
      store.dispatch(actions.login(signup.data.data));
      navigate('/');
    } catch (err) {
      alert(err?.response?.data.msg ?? err.message ?? err);
    }
  }

  return <Row>
    <Col lg={5} md={6}>
      <form onSubmit={onSubmit}>
        <h1 className={'mb-5'}>Sign Up</h1>
        <div className={'mb-3'}>
          <FormLabel>Username</FormLabel>
          <FormControl type={'text'} size={'lg'} required name={'username'} value={form.username}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <FormLabel>Nickname</FormLabel>
          <FormControl type={'text'} size={'lg'} required name={'nickname'} value={form.nickname}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <FormLabel>Password</FormLabel>
          <FormControl type={'password'} size={'lg'} required name={'password'} value={form.password}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl type={'password'} size={'lg'} required name={'confirmPassword'} value={form.confirmPassword}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <Button variant={'primary'} type={'submit'} size={'lg'}>Sign Up</Button>
        </div>
      </form>
    </Col>
  </Row>;
}
