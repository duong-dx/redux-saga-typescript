import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { SocketContext } from '../../app/context';
import { useDispatch, useSelector } from 'react-redux';
import ConversationStyle from '../styles/conversation';
import { chatActions, ListConversationState } from '../chatSlide';
import { RootState } from '../../../app/store';
import ItemConversation from './item-conversation'
import {MessageLeft, MessageRight} from './message';
import TextInput from './TextInput';

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
        <div className={classes.headerContentConversation}>Conversation active</div>
        <div className={classes.listMessages}>
          <MessageLeft
            message="あめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName=""
            avatarDisp={true}
          />
          <MessageLeft
            message="xxxxxhttps://yahoo.co.jp xxxxxxxxxあめんぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさいすせそ"
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="テスト"
            avatarDisp={false}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={true}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          /><MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
          <MessageLeft
            message="あめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName=""
            avatarDisp={true}
          /><MessageLeft
          message="あめんぼあかいなあいうえお"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName=""
          avatarDisp={true}
        /><MessageLeft
          message="あめんぼあかいなあいうえお"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName=""
          avatarDisp={true}
        /><MessageLeft
          message="あめんぼあかいなあいうえお"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName=""
          avatarDisp={true}
        /><MessageLeft
          message="あめんぼあかいなあいうえお"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName=""
          avatarDisp={true}
        /><MessageLeft
          message="あめんぼあかいなあいうえお"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName=""
          avatarDisp={true}
        /><MessageLeft
          message="あめんぼあかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお

          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお

          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          "
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName=""
          avatarDisp={true}
        />
          <MessageRight
            message="あめんぼあかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお

          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお

          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえお
          かいなあいうえおかいなあいうえお
          "
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName=""
            avatarDisp={true}
          />
        </div>
        <div className={classes.input}>
          <TextInput />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Index)