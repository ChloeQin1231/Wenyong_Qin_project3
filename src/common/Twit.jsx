import { useSelector } from 'react-redux';
import { Button, Card, FormControl, Modal } from 'react-bootstrap';
import { DateTime } from 'luxon';
import axios from 'axios';
import { useState } from 'react';
import { commonOnChange } from './form.js';
import { useNavigate } from 'react-router';

export function Twit ({ data, update }) {
  const user = useSelector(state => state.user.user);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ text: data.text });
  const navigate = useNavigate();

  return <>
    <Card className={'mb-4'} style={{ cursor: 'pointer' }} onClick={() => {
      navigate('/profile/' + data.by._id);
    }}>
      <Card.Body>
        <Card.Text
          className={'text-muted'}>{data.by.nickname}@{data.by.username} &middot; {DateTime.fromISO(data.at).toRelative()}</Card.Text>
        <Card.Text className={'fs-4'}>{data.text}</Card.Text>
        {
          !!user && user._id === data.by._id && <div className={'d-flex gap-2'}>
            <Button size={'sm'} variant={'light'} onClick={(e) => {
              e.stopPropagation()
              setShowEdit(true);
              setForm({ text: data.text });
            }}>Edit</Button>
            <Button size={'sm'} variant={'light'} onClick={async (e) => {
              e.stopPropagation()
              if (confirm('Delete this twit?')) {
                try {
                  await axios.delete('/api/twit/' + data._id);
                  update();
                } catch (err) {
                  alert(err?.response?.data.msg ?? err.message ?? err);
                }
              }
            }}>Delete</Button>
          </div>
        }
      </Card.Body>
    </Card>
    <Modal show={showEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Twit</Modal.Title>
      </Modal.Header>

      <form onSubmit={async (e) => {
        e.preventDefault();
        try {
          await axios.put('/api/twit/' + data._id, form)
            .then(() => {
              setForm({ text: '' });
              setShowEdit(false);
              update();
            });
        } catch (err) {
          alert(err?.response?.data.msg ?? err.message ?? err);
        }
      }}>


        <Modal.Body>

          <FormControl type={'text'} required name={'text'} placeholder={'Say something...'} value={form.text}
                       onChange={commonOnChange(setForm)} autoFocus={true}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Close</Button>
          <Button variant="primary" type={'submit'}>Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  </>;
}