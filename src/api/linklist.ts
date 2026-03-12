export interface LinkEntity {
  name: string
  image: string
  url: string
  description: string
}

export const GetLinkList = (): LinkEntity[] => {
  return [
    {
      name: '社团皮肤站',
      image: 'https://skin.ustcmc.com/app/favicon.ico',
      url: 'https://skin.ustcmc.com',
      description: '使用 USTCraft Skins 畅玩我们的服务器！',
    },
    {
      name: 'bilibili',
      image: '/logo-320px.png',
      url: 'https://space.bilibili.com/3546788017474530',
      description: '在哔哩哔哩同步动态！',
    },
    {
      name: '本站仓库',
      image: '/loading.gif',
      url: 'https://github.com/Lylighte/neko',
      description: 'Remember?',
    },
  ]
}
