import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AddTwit } from '../common/AddTwit.jsx';
import axios from 'axios';
import { Twit } from '../common/Twit.jsx';
import { Alert } from 'react-bootstrap';

export default function Home () {
  const user = useSelector(state => state.user.user);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTwits = useCallback(async () => {
    try {
      const res = await axios.get('/api/twit/');
      setList(res.data.data);
    } catch (err) {
      alert(err?.response?.data.msg ?? err.message ?? err);
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    getTwits();
  }, [getTwits]);

  return <div>
    {
      !!user && <AddTwit update={getTwits}/>
    }

    {
      loading ? <Alert>Loading...</Alert> : list.length ? <div className={'twits'}>
        {
          list.map(v => <Twit key={v._id} data={v} update={getTwits}/>)
        }
      </div> : <Alert>No twits yet</Alert>
    }
  </div>;
}
