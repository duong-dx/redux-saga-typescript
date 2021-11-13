import {makeStyles, Theme} from '@material-ui/core';

const ConversationStyle = makeStyles((theme: Theme) => ({
  drawer: {

  },
  listItem: {
    width: 450,
    '&:hover': {
      backgroundColor: '#EBF0F9',
    },
  },
  avatar: {
    marginRight: 15,
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px `,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
  },
  smallAvatar: {
    width: 22,
    height: 22,
    border: `2px solid `,
  },

  avatarMargin: {
    marginRight: 15
  },

  parentConversation: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },

  conversations: {
    width: '40%',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRight: '1px solid #eeeeee',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      // outline: '1px solid slategrey',
      borderRadius: '5px',
    },
  },

  contentConversation: {
    height: '100%',
    width: '60%',
    position: 'relative',
  },

  listMessages: {
    padding: 20,
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'absolute',
    width: '97%',
    height: '74%',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      // outline: '1px solid slategrey',
      borderRadius: '5px',
    }
  },

  input: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    width: '80%',
    height: '8%',
    backgroundColor: 'white',
    borderTop: '1px solid #EEEEEE',
  },

  headerContentConversation: {
    padding: 20,
    display: 'flex',
    width: '100%',
    height: '6%',
    borderBottom: '1px solid #EEEEEE',

    avatar: {
      width: '20%',
    },

    title: {
      textAlign: 'left',
    }
  }
}))

export default ConversationStyle
