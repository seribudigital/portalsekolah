import { defineType, defineField } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Kategori Unit',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Nama Unit',
            type: 'string',
            description: 'Misal: TK, SD, MTS, MA, atau PORTAL',
        }),
        defineField({
            name: 'value',
            title: 'Kode Unit (Value)',
            type: 'string',
            description: 'Harus sama persis dengan kode: TK, SD, MTS, MA, PORTAL',
        }),
    ],
})
