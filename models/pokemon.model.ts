import type { Region } from '~/models/region.model';
import type { Image, Meta } from '~/models/strapi.model';

export interface Pokemon {
  id: number
  name: string
  type: string
  habitat: string
  created_at: Date
  updated_at: Date
  image: Image
  regions: Region[]
}

export interface PokemonsResponse {
    data: Pokemon[]
    meta: Meta
}