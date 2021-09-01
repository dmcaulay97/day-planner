import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardHeader, TextField, Grid,
    Divider, Typography
} from '@material-ui/core';

const user = {
  username: '',
  email: ''
};

const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

const Profile = (props) => {
    (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.username}
        </Typography>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.email}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Add Subscription
      </Button>
    </CardActions>
  </Card>
);

  return (
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
                label="User name"
                name="userName"
                onChange={handleChange}
                required
                value={values.userName}
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
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
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
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
}



export default Profile;