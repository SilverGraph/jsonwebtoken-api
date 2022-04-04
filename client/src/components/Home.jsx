// eslint-disable-next-line
import Axios from 'axios'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function Home() {
  const [user, setUser] = useState()

  useEffect(() => {
    let cancel = false
    Axios({
      method: "GET",
      withCredentials: true,
      url: 'http://localhost:5000/api/home'
    })
    // .then(res => console.log(res.data))
    .then(res => {
      if(cancel) return
      if(res.data !== 'Access denied!') setUser({...user, ...res.data}); else setUser(null)
    })
    
      return () => {
      cancel = true
    }
  })
  
  return (
    <div className="App">
        <Navbar />
        {(!user) ? <h1>Home</h1> : <h1>Welcome back {user.name}</h1>}
        
    </div>
  )
}
