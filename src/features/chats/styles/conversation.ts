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
    height: '100vh'
  },

  conversations: {
    width: '20%',
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
    }
  },

  contentConversation: {
    width: '80%',

  },

  headerContentConversation: {
    display: 'flex',
    with: '100%',

    avatar: {
      width: '20%',
    },

    title: {
      textAlign: 'left',
    }
  }
}))

export default ConversationStyle
