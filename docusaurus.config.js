// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Knowledge Repository",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://notes.devanshshah.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: "facebook", // Usually your GitHub org/user name.
  // projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // stylesheets: [
  //   {
  //     href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
  //     type: "text/css",
  //     integrity:
  //       "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
  //     crossorigin: "anonymous",
  //   },
  // ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ",
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "notes",
          routeBasePath: "notes",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        // blog: {
        //   showReadingTime: true,
        //   remarkPlugins: [math],
        //   rehypePlugins: [katex],
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-J1B1TBNG6V",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Knowledge Repository",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "notesSidebar",
            position: "left",
            label: "Notes",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/Devanshshah1309/notes",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Devanshshah1309/notes",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Devansh Shah`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["java"],
      },
    }),
};

module.exports = config;
