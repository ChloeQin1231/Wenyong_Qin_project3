import React, { useState } from 'react';
import agent from 'axios';
import { actions } from '../store/slices/user';
import { useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import { Row, Col, Button, FormLabel, FormControl } from 'react-bootstrap';
import { commonOnChange } from '../common/form.js';

export default function EditProfile () {
  const user = useSelector(state => state.user.user);
  const [form, setForm] = useState({
    nickname: user.nickname,
    bio: user.bio,
  });
  const store = useStore();
  const navigate = useNavigate();

  async function onSubmit (e) {
    e.preventDefault();
    try {
      await agent.put('/api/auth/', form);
      store.dispatch(actions.login({
        ...user,
        ...form,
      }));
      navigate('/profile/' + user._id);
    } catch (err) {
      alert(err?.response?.data.msg ?? err.message ?? err);
    }
  }

  return <Row>
    <Col lg={5} md={6}>
      <form onSubmit={onSubmit}>
        <h1 className={'mb-5'}>Edit Profile</h1>
        <div className={'mb-3'}>
          <FormLabel>Nickname</FormLabel>
          <FormControl type={'text'} size={'lg'} required name={'nickname'} value={form.nickname}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <FormLabel>Bio</FormLabel>
          <FormControl type={'text'} size={'lg'} required name={'bio'} value={form.bio}
                       onChange={commonOnChange(setForm)}/>
        </div>
        <div className={'mb-3'}>
          <Button variant={'primary'} type={'submit'} size={'lg'}>Save</Button>
          <Button variant={'link'} type={'submit'} size={'lg'}
                  onClick={() => navigate('/profile/' + user._id)}>Cancel</Button>
        </div>
      </form>
    </Col>
  </Row>;
}
