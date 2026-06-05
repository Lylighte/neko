import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

// VitePress default content styles (code blocks, tables, etc.)
import 'vitepress/theme'

// Custom styles
import './styles/vars.css'
import './styles/animations.css'
import './styles/pixel-border.css'

// UI Components
import PixelButton from './components/PixelButton.vue'
import PixelButtonClassic from './components/PixelButtonClassic.vue'
import PixelButton3D from './components/PixelButton3D.vue'
import PixelInput from './components/PixelInput.vue'
import PixelTextarea from './components/PixelTextarea.vue'
import PixelSwitch from './components/PixelSwitch.vue'
import PixelDialog from './components/PixelDialog.vue'
import ScrollToTop from './components/ScrollToTop.vue'

// Layout Components
import HomeHero from './components/HomeHero.vue'
import HomeIntro from './components/HomeIntro.vue'
import BlogCard from './components/BlogCard.vue'
import LinkCard from './components/LinkCard.vue'
import DocTree from './components/DocTree.vue'
import DocViewer from './components/DocViewer.vue'
import DocsBrowser from './components/DocsBrowser.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    // Register all Pixel UI components globally
    app.component('PixelButton', PixelButton)
    app.component('PixelButtonClassic', PixelButtonClassic)
    app.component('PixelButton3D', PixelButton3D)
    app.component('PixelInput', PixelInput)
    app.component('PixelTextarea', PixelTextarea)
    app.component('PixelSwitch', PixelSwitch)
    app.component('PixelDialog', PixelDialog)
    app.component('ScrollToTop', ScrollToTop)

    // Register layout components for use in Markdown
    app.component('HomeHero', HomeHero)
    app.component('HomeIntro', HomeIntro)
    app.component('BlogCard', BlogCard)
    app.component('LinkCard', LinkCard)
    app.component('DocTree', DocTree)
    app.component('DocViewer', DocViewer)
    app.component('DocsBrowser', DocsBrowser)
    app.component('SiteFooter', SiteFooter)
  },
} satisfies Theme
