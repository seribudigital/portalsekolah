import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { categoryType } from './categoryType'
import { pageContentType } from './pageContentType'
import { guruType } from './guruType'
import { galleryType } from './galleryType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [postType, categoryType, pageContentType, guruType, galleryType],
}
