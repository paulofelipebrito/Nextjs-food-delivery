import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '2jlnl6ho',
  dataset: 'production',
  apiVersion: '2022-08-01',
  useCdn: true,
  token: 'skklXF7WuroqBG1Datwnz97gVybqYTwWyZB0lZu6sBQouPuQFQgL1FgV1UUCyesmsqyzgOu8vJgCNyI6t8IbKESZ3G8odL2mL3GBrKOiLVtCaqLILM3v30SMrz3CyouiW8UNAwG23k4HTPOFwRtjgk4dT62iIzTOUCfWmO72M8hq8ZwsU9YP'
})

const builder = ImageUrlBuilder(client);

export const urlFor = (sources) => builder.image(sources);