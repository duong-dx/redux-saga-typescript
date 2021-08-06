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