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