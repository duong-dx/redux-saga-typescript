import { getToken, getUser } from '../../repositories/localStorage/get';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from '../../firebase';

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
  room: number | string;
  message: string;
}

export interface ChatState {
  messages: Message[];
  sending: boolean;
  error: string;
}


const initialState: ChatState = {
  sending: false,
  error: '',
  messages: [],
}
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // sendMessage(state, action: PayloadAction<Message>) {
    //   const getConversationById = state.conversations.find(e => e.id)
    //   const index = state.conversations.findIndex(e => e.id)
    //   const newConversation: Conversation = getConversationById ?
    //     getConversationById.messages.push(action.payload) :
    //     {
    //       id: action.payload.conversation_id,
    //       messages: [
    //         action.payload
    //       ]
    //     };
    //   if (index <= -1) {
    //     return state;
    //   }
    //
    //   return state.conversations[index] = newConversation;
    // }

    sendMessage(state, action: PayloadAction<Message>) {
      state.sending = true
      console.log(state, 'chatSlide-sendMessage');

      return state
    },
    
    sendMessageSuccess(state, action: PayloadAction<Message>) {
      const newMessages = [
        ...state.messages,
        action.payload,
      ]
      state.messages = newMessages;
      state.sending = false;

      console.log(newMessages, 'newMessages-sendMessageSuccess');
      console.log(state.messages, state.sending, 'chatSlide-sendMessageSuccess');

      return state
    },

    sendMessageError(state, action: PayloadAction<string>) {
      state.sending = false;
      state.error = action.payload;
      console.log(state, 'chatSlide-sendMessageError');

      return state
    }
  }
})

export const chatActions = chatSlice.actions;

export {
  initialState
}

export default chatSlice.reducer;