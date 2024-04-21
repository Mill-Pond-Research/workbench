/**
 * Application Identity (Brand)
 *
 * Also note that the 'Brand' is used in the following places:
 *  - README.md               all over
 *  - package.json            app-slug and version
 *  - [public/manifest.json]  name, short_name, description, theme_color, background_color
 */
export const Brand = {
  Title: {
    Base: 'OpenWorkbench',
    Common: (process.env.NODE_ENV === 'development' ? '[DEV] ' : '') + 'OpenWorkbench',
  },
  Meta: {
    Description: 'Reimagine Business Intelligence',
    SiteName: 'OpenWorkbench | Precision AI for You',
    ThemeColor: '#32383E',
    TwitterSite: '@MillPondAI',
  },
  URIs: {
    Home: 'https://millpondresearch.com/',
    // App: 'https://get.big-agi.com',
    CardImage: 'https://millpondresearch.com/img/Mill_Pond_Research-Logo-Horizontal-200px-tall.png',
    OpenRepo: 'https://github.com/Mill-Pond-Research',
    SupportInvite: 'https://discord.gg/favv5rn7w3',
    // Twitter: 'https://www.twitter.com/enricoros',
    PrivacyPolicy: 'https://www.millpondresearch.com/privacy-policy.html',
    OpenProject: ''
  },
} as const;