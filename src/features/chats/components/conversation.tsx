import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConversationStyle from '../styles/conversation';
import { chatActions, Conversation, ListConversationState } from '../chatSlide';
import { RootState } from '../../../app/store';
import ItemConversation from './item-conversation'
import {MessageLeft, MessageRight} from './message';
import TextInput from './TextInput';
import { AuthState } from '../../auth/authSlice';
import moment from 'moment';
import { getUser } from '../../../repositories/localStorage/get';
import Anh10 from '../../../assets/images/10.jpg';
import SortData from './sort-data';
import conversation from '../styles/conversation';

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
    const list: HTMLElement | null = document.getElementById('list-messages')
    const conversationActive: Conversation | undefined = chat.conversations.find(e => e.active);

    if (!list || !conversationActive) {
      return;
    }

    if (conversationActive.scrollHeight) {
      list.scrollTo(0, list.scrollHeight - conversationActive.scrollHeight);
    } else {
      handleScrollBottom()
    }

  }, [chat.conversations])

  useEffect(() => {
    const list: HTMLElement | null = document.getElementById('list-messages')
    if (!list) {
      return;
    }

    const loadData = () => {
      const conversationActive: Conversation | undefined = chat.conversations.find(e => e.active);
      if (!conversationActive || !conversationActive.messages) {
        return;
      }

      const flag = conversationActive.messages.length < conversationActive.total;
      // đúng sẽ là list.offsetTop === list.scrollTop
      if (flag && list.scrollTop === 0) {
        dispatch(chatActions.requestMessages({
          conversation_id: conversationActive.id,
          page: conversationActive.page + 1,
          scrollHeight: list.scrollHeight
        }))
      }
    }
    list.addEventListener('scroll', loadData);

    return () => {
      list.removeEventListener('scroll', loadData)
    }
  }, [chat.conversations])
  const handleClickItem = (id: any) => {
    const conversation = chat.conversations.find(e => e.id === id);

    if (conversation && !conversation.loaded) {
      dispatch(chatActions.requestMessages({
        conversation_id: id,
        page: 1,
        scrollHeight: null,
      }))
    } if (conversation && conversation.loaded) {
      dispatch(chatActions.activeConversation(id))
    }

    if (conversation
      && conversation.messages
      && conversation.messages.length > 0
      && conversation.users
    ) {
      const currentUser = conversation.users.find(e => e.id === getUser().id);

      if (currentUser && currentUser.last_message_id !== conversation.messages[0].id) {
        dispatch(chatActions.updateLastMessage({
          conversation_id: id,
          user_id: getUser().id,
          message_id: conversation.messages[0].id
        }))
      }

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
          const userName = conversationActive.users.find(e => e.id === message.user_id)
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

  const handleScrollBottom = () => {
    if(lastBox.current) {
      lastBox.current.scrollIntoView();
    }
  }

  const sendData = (message: string) => {
    const conversationActive = chat.conversations.find(e => e.active);

    if (conversationActive?.id) {
      const lastMessageId = conversationActive.messages.length > 0 ? conversationActive.messages.slice(-1)[0].id : 1;
      dispatch(chatActions.sendMessage({
        message,
        id: lastMessageId + 1,
        conversation_id: conversationActive.id,
        user_id: getUser().id,
        createdAt: null,
        updatedAt: null
      }))
    }
    handleScrollBottom()
  }

  return (
    (!chat || chat.loading) ? <div>Loading....................................</div> :

    <div className={classes.parentConversation}>
      <div className={classes.conversations}>
        { renderConversation() }
      </div>
      <div className={classes.contentConversation}>
        <div className={classes.headerContentConversation}>Conversation active</div>
        <div id={'list-messages'} className={classes.listMessages}>
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