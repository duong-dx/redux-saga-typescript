import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { SocketContext } from '../../app/context';
import { useDispatch, useSelector } from 'react-redux';
import ConversationStyle from '../styles/conversation';
import { chatActions, ListConversationState } from '../chatSlide';
import { RootState } from '../../../app/store';
import ItemConversation from './item-conversation'
import {MessageLeft, MessageRight} from './message';
import TextInput from './TextInput';
import { AuthState } from '../../auth/authSlice';
import { message } from '../../../firebase';
import moment from 'moment';
import { getUser } from '../../../repositories/localStorage/get';

// interface conversationInterface {id: number, title: string}
const Index: React.FC = () => {
  const classes = ConversationStyle();
  const chat: ListConversationState = useSelector((state: RootState) => state.chat)
  const auth: AuthState = useSelector((state: RootState) => state.auth)
  // const toggleDrawer = useCallback(() => {
  //   setOpen(!open)
  // }, [open])
  console.log(chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatActions.requestConversation())
  }, [])

  const handleClickItem = useCallback((id) => {
    dispatch(chatActions.requestMessages({
      conversation_id: id,
      take: null,
      page: null
    }))
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

  const renderContentConversation = useCallback(() => {
    const conversationActive = chat.conversations.find(e => e.active);

    if (conversationActive?.messages) {
      return conversationActive.messages && conversationActive.messages.map(
        (message, index) => {
          const userName = conversationActive.users.find(e => message.user_id)
          const momentObj = message.createdAt ? moment(message.createdAt) : moment();
          const momentString = momentObj.format('YYYY-MM-DD hh:mm'); // 2016-07-15
          if (message.user_id === auth.currentUser?.id) {
            return (
              <MessageRight
                key={index}
                message={message.message}
                timestamp={momentString}
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName={userName?.name}
                avatarDisp={false}
              />
            )
          }

          return (
            <MessageLeft
              key={index}
              message={message.message}
              timestamp={momentString}
              photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
              displayName={userName?.name}
              avatarDisp={true}
            />
          )
        }
      )
    }

    return <></>

  }, [chat, auth])

  const sendData = (message: string) => {
    const conversationActive = chat.conversations.find(e => e.active);

    if (conversationActive?.id) {
      dispatch(chatActions.sendMessage({
        message,
        conversation_id: conversationActive.id,
        user_id: getUser().id,
        createdAt: null,
        updatedAt: null
      }))
    }
  }

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
        <div className={classes.headerContentConversation}>Conversation active</div>
        <div className={classes.listMessages}>
          { renderContentConversation() }
        </div>
        <div className={classes.input}>
          <TextInput handleClick={sendData} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Index)