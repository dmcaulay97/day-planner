import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkSection: {
    display: 'flex',
    alignItems: 'right'
  },
  navLinks: {
    textDecoration: 'none',
    color: '#fff',
    "&:hover": {
      borderBottom: "3px solid #fff",
      color: '#fff'
    }
  }

}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{position: 'sticky', marginBottom: '70px', zIndex: 2}}>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.linkSection}>
            <Link to='/Calendar' className={classes.navLinks}>
              <Button color="inherit">Calendar</Button>
            </Link>
            <Link to='/About' className={classes.navLinks}>
              <Button color="inherit">About</Button>
            </Link>
            <Link to='/' className={classes.navLinks}>
              <Button color="inherit">Logout</Button>
            </Link>
          </div>      
        </Toolbar>
      </AppBar>
    </div>
  );
}
