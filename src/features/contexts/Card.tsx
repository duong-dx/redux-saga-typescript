import React, {useCallback} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import {CardContent, CardMedia, CardHeader, CardActions, Collapse, IconButton, Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {ExpandMore, Share, MoreVert} from '@material-ui/icons';
import TodoContext, {ContextType, ITodo} from './TodoContext'
import CustomButtonHear from "./CustomButtonHear";

type Props = {
  todo: ITodo
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
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
    }
  }),
);

const CardToDo: React.FC<Props> = ({todo}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { updateTodo } = React.useContext(TodoContext) as ContextType
  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  
  
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{backgroundColor: `#${todo.color}`}}>
            {todo.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={todo.name}
        subheader={todo.time.toDateString()}
      />
      <CardMedia
        className={classes.media}
        image={todo.image}
        title={todo.title.substring(0,8)}
      />
      <CardContent>
        <Typography className='card-title' variant="body2" color="textSecondary">
          {todo.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <CustomButtonHear todo={todo} updateTodo={updateTodo} />
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Mô tả :</Typography>
          <Typography paragraph>
            {todo.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default React.memo(CardToDo);

