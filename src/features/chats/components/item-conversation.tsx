import React, { useCallback } from 'react';
import ConversationStyle from '../styles/conversation';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  List, ListItemSecondaryAction, IconButton, Typography,
} from '@material-ui/core/';
import Anh10 from '../../../assets/images/10.jpg'
import { Conversation } from '../chatSlide';
import { Notifications } from '@material-ui/icons';

// interface conversationInterface {id: number, title: string}
interface Props {
  conversation: Conversation,
  handleClick: (id: number | string | null) => any
}

const Index: React.FC<Props> = (props) => {
  const classes = ConversationStyle();
  const renderAvatar = useCallback(() => {

      if (props.conversation.users.length >= 2) {
        return (
          <Badge
            className={classes.avatarMargin}
            overlap="circle"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Avatar className={classes.smallAvatar} alt="Remy Sharp" src={Anh10} />
            }
          >
            <Avatar alt="Travis Howard" src={Anh10} />
          </Badge>
        )
      }
      return (
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src={Anh10} />
        </ListItemAvatar>
      )
  }, [props.conversation.users])

  const renderText = useCallback(() => {

      if (!props.conversation.active && props.conversation.unread > 0) {
        return (
          <>
            <ListItemText
              primary={<Typography style={{ color: '#4A85E7' }}>{props.conversation.title}</Typography>}
              secondary={<Typography style={{ color: '#709FEB' }}>{props.conversation.description}</Typography>}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <Notifications />
              </IconButton>
            </ListItemSecondaryAction>
          </>
        )
      }
      return (
        <ListItemText primary={props.conversation.title} secondary={props.conversation.description} />
      )
  }, [props.conversation.title, props.conversation.description, props.conversation.unread, props.conversation.active])

  const handleExpandClick = useCallback(() => {
    props.handleClick(props.conversation.id);
  }, [props.conversation]);

  return (
    <List onClick={handleExpandClick}>
      <ListItem
        selected={props.conversation.active}
        button
        className={classes.listItem}
      >
        {renderAvatar()}
        {renderText()}
      </ListItem>
    </List>
  )
}

export default React.memo(Index)