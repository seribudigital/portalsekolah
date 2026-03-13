import { defineType, defineField, defineArrayMember } from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Berita & Pengumuman',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Lengkap',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Gambar Utama',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'categories',
            title: 'Tag Unit (Kategori)',
            type: 'array',
            of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
            description: 'Pilih unit mana saja yang akan menampilkan berita ini (TK, SD, MTS, MA, atau PORTAL utama).',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Tanggal Publikasi',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Isi Konten',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' }
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
})
