import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/heartopia-wiki/__docusaurus/debug',
    component: ComponentCreator('/heartopia-wiki/__docusaurus/debug', '5b7'),
    exact: true
  },
  {
    path: '/heartopia-wiki/__docusaurus/debug/config',
    component: ComponentCreator('/heartopia-wiki/__docusaurus/debug/config', '42b'),
    exact: true
  },
  {
    path: '/heartopia-wiki/__docusaurus/debug/content',
    component: ComponentCreator('/heartopia-wiki/__docusaurus/debug/content', '555'),
    exact: true
  },
  {
    path: '/heartopia-wiki/__docusaurus/debug/globalData',
    component: ComponentCreator('/heartopia-wiki/__docusaurus/debug/globalData', 'd20'),
    exact: true
  },
  {
    path: '/heartopia-wiki/__docusaurus/debug/metadata',
    component: ComponentCreator('/heartopia-wiki/__docusaurus/debug/metadata', '21a'),
    exact: true
  },
  {
    path: '/heartopia-wiki/__docusaurus/debug/registry',
    component: ComponentCreator('/heartopia-wiki/__docusaurus/debug/registry', '855'),
    exact: true
  },
  {
    path: '/heartopia-wiki/__docusaurus/debug/routes',
    component: ComponentCreator('/heartopia-wiki/__docusaurus/debug/routes', '176'),
    exact: true
  },
  {
    path: '/heartopia-wiki/docs',
    component: ComponentCreator('/heartopia-wiki/docs', 'f74'),
    routes: [
      {
        path: '/heartopia-wiki/docs',
        component: ComponentCreator('/heartopia-wiki/docs', 'a6f'),
        routes: [
          {
            path: '/heartopia-wiki/docs',
            component: ComponentCreator('/heartopia-wiki/docs', '614'),
            routes: [
              {
                path: '/heartopia-wiki/docs/intro',
                component: ComponentCreator('/heartopia-wiki/docs/intro', '581'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
