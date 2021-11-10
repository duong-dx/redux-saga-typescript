import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConversationStyle from '../styles/conversation';
import { chatActions, ListConversationState } from '../chatSlide';
import { RootState } from '../../../app/store';
import ItemConversation from './item-conversation'
import {MessageLeft, MessageRight} from './message';
import TextInput from './TextInput';
import { AuthState } from '../../auth/authSlice';
import moment from 'moment';
import { getUser } from '../../../repositories/localStorage/get';
import Anh10 from '../../../assets/images/10.jpg';
import SortData from './sort-data';

const Index: React.FC = () => {
  const classes = ConversationStyle();
  const chat: ListConversationState = useSelector((state: RootState) => state.chat)
  const auth: AuthState = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch();
  const lastBox = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!chat.loaded) {
      dispatch(chatActions.requestConversation())
    }
  }, [])

  useEffect(() => {
    if(lastBox.current) {
      lastBox.current.scrollIntoView();
    }
  }, [chat.conversations])

  const handleClickItem = (id: any) => {
    const conversation = chat.conversations.find(e => e.id === id);

    if (conversation && !conversation.loaded) {
      dispatch(chatActions.requestMessages({
        conversation_id: id,
        take: null,
        page: null
      }))
    } if (conversation && conversation.loaded) {
      dispatch(chatActions.activeConversation(id))
    }
  }

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
      return conversationActive.messages && SortData(conversationActive.messages).map(
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
                photoURL={Anh10}
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
              photoURL={Anh10}
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
      const lastMessageId = conversationActive.messages ? conversationActive.messages.slice(-1)[0].id : 1;
      dispatch(chatActions.sendMessage({
        message,
        id: lastMessageId + 1,
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
      <div className={classes.conversations}>
        { renderConversation() }
      </div>
      <div className={classes.contentConversation}>
        <div className={classes.headerContentConversation}>Conversation active</div>
        <div className={classes.listMessages}>
          { renderContentConversation() }
          <div ref={lastBox} />
        </div>
        <div className={classes.input}>
          <TextInput handleClick={sendData} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Index)