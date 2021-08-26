import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) =>({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
  paper: {
		margin: theme.spacing(4, 'auto'),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
  submit: {
		margin: theme.spacing(3, 0, 2),
	},
  radios: {
   fontSize: 12,
  }
}));

function Task() {
  const classes = useStyles();

  const [checked, setChecked] = useState([0]);
  // Update this to work with our checkboxes.....M.Mason
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Grid container component="taskSide" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper} m={1}>
          <Typography variant="h5">
              Tasks List
          </Typography>
        </div>
        <form className={classes.form} noValidate>
        <TextField
							variant="outlined"
							margin="dense"
							required
              size="small"
							id="title"
							label="Title"
							name="title"
							autoComplete="title"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="dense"
							required
              size="small"
							name="description"
							label="Description"
							id="description"
							autoComplete="description"
						/>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                startIcon={<SaveIcon />}
              >
              Save Task
              </Button>
            </Box>
         
            <List component="nav" className={classes.root} aria-label="tasks">
              <ListItem dense button>
                <ListItemText primary="Sample task 1" />
              </ListItem>
              <ListItem dense button>
                <ListItemText primary="Sample task 2" />
              </ListItem>
            </List>


		      
        </form>
      </Grid>
    </>
  )
}

export default Task
