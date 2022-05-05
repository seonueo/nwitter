import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import Nweet from 'components/Nweet';

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(dbService, 'nweets'), orderBy('createdAt', 'desc')), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, 'nweets'), {
      text: nweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });
    setNweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNweet(value);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <button value="Nweet" onClick={onSubmit}>
          Nweet
        </button>
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
}
