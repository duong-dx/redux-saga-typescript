import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

export interface Message {
  id: number;
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
  id: number;
  title: string | null;
  description: string | null;
  background: string | null;
  emoji: string | null;
  sending: boolean;
  error: string;
  active: boolean;
  page: number;
  total: number,
  scrollHeight: number | null,
  loaded: boolean;
}

export interface ListConversationState {
  loading: boolean;
  error: string;
  conversations: Conversation[];
  loaded: boolean;
}

const initialState: ListConversationState = {
  loading: false,
  error: '',
  conversations: [],
  loaded: false,
}

export interface RequestMessage {
  conversation_id: number | string,
  page: number,
  scrollHeight: number | null,
}

export interface RequestMessageSuccess {
  messages: Message[];
  page: number;
  total: number;
  scrollHeight: number | null,
}

export interface UpdateLastMessage {
  message_id: number;
  conversation_id: number;
  user_id: number;
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
      state.loaded = true;

      return state;
    },

    requestConversationError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;

      return state;
    },

    updateLastMessage(state, action: PayloadAction<UpdateLastMessage>) {
      state.conversations = state.conversations
        ? state.conversations.map(conversation => {
          return  {
            ...conversation,
            users: conversation.id === action.payload.conversation_id
              ? conversation.users.map(user => {
                  if (user.id === action.payload.user_id) {
                    user.last_message_id = action.payload.message_id;
                  }

                  return user
                })
              : conversation.users
          };
        })
        : []

      return state;
    },

    requestMessages(state, action: PayloadAction<RequestMessage>) {
      state.conversations = state.conversations.map(conversation => {
        conversation.active = conversation.id === action.payload.conversation_id;

        return conversation;
      })

      return state;
    },

    requestMessagesSuccess(state, action: PayloadAction<RequestMessageSuccess>) {
      state.conversations = state.conversations.map((conversation) => {
        if (conversation.active === true) {
          conversation.messages = conversation.messages && conversation.loaded ?
            [
              ...conversation.messages,
              ...action.payload.messages,
            ] :
            [...action.payload.messages]
          conversation.sending = false
          conversation.loaded = true
          conversation.total = action.payload.total
          conversation.page = action.payload.page
          conversation.scrollHeight = action.payload.scrollHeight
        }

        return conversation
      });

      return state
    },

    activeConversation(state, action: PayloadAction<number>) {
      state.conversations = state.conversations.map(conversation => {
        if (conversation.id === action.payload) {
          conversation.active = true;
        } else {
          conversation.active = false;
        }

        return conversation;
      })

      return state;
    },


    sendMessage: function(state, action: PayloadAction<Message>) {
      const conversation: Conversation | undefined = state.conversations.find(e => e.id === action.payload.conversation_id);
      const conversationIndex = state.conversations.findIndex(e => e.id === action.payload.conversation_id);
      const newConversation = {
        id: conversation?.id ?? 1,
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
        page: conversation?.page ?? 1,
        total: conversation?.total ?? 0,
        scrollHeight: null,
        loaded: conversation?.loaded ?? false,
      };

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
      state.conversations = state.conversations.map((conversation) => {
        if (conversation.id === action.payload.conversation_id) {
          //handle update user
          conversation.users = (conversation.id === action.payload.conversation_id)
            ? conversation.users.map(user => {
              if (user.id === action.payload.user_id) {
                user.last_message_id = action.payload.id;
              }

              return user
            })
            : conversation.users

          conversation.users = conversation.active
            ? conversation.users.map(user => {
              user.last_message_id = action.payload.id;

              return user
            })
            : conversation.users

          //handle update message
          conversation.messages = conversation.messages ?
            [
              action.payload,
              ...conversation.messages,
            ] :
            [action.payload]
          conversation.sending = false
          // conversation.active = true
        }
        return conversation
      });

      return state
    },

    sendMessageError(state, action: PayloadAction<MessageError>) {
      state.conversations = state.conversations.map((conversation) => {
        if (conversation.id === action.payload.conversation_id) {
          conversation.sending = false
          conversation.error = action.payload.error
        }
        return conversation
      });

      return state
    }
  }
})

export const chatActions = chatSlice.actions;

export {
  initialState
}

export default chatSlice.reducer;