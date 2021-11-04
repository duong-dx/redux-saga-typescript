import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

// export interface Message {
//   id: number | string;
//   user_id: number | string;
//   conversation_id: number | string;
//   status: boolean | null;
//   message: string;
// }

// export interface Conversation {
//   id: number | string;
//   messages: Message[];
// }
//
// interface ChatState {
//   conversations: Conversation[];
//   sending: boolean;
//   error: string;
// }
//
// const initialState: ChatState = {
//   sending: false,
//   error: '',
//   conversations: [],
// }

export interface Message {
  user_id: number | string;
  conversation_id: number | string;
  message: string;
}

export interface MessageError {
  conversation_id: number | string;
  error: string;
}

export interface Conversation {
  users: User[];
  messages: Message[];
  id: number | string | null;
  title: string;
  description: string;
  sending: boolean;
  error: string;
}

export interface ListConversationState {
  loading: boolean;
  error: string;
  conversations: Conversation[];
}


// export interface ChatState {
//   messages: Message[];
//   sending: boolean;
//   error: string;
// }


const initialState: ListConversationState = {
  loading: false,
  error: '',
  conversations: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    requestConversation(state) {
      return state;
    },
    sendMessage(state, action: PayloadAction<Message>) {
      const conversation: Conversation | undefined = state.conversations.find(e => e.id === action.payload.conversation_id)
      const conversationIndex = state.conversations.findIndex(e => e.id === action.payload.conversation_id)
      const newConversation = {
        id: conversation?.id ?? null,
        title: conversation?.title ?? '',
        description: conversation?.description ?? '',
        users: conversation?.users ?? [],
        messages: conversation?.messages ?? [],
        sending: true,
        error: '',
      }

      console.log(state, 'chatSlide-sendMessage');
      if (state.conversations.length === 0) {
        state.conversations.push(newConversation);

        return state;
      } else if (state.conversations && conversationIndex >= 0) {
        state.conversations[conversationIndex] = newConversation;

        return state
      }

      return state
    },
    
    sendMessageSuccess(state, action: PayloadAction<Message>) {
      const newConversation = state.conversations.map((conversation) => {
        if (conversation.id === action.payload.conversation_id) {
          conversation.messages.push(action.payload)
          conversation.sending = false
        }
        return conversation
      })

      state.conversations = newConversation;
      console.log(newConversation, 'newConversation-sendMessageSuccess');

      return state
    },

    sendMessageError(state, action: PayloadAction<MessageError>) {
      const newConversation = state.conversations.map((conversation) => {
        if (conversation.id === action.payload.conversation_id) {
          conversation.sending = false
          conversation.error = action.payload.error
        }
        return conversation
      })

      state.conversations = newConversation;
      console.log(newConversation, 'newConversation-sendMessageSuccess');

      return state
    }
  }
})

export const chatActions = chatSlice.actions;

export {
  initialState
}

export default chatSlice.reducer;