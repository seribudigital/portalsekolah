import { defineType, defineField } from 'sanity'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Galeri Foto',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Foto / Kegiatan',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Foto',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'unit',
            title: 'Unit',
            type: 'string',
            options: {
                list: [
                    { title: 'TK', value: 'TK' },
                    { title: 'SD', value: 'SD' },
                    { title: 'MTs', value: 'MTS' },
                    { title: 'MA', value: 'MA' },
                    { title: 'PORTAL', value: 'PORTAL' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Tanggal Kegiatan',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        }),
    ],
    orderings: [
        {
            title: 'Terbaru',
            name: 'dateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'unit',
            media: 'image',
        },
    },
})
