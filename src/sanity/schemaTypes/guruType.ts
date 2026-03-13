import { defineType, defineField } from 'sanity'

export const guruType = defineType({
    name: 'guru',
    title: 'Pengajar / Guru',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nama Lengkap (beserta gelar)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mapel',
            title: 'Mata Pelajaran / Jabatan',
            type: 'string',
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
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Foto Profil',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'order',
            title: 'Urutan Tampil',
            type: 'number',
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: 'Urutan Tampil',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'mapel',
            media: 'image',
        },
    },
})
