import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Axios from "axios"
import { useNavigate } from "react-router-dom"

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Home', 'Dashboard', 'Logout'];

const ResponsiveAppBar = (props) => {
  const [loggedUser, setLoggedUser] = React.useState({})
  const navigate = useNavigate()

  React.useEffect(() => {
    let cancel = false
    const fetchData = async () => {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: 'http://localhost:5000/api/home'
      })
      .then(res => {
        if(cancel) return
        if(res.data !== 'Access denied!') 
          setLoggedUser({...loggedUser, ...res.data})})
    }
    fetchData();

    return () => {
      cancel = true;
    }
  }, [loggedUser])

  // eslint-disable-next-line
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutUser = async () => {
    await Axios({
      method: "GET",
      withCredentials: true,
      url: 'http://localhost:5000/api/user/logout'
    })
    // .then(res => console.log(res))
    .then(window.location = '/')
  }

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    switch (setting) {
      case 'Home':
        navigate(`/api/home`); break;
      case 'Dashboard':
        navigate(`/api/dashboard`); break;
      case 'Logout':
        logoutUser(); break;
      default:
        break;
    }

  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            BRAND
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* {console.log(loggedUser)} */}

          {(!loggedUser._id) ? 
            (<Button onClick={() => navigate('/api/user/login')} color="inherit">Login</Button>) : 
            (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(setting => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                      {/* <Link> */}
                        <Typography textAlign="center">{setting}</Typography>
                      {/* </Link> */}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )
          }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
