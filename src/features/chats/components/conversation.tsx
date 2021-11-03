import React, { useCallback, useContext, useState } from 'react';
// import { SocketContext } from '../../app/context';
import { useDispatch, useSelector } from 'react-redux';
import ConversationStyle from '../styles/conversation';
import {
  SwipeableDrawer,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  List
} from '@material-ui/core/';
import Anh10 from '../../../assets/images/10.jpg'

// interface conversationInterface {id: number, title: string}
const Index: React.FC = () => {
  const classes = ConversationStyle();
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <div>
        <Button onClick={toggleDrawer}>Button</Button>
        <SwipeableDrawer
          className={classes.drawer}
          anchor={'right'}
          open={open}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <List>
              <ListItem
                button
                className={classes.listItem}
              >
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={Anh10} />
                </ListItemAvatar>
                <ListItemText primary={"hello"} secondary={"helloooo"} />
              </ListItem>
          </List>

          <List>
              <ListItem
                button
                className={classes.listItem}
              >
                <Badge
                  className={classes.avatar}
                  overlap="circle"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={Anh10} />
                </Badge>
                <ListItemText primary={"hello"} secondary={"helloooo"} />
              </ListItem>
          </List>

          <List>
              <ListItem
                button
                className={classes.listItem}
              >
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
                <ListItemText primary={"hello"} secondary={"helloooo"} />
              </ListItem>
          </List>

        </SwipeableDrawer>
    </div>
  )
}

export default React.memo(Index)