import { Button, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { commonOnChange } from './form.js';
import axios from 'axios';

export function AddTwit ({ update }) {
  const [form, setForm] = useState({ text: '' });

  return <div className={'mb-5 bg-secondary p-4 rounded-4 text-white fs-3'}>
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        await axios.post('/api/twit', form)
          .then(() => {
            // alert('twit created!');
            setForm({ text: '' });
            update();
          });
      } catch (err) {
        alert(err?.response?.data.msg ?? err.message ?? err);
      }

    }}>
      <p>Add Twit</p>
      <div className={'mb-3'}>
        <FormControl type={'text'} required name={'text'} placeholder={'Say something...'} value={form.text}
                     onChange={commonOnChange(setForm)}/>
      </div>
      <Button type={'submit'} size={'lg'}>Submit</Button>
    </form>
  </div>;
}