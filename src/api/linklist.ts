export interface LinkEntity {
  name: string
  image: string
  url: string
  description: string
}

export const GetLinkList = (): LinkEntity[] => {
  return [
    {
      name: 'USTCraft 官网',
      image: '/logo.png',
      url: 'https://example.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'bilibili',
      image: '/logo.png',
      url: 'https://example.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Powered by Neco',
      image: '/loading.gif',
      url: 'https://github.com/EntropyGenerator/neco',
      description: 'Powered by Neco',
    },
  ]
}
