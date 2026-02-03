// docusaurus.config.js
// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HEARTOPIA',
  tagline: 'คู่มือการใช้ชีวิตในโลกสุดน่ารัก', // แก้คำโปรยให้ตรงธีม
  favicon: 'img/favicon.ico',

  // ตั้งค่า URL สำหรับ GitHub Pages
  url: 'https://heartopia-wiki-psi.vercel.app/', // (ใส่อันนี้เพื่อให้ Canonical URL ถูกต้อง)
  baseUrl: '/',

  // Config ของ GitHub
  organizationName: 'ntwtensx',
  projectName: 'heartopia-wiki',

  // สำคัญ: ถ้าเจอลิงก์เสีย ให้แค่เตือน อย่าหยุดทำงาน
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        // 🔴 ปิด Blog ชั่วคราวเพื่อแก้ปัญหา Error 404
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'HEARTOPIA',
        logo: {
          alt: 'Heartopia Logo',
          src: 'img/logo.svg',
        },
        // ✨ เมนูที่เราสร้างจริง
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'คู่มือเกม (Wiki)', // ลิงก์เข้า docs/intro
          },
          {to: '/map', label: 'แผนที่โลก', position: 'left'}, // ลิงก์หน้าแผนที่
          {to: '/animal-catalog', label: 'สมุดภาพสัตว์', position: 'left'}, // ลิงก์หน้าสัตว์
          
          // ลิงก์ GitHub ของคุณ (ถ้าอยากใส่)
          {
            href: 'https://github.com/ntwtensx/heartopia-wiki',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light', // ใช้ธีมสว่างเข้ากับความ Cute
        links: [
          // ล้างลิงก์ขยะออก หรือจะใส่ลิงก์ Community เกมจริงๆ ก็ได้
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Heartopia Fan Wiki. Built with Love & Rocket Coding 🚀`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;