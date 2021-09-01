import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 530,
    maxWidth: 530,
  },
  media: {
    height: 0,
    borderRadius: '50px',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  large: {
    height: '100px',
    width: 'auto'
  }
}));

export default function GitHubCard({content:{ name, github, linkedIn, jobTitle, description }}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt={name} src={`https://github.com/${github}.png`} className={classes.large} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={jobTitle}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton href={`https://github.com/${github}`} target="_blank" aria-label="github">
          <GitHubIcon />
        </IconButton>
        <IconButton href={linkedIn} target="_blank" aria-label="linked-in">
          <LinkedInIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Github Stats  
            <img src={`https://img.shields.io/github/followers/${github}.svg?style=social&label=Followers&maxAge=2592000`} alt="follow" style={{marginLeft:'10px'}}></img>
          </Typography>
          <Typography paragraph>
            <img src={`https://github-readme-stats.vercel.app/api?username=${github}&show_icons=true" alt="Github Statistics`} alt="Github Stats"></img>
          </Typography>
          <Typography paragraph>
            <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${github}`} alt="Github languages"></img>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
