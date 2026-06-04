import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

// Styles
import './styles/vars.css'
import './styles/animations.css'
import './styles/mc-border.css'

// UI Components
import MinecraftButton from './components/MinecraftButton.vue'
import MinecraftButtonClassic from './components/MinecraftButtonClassic.vue'
import MinecraftButton3D from './components/MinecraftButton3D.vue'
import MinecraftInput from './components/MinecraftInput.vue'
import MinecraftTextarea from './components/MinecraftTextarea.vue'
import MinecraftSwitch from './components/MinecraftSwitch.vue'
import MinecraftDialog from './components/MinecraftDialog.vue'
import ScrollToTop from './components/ScrollToTop.vue'

// Layout Components
import HomeHero from './components/HomeHero.vue'
import HomeIntro from './components/HomeIntro.vue'
import BlogCard from './components/BlogCard.vue'
import LinkCard from './components/LinkCard.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    // Register all Minecraft UI components globally
    app.component('MinecraftButton', MinecraftButton)
    app.component('MinecraftButtonClassic', MinecraftButtonClassic)
    app.component('MinecraftButton3D', MinecraftButton3D)
    app.component('MinecraftInput', MinecraftInput)
    app.component('MinecraftTextarea', MinecraftTextarea)
    app.component('MinecraftSwitch', MinecraftSwitch)
    app.component('MinecraftDialog', MinecraftDialog)
    app.component('ScrollToTop', ScrollToTop)

    // Register layout components for use in Markdown
    app.component('HomeHero', HomeHero)
    app.component('HomeIntro', HomeIntro)
    app.component('BlogCard', BlogCard)
    app.component('LinkCard', LinkCard)
    app.component('SiteFooter', SiteFooter)
  },
} satisfies Theme
