import  { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'xxbuu6kd',
  dataset: 'production',
  apiVersion: '2024-05-28',
  useCdn: true,
  token: 'skewe2VvClKbLql7em3Yj3AtI1QfXuxyQaUqz8imqjjC8v7psysl1VHy6GOalxfIVS0Uwyxq7PQUD84p8j3cYCNP7H9wJdxv4603HD1usXCh5J6pp4l2idHQxd8FUupsKgegaV39402soGZlIRmU4FOzekeUI5MKoTd41ZAGb9dMLfxSaPKz'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);