export interface IntroEntity {
  title: string
  description: string
  image: string
}

export const GetIntroList = (): IntroEntity[] => {
  return [
    // {
    //   title: `Placeholder 1`,
    //   description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    //   image: import.meta.env.BASE_URL + 'background/ustcmc.jpg',
    // },
    {
      title: `加入我们！`,
      description: `探索一切像素&体素创作的可能，欢迎加入中国科学技术大学 USTCraft 像素艺术社。`,
      image: import.meta.env.BASE_URL + 'introimg/joinus.jpg',
    },
    {
      title: `绝赞招募中！`,
      description: `技术运维，对外宣传，行政管理……我们需要你！`,
      image: import.meta.env.BASE_URL + 'background/ustcmc.jpg',
    },
    {
      title: `方块科大`,
      description: `借助 Minecraft 方块构建虚拟校园项目，2023 年立项，2026 与社团再出发。`,
      image: import.meta.env.BASE_URL + 'introimg/ustcube.jpg',
    },
  ]
}

export const GetDetailedIntroList = (): IntroEntity[] => {
  return [
    // 
    // {
    //   title: `About Placeholder 1`,
    //   description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    //   image: ``, // Dividing line
    // },
    // {
    //   title: `About Placeholder 2`,
    //   description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    //   image: import.meta.env.BASE_URL + 'background/ustcmc.jpg',
    // },
    {
      title: `历史沿革`,
      description: 
        `USTCraft 由始建于 2014 年的科大 Minecraft 同好交流群发展来，截至2025年底，已顺利进行 25 个服务器周目。`,
      image: ``,
    },
    {
      title: `2025 第二十五周目`,
      description: 
        `
        机械动力全家桶，匠魂，Biomes O' Plenty，以及超多美食 mod，还有制作团队开发的经济系统模组……
        以经济系统为核心的贸易功能，修筑铁路，用火车运货，买入工业原料，卖出工业制品，建立你自己的商贸帝国！
        `,
      image: import.meta.env.BASE_URL + 'background/ustcmc.jpg',
    },
    {
      title: `2023 第十九周目`,
      description: `再高的山脉也飞过，再宽的河流也游过……这是一个原版生存服务器，你可以做几乎任何你想做的事情。`,
      image: import.meta.env.BASE_URL + 'introimg/19th.jpg',
    },
    {
      title: `2019 第十一周目 | UMS`,
      description: `仍在运维的老牌插件服。`,
      image: import.meta.env.BASE_URL + 'introimg/UMS.jpg',
    },
  ]
}
