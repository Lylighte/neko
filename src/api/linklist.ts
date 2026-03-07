export interface LinkEntity {
  name: string
  image: string
  url: string
  description: string
}

export const GetLinkList = (): LinkEntity[] => {
  return [
    {
      name: '公共皮肤站',
      image: 'https://mc.genshin.ac.cn/app/favicon.ico',
      url: 'https://mc.genshin.ac.cn',
      description: '原神启动！',
    },
    {
      name: 'bilibili',
      image: '/logo-320px.png',
      url: 'https://space.bilibili.com/3546788017474530',
      description: '在哔哩哔哩同步动态！',
    },
    {
      name: 'Powered by Neco',
      image: '/loading.gif',
      url: 'https://github.com/EntropyGenerator/neco',
      description: 'Powered by Neco',
    },
  ]
}
