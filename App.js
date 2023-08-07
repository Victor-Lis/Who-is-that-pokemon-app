import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'

import Routes from './src/Router/Routes';
import Login from './src/Components/Login';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [userID, setUserID] = useState(null)

  async function getUserUid() {

    let userid;
    // userid = await AsyncStorage.getItem('@useruid')

    if (userid) {

      setUserID(userid)

    }

  }

  useEffect(() => {

    getUserUid()

  }, [])

  return (

    <>

      <StatusBar hidden={true} />
      {userID ? (

        <Routes userID={userID} setUserID={setUserID}/>

      ) : (

        <>
          <StatusBar hidden={true} />
          <Login setUserID={setUserID} />
        </>

      )}

    </>

  );
}
