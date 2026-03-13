import { defineType, defineField } from 'sanity'

export const pageContentType = defineType({
    name: 'pageContent',
    title: 'Konten Halaman (Profil, Kurikulum)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Halaman',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (Misal: profil, kurikulum)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
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
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Isi Konten',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'aiSummary',
            title: 'AI Summary / Context',
            description: 'Penjelasan singkat bagi AI Agent jika ada pertanyaan terkait halaman ini.',
            type: 'text',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQ (Tanya Jawab)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Pertanyaan', type: 'string' },
                        { name: 'answer', title: 'Jawaban', type: 'text' },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'unit',
        },
        prepare({ title, subtitle }) {
            return {
                title: title,
                subtitle: `Unit: ${subtitle}`,
            }
        }
    }
})
