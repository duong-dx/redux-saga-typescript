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
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}

export interface MessageError {
  conversation_id: number | string;
  error: string;
}

export interface Conversation {
  users: User[];
  messages: Message[];
  id: number | string | null;
  title: string | null;
  description: string | null;
  background: string | null;
  emoji: string | null;
  sending: boolean;
  error: string;
  active: boolean;
  unread: number;
  page: number;
}

export interface ListConversationState {
  loading: boolean;
  error: string;
  conversations: Conversation[];
}

const initialState: ListConversationState = {
  loading: false,
  error: '',
  conversations: [],
}

export interface RequestMessage {
  conversation_id: number | string,
  take: number | null,
  page: number | null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    requestConversation(state) {
      state.loading = true;

      return state;
    },

    requestConversationSuccess(state, action: PayloadAction<Conversation[]>) {
      state.loading = false;
      state.conversations = [
        ...state.conversations,
        ...action.payload
      ]

      return state;
    },

    requestConversationError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;

      return state;
    },

    requestMessages(state, action: PayloadAction<RequestMessage>) {
      state.conversations = state.conversations.map(conversation => {
        if (conversation.id === action.payload.conversation_id) {
          conversation.unread = 0;
          conversation.active = true;
        } else {
          conversation.active = false;
        }

        return conversation;
      })

      return state;
    },

    requestMessagesSuccess(state, action: PayloadAction<Message[]>) {
      const newConversation = state.conversations.map((conversation) => {
        if (conversation.active === true) {
          conversation.messages = conversation.messages ?
            [
              ...conversation.messages,
              ...action.payload,
            ] :
            [...action.payload]
          conversation.sending = false
        }

        console.log(conversation, 2222);
        return conversation
      })

      state.conversations = newConversation;
      console.log(newConversation, 'newConversation-sendMessageSuccess');

      return state
    },

    sendMessage: function(state, action: PayloadAction<Message>) {
      const conversation: Conversation | undefined = state.conversations.find(e => e.id === action.payload.conversation_id);
      const conversationIndex = state.conversations.findIndex(e => e.id === action.payload.conversation_id);
      const newConversation = {
        id: conversation?.id ?? null,
        title: conversation?.title ?? '',
        emoji: conversation?.emoji ?? '',
        background: conversation?.background ?? '',
        description: conversation?.description ?? '',
        users: conversation?.users ?? [],
        messages: conversation?.messages ?? [],
        sending: true,
        error: '',
        active: true,
        unread: 0,
        page: 1,
      };

      console.log(state, 'chatSlide-sendMessage');
      if (state.conversations.length === 0) {
        state.conversations.push(newConversation);

        return state;
      } else if (state.conversations && conversationIndex >= 0) {
        state.conversations[conversationIndex] = newConversation;

        return state;
      }

      return state;
    },

    sendMessageSuccess(state, action: PayloadAction<Message>) {
      console.log(action.payload, 878787878);
      const newConversation = state.conversations.map((conversation) => {
        if (conversation.id === action.payload.conversation_id) {
          conversation.messages = conversation.messages ?
            [
              action.payload,
              ...conversation.messages,
            ] :
            [action.payload]
          conversation.sending = false
          conversation.active = true
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