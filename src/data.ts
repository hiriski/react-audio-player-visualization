import { IMedia } from '@/interfaces'

export const mediaList: IMedia[] = [
  {
    id: 1,
    title: 'VÔ TÌNH',
    artist: 'HOAPROX x XESI',
    cover_image_url: '/1.png',
    file_url: '/media/1.mp3',
    mime_type: 'audio/mpeg'
  },
  {
    id: 2,
    title: 'Waiting For You',
    artist: 'MONO',
    cover_image_url: 'waiting_for_you_cover.jpg',
    file_url: '/media/waiting_for_you.mp3',
    mime_type: 'audio/mpeg'
  },
  {
    id: 3,
    title: "Wish You'd Make Me Cry",
    artist: '(Nightcore) UPSAHL',
    cover_image_url: '/Wish_You_Make_Me_Cry.png',
    file_url: '/media/Wish_You_Make_Me_Cry.mp3',
    mime_type: 'audio/mpeg'
  }
]
