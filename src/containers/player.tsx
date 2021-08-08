import React, { useState } from 'react';
import PlayerComponent from '../features/player'
import { Song } from '../constants';
import backGround from '../assets/images/10.jpg';

const Player: React.FC = () => {
  const [song, setSong] = useState<Song>({
    name: 'Test',
    url: '',
    avatarThumbnail: backGround,
    singer: 'singer',
    playing: false,
    like: true
  })
  return <PlayerComponent song={song} />
}

export default React.memo(Player)