import React from 'react'
import Navbar from "./Navbar"
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
// import {Button} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from "./ConfirmationModal"

export default function Dashboard() {
    const [loggedUser, setLoggedUser] = React.useState({})
    const navigate = useNavigate()
    
    React.useEffect(() => {
        let cancel = false
        const fetchData = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: 'http://localhost:5000/api/dashboard'
        })
        .then(res => {
            if(cancel) return
            if(res.data !== 'Access denied!') 
              setLoggedUser({...loggedUser, ...res.data})
            else navigate('/api/user/login')
          })
        // .then(res => setLoggedUser({...loggedUser, name: res.data.name, email: res.data.email}))
        // .then(() => console.log(loggedUser))
        }
        fetchData();

        return () => {
          cancel = true;
        }
    })

  return (
    <div>
        <Navbar />
        <h1>{loggedUser.name}</h1>
        <h1>{loggedUser.email}</h1>
        <ConfirmationModal userId={loggedUser._id} />
        {/* <Button variant="contained" startIcon={<DeleteIcon />}>
          Delete Account
        </Button> */}
    </div>
  )
}
