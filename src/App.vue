<script setup lang="ts">
// const purple = 'color: #80227A; font-weight: bold;'
// const yellow = 'color: #E9C31A; font-weight: bold;'
// console.log(
//   `%c ______%c___%c__ ____%c___%c_____
// |\\   ___   _ \\  _    __  \\
// \\ \\  \\%c\\ \\  \\%c\\\\__\\ %c\\  \\%c|\\  \\
//  \\ \\  \\%c\\ \\  \\%c\\|__| %c\\  \\%c\\\\  \\
//   \\ \\  \\%c\\ \\  \\%c    %c\\ \\  \\%c\\\\  \\
//    \\ \\__\\%c\\ \\__\\%c    %c\\ \\__%c_____\\
//     \\|__| %c\\|__|%c     %c\\|___%c____|`,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
//   yellow,
//   purple,
// )
const group = 'color: #E6A23C; font-weight: bold;'
const title = 'color: #67C23A; font-weight: bold;'
const isDarkConsole = window.matchMedia('(prefers-color-scheme: dark)').matches
const info = `color: ${isDarkConsole ? '#E5EAF3' : '#303133'}; font-weight: normal;`
const int15 = 'color: #409EFF; font-weight: bold;'
// const weak = 'color: #909399; font-weight: bold;'
const danger = 'color: #F56C6C; font-weight: bold;'
console.log(`%cCopyright © 2026 USTCraft.`, int15)
console.group('%c📦 Project Info', group)
console.log(`%cTitle: %cUSTCraft`, title, info)
console.log(`%cVersion: %cv2.0`, title, info)
console.log(`%cEnvironment: %c${import.meta.env.MODE}`, title, danger)
console.log(`%cDevelopers: %cLylighte`, title, info)
console.log(`%cAttribution: %cPowered by Neco`, title, info)
console.log(`%cMounted at: %c${import.meta.env.BASE_URL}`, title, info)
console.groupEnd()
console.group(`%c🔧 Debug Info`, group)
console.log(`%cBrowser: %c${navigator.userAgent}`, title, info)
console.log(`%cLanguage: %c${navigator.language}`, title, info)
console.log(`%cPlatform: %c${navigator.platform}`, title, info)
console.groupEnd()
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', int15)
</script>

<template>
  <router-view />
</template>
