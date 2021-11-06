import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { SocketContext } from '../../app/context';
import { useDispatch, useSelector } from 'react-redux';
import ConversationStyle from '../styles/conversation';
import { chatActions, ListConversationState } from '../chatSlide';
import { RootState } from '../../../app/store';
import ItemConversation from './item-conversation'

// interface conversationInterface {id: number, title: string}
const Index: React.FC = () => {
  const classes = ConversationStyle();
  const [open, setOpen] = useState(false);
  const chat: ListConversationState = useSelector((state: RootState) => state.chat)
  // const toggleDrawer = useCallback(() => {
  //   setOpen(!open)
  // }, [open])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatActions.requestConversation())
  }, [])

  const handleClickItem = useCallback((id) => {
    dispatch(chatActions.requestMessages(id))
  }, [])

  const renderConversation = useCallback(() => {
    return chat.conversations && chat.conversations.map(
      conversation =>
        <ItemConversation
          key={conversation.id}
          conversation={conversation}
          handleClick={handleClickItem}
        />
    )
  }, [chat])

  return (
    (!chat || chat.loading) ? <div>Loading....................................</div> :

    <div className={classes.parentConversation}>
        {/*<Button onClick={toggleDrawer}>Button</Button>*/}
        {/*<SwipeableDrawer*/}
        {/*  className={classes.drawer}*/}
        {/*  anchor={'right'}*/}
        {/*  open={open}*/}
        {/*  onClose={toggleDrawer}*/}
        {/*  onOpen={toggleDrawer}*/}
        {/*>*/}
        {/*  */}
        {/*</SwipeableDrawer>*/}

      <div className={classes.conversations}>
        { renderConversation() }
      </div>
      <div className={classes.contentConversation}>

      </div>

    </div>
  )
}

export default React.memo(Index)