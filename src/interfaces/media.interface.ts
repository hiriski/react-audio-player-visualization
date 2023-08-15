export interface IMedia {
  id: number
  title: string
  artist: string
  cover_image_url: string
  file_url: string
  mime_type?: string | null
}
