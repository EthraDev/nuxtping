import type { Region } from '~/models/region.model';
import type { Image, Meta } from '~/models/strapi.model';
import type { Type } from '~/models/type.model';

export interface Pokemon {
  id: number
  name: string
  habitat: string
  created_at: Date
  updated_at: Date
  slug: string
  image: Image
  regions: Region[]
  types: Type[]
}

export interface PokemonsResponse {
    data: Pokemon[]
    meta: Meta
}