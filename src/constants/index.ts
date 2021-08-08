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
  url: string,
  component: string
  auth: boolean
}

export const listRouter: Array<router> = [
  {
    url: 'list',
    component: 'List',
    auth: true
  },
  {
    url: 'test',
    component: 'test',
    auth: false
  },
  {
    url: 'posts',
    component: 'post',
    auth: true
  },
  {
    url: 'posts/create',
    component: 'create-post',
    auth: true
  },
  {
    url: 'music',
    component: 'music-index',
    auth: true
  },
  {
    url: 'player',
    component: 'player',
    auth: true
  },
];