import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button, 
    Dialog, 
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import axios from 'axios';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await axios({
        method: "GET",
        withCredentials: true,
        url: 'http://localhost:5000/api/delete'
    })
    .then(res => console.log(res.data))
    .then(() => {
        setOpen(false)
        window.location = "/api/home"
    })
  }

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" startIcon={<DeleteIcon />}>
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete account?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your account cannot be retrieved once deleted.
            Are you sure that you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
