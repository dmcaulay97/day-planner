import React from 'react';
import Subscription from './Subscription';
import { useState } from 'react';
import AppBar from './Appbar';
import { useQuery, useMutation } from '@apollo/client';
import  { QUERY_ME } from '../utils/queries';
import { UPDATE_USER} from '../utils/mutations';
import {Box, Button, Card, CardContent, CardHeader, TextField, Grid,
    Divider, 
} from '@material-ui/core';



const Profile = (props) => {

    
    

const [ username, setUsername] = useState({username: ''});

const [ email, setEmail] = useState({email: ''});

const [ password, setPassword] = useState({password: ''});

const [ updateUser ] = useMutation(UPDATE_USER)

const handleUsername = (event) => {
    setUsername(event.target.value);
  };
const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
      setPassword(event.target.value);
  };
  const handleSubmit = async ()  => {
    const response = await updateUser({
        variables: {
            username: username,
            email: email,
            password: password
        }
    })
  }

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];
  
 
  return (
    <Grid container component="main" justifyContent={'space-evenly'}>
    <Grid item xs={12}>
    <AppBar />
  </Grid>

    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Edit your login info"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the username"
                name="username"
                placeholder={user.username}
                onChange={handleUsername}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                name="email"
                placeholder={user.email}
                onChange={handleEmail}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Enter your password"
                name="password"
                onChange={handlePassword}
                required
                type='password'
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
    <Grid>
        <Card>
    <h5>Become a member!</h5>
        <Subscription />
        </Card>
    </Grid>
    </Grid>
  );
}



export default Profile;