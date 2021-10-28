export interface Song {
  name: string
  url: string
  like: boolean
  playing: boolean
  singer: string
  avatarThumbnail: string
}

export interface Songs {
  songs: Song[]
  limit: number
  page: number
  total: number
}

export interface SubscriptionEndPoint  {
  endpoint: string,
  expirationTime: any,
  keys: {
    auth: string,
    p256dh: string
  }
}

export interface router {
  key: string | number,
  path: string,
  component: string
  auth: boolean
}

export const listRouter: Array<router> = [
  {
    key: 1,
    path: '/list',
    component: 'List',
    auth: true
  },
  {
    key: 2,
    path: '/test',
    component: 'test',
    auth: true
  },
  {
    key: 3,
    path: '/posts',
    component: 'post',
    auth: true
  },
  {
    key: 4,
    path: '/posts/create',
    component: 'create-post',
    auth: true
  },
  {
    key: 5,
    path: '/music',
    component: 'music-index',
    auth: true
  },
  {
    key: 6,
    path: '/player',
    component: 'player',
    auth: true
  },
  {
    key: 7,
    path: '/sign-in',
    component: 'login',
    auth: false
  },
  {
    key: 7,
    path: '/chat',
    component: 'chat',
    auth: true
  },
];

export const STYLE_LOADER = {
  minHeight: '100vh',
  justifyContent: "center",
  display: 'flex',
  alignItems:'center',
  margin: 'auto'
}

export const COLOR_LOADER:string = 'linear-gradient(#0259af,rgb(144 205 228 / 80%))'