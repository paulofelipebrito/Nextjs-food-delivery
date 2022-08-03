import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: '2jlnl6ho',
  dataset: 'production',
  apiVersion: '2022-08-01',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source);