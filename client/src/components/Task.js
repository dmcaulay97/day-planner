import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_TASK, UPDATE_TASK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { ListItemSecondaryAction } from '@material-ui/core';

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
	}

}));

// Verify the token and logged in user information
const token = Auth.loggedIn() ? Auth.getToken() : null;
let profile = '';
let currentUser = '';


if(token) {
  profile = Auth.getProfile();
  console.log(profile);
  currentUser = profile.data._id
  console.log(currentUser);
}

function Task() {
  const classes = useStyles();
  const [formState, setFormState] = useState({ title: ''});

  const [addTask] = useMutation(SAVE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const { loading, data } = useQuery(QUERY_ME);
  
  const tasks = data?.me.tasks || [];
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const mutationResponse = await addTask({
      variables: {
        title: formState.title,
      }
    });
    console.log(mutationResponse);

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCheckChange = async (e) => {
    e.preventDefault();
    console.log(e.target.value, e.target.checked)
    const mutationResponse = await updateTask({
      variables: {
        _id: e.target.value,
        completed: e.target.checked,
      }
    })
    
  };

  return (
    <>
      <Grid container className={classes.root}>
        <CssBaseline />
        <div className={classes.paper} m={1}>
          <Typography variant="h5">
              To Do List
          </Typography>
        </div>
        <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
        <Grid container spacing={2} justifyContent={'space-around'}>
          <Grid container justifyContent="space-around">
            <TextField
              variant="outlined"
              margin="dense"
              required
              size="small"
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              onChange={handleChange}
            />
          </Grid>
          <Grid container justifyContent="space-around">
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                startIcon={<SaveIcon />}
                disabled={!(formState.title)}
              >
              Save Task
              </Button>
            </Box>
          </Grid>
          <Grid container justifyContent="space-around">
            <List component="nav" className={classes.root} aria-label="tasks">
              <ListSubheader component="div" id="nested-list-subheader" color="primary"> 
                TO DO HISTORY
              </ListSubheader>
              {tasks.map((task) => (
                <ListItem dense button key={task._id}>
                  <ListItemText>
                    {task.title}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Checkbox 
                      edge="end"
                      checked={task.completed}
                      value={task._id}
                      onChange={handleCheckChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                ))}
            </List>
            </Grid>
		      </Grid>
        </form>
      </Grid>
    </>
  )
}

export default Task
