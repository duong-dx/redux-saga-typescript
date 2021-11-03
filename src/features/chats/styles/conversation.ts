import {makeStyles, Theme} from '@material-ui/core';

const ConversationStyle = makeStyles((theme: Theme) => ({
  drawer: {

  },
  listItem: {
    width: 450,
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
  }
}))

export default ConversationStyle
