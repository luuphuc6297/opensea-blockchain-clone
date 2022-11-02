import sanityClient from '@sanity/client';

export const client = sanityClient({
    projectId: '5357cv9d',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skgggHTrkJIIQ6eqm5dXkF7BuCUfFZo7hOONSmQxkyBQbi03bEzs2ATra4DKinmsF9AI29OzuotlEd970RA94kjxUWUSs9M2mt6jFg5Vh7tmOJ5xsdVz2hXb4rt7tmbqd5CUaLdHHmELoGdJlt16OUgtWHEBYeXHNd0IlgHFzPjcOZibU8zI',
    useCdn: false,
});
