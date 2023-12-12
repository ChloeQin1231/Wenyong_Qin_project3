import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AddTwit } from '../common/AddTwit.jsx';
import axios from 'axios';
import { Twit } from '../common/Twit.jsx';
import { useParams } from 'react-router';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export default function Profile () {
  const { id } = useParams();
  const user = useSelector(state => state.user.user);
  const [profile, setProfile] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfile = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/' + id);
      setProfile(res.data.data);
    } catch (err) {
      alert(err?.response?.data.msg ?? err.message ?? err);
    }
  }, [id]);

  const getTwits = useCallback(async () => {
    try {
      const res = await axios.get('/api/twit/?by=' + id);
      setList(res.data.data);
    } catch (err) {
      alert(err?.response?.data.msg ?? err.message ?? err);
    }
  }, [id]);

  useEffect(() => {
    (async function () {
      await getProfile();
      await getTwits();
      setLoading(false);
    })();
  }, [getTwits, getProfile]);

  if (loading) {
    return <Alert>Loading...</Alert>;
  }

  console.log(loading, profile);
  if (!profile) {
    return <Alert variant={'warning'}>Load profile error</Alert>;
  }

  return <div>
    <div className={'mb-5'}>
      <h1>{profile.nickname} <small className={'text-muted fs-5'}>@{profile.username}, joined
        at {DateTime.fromISO(profile.joined).toLocaleString()}</small></h1>
      <div className={'text-muted'}>{profile.bio || 'This user has no bio yet.'}</div>
      {
        user && user._id === profile._id && <div className={'mt-2'}>
          <Link to={'/profile/edit'}>Edit Profile</Link>
        </div>
      }
    </div>

    {
      !!user && user._id === id && <AddTwit update={getTwits}/>
    }

    <div className={'twits'}>
      {
        list.map(v => <Twit key={v._id} data={v} update={getTwits}/>)
      }
    </div>

  </div>;
}
