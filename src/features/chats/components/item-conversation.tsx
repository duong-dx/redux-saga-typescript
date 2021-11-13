import React, { useCallback, useEffect, useState } from 'react';
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
import { chatActions, Conversation } from '../chatSlide';
import { Notifications } from '@material-ui/icons';
import { getUser } from '../../../repositories/localStorage/get';

interface Props {
  conversation: Conversation,
  handleClick: (id: number | string | null) => any
}

const Index: React.FC<Props> = (props) => {
  const classes = ConversationStyle();
  const { conversation } = props;
  const [unread, setUnread] = useState<boolean>(true)
  useEffect(() => {
    if (!conversation
      || !conversation.users
      || !conversation.messages
      || conversation.messages.length === 0
      || conversation.users.length === 0
    ) {
      return;
    }

    const currentUser = conversation.users.find(e => e.id === getUser().id);

    if (!currentUser) {
      return;
    }
    console.log(currentUser.last_message_id, conversation.messages[0].id);
    if (
      currentUser.last_message_id === conversation.messages[0].id
      // && currentUser.id !== conversation.messages[0].user_id
    ) {
      setUnread(false)
    } else {
      setUnread(true)
    }
  }, [conversation])
  const renderAvatar = useCallback(() => {

      if (conversation.users.length >= 2) {
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
  }, [conversation.users])

  const renderText = useCallback(() => {
      if (!props.conversation.active && unread) {
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
  }, [props.conversation.title, props.conversation.description, unread, props.conversation.active])

  const handleExpandClick = useCallback(() => {
    props.handleClick(conversation.id);
  }, [conversation]);

  return (
    <List onClick={handleExpandClick}>
      <ListItem
        selected={conversation.active}
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