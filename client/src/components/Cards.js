import React from 'react';
import GitHubCard from './Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const MasonCard = {
  name: 'Malcolm Mason',
  github: 'malmason',
  jobTitle: 'Full Stack Web Developer',
  linkedIn: 'https://www.linkedin.com/in/malcolm-mason-1491a31b9/',
  description: 'I am a Full Stack Web Developer as well as a programmer/analyst with 20+ years experience in IT. I specialize in Access and SQL databases.'
};
const QytezaCard = {
  name: 'Michela Qyteza',
  github: 'michelaqyteza',
  jobTitle: 'Full Stack Web Developer',
  linkedIn: 'https://www.linkedin.com/in/malcolm-mason-1491a31b9/',
  description: 'Need to fill in some content from Michela here........'
};
const McaulayCard = {
  name: 'Dylan Mcaulay',
  github: 'dmcaulay97',
  jobTitle: 'Full Stack Web Developer',
  linkedIn: 'https://www.linkedin.com/in/malcolm-mason-1491a31b9/',
  description: 'Math major turned programmer. Looking to break into web development'
};
const TagneCard = {
  name: 'Alain C. Tagne Kuate',
  github: 'AlCharl88',
  jobTitle: 'Full Stack Web Developer',
  linkedIn: 'https://www.linkedin.com/in/malcolm-mason-1491a31b9/',
  description: ' I am a senior scientist currently attending UConn bootcamp to become a Full-Stack Web developer. I am aspiring working as web and Apps developer'
};

const useStyles = makeStyles((theme) =>({
  root: {
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    marginLeft: '10px',
  }

}));

export default function Cards() {
  const classes = useStyles();
  return (
    <Grid container component='cards' justifyContent={'space-between'} spacing={4} className={classes.root}>
      <Grid container item xs={12} md={6}>
        <GitHubCard content={QytezaCard}/>
      </Grid>
      <Grid container item xs={12} md={6}>
        <GitHubCard content={MasonCard}/>
      </Grid> 
      <Grid container item xs={12} md={6}>
        <GitHubCard content={McaulayCard}/>
      </Grid>
      <Grid container item xs={12} md={6}>
        <GitHubCard content={TagneCard}/>
      </Grid> 
    </Grid>
    
  )
}