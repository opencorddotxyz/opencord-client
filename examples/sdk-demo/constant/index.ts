export * from './page';
export const groupOptions = [
  {
    label: 'server',
    value: '1',
  },
  {
    label: 'channel',
    value: '2',
  },
  {
    label: 'membership',
    value: '3',
  },
  {
    label: 'chat channel',
    value: '4',
  },
  {
    label: 'voice channel',
    value: '5',
  },
  {
    label: 'announcement channel',
    value: '6',
  },
  {
    label: 'forum channel',
    value: '7',
  },
  {
    label: 'guide channel',
    value: '8',
  },
];

export type permissionOptionsType = {
  label: string;
  value: number;
};
interface IPermissionsOptions {
  [key: string]: Array<permissionOptionsType>;
}
export const permissionsOptions: IPermissionsOptions = {
  '1': [
    {
      label: 'Manage Overview',
      value: 1,
    },
    {
      label: 'Manage Roles',
      value: 2,
    },
    {
      label: 'Manage Applications',
      value: 4,
    },
  ],
  '2': [
    {
      label: 'View Channels',
      value: 1,
    },
    {
      label: 'Manage Channels',
      value: 2,
    },
  ],
  '3': [
    {
      label: 'Create Invites',
      value: 1,
    },
    {
      label: 'Kick',
      value: 2,
    },
    {
      label: 'Ban',
      value: 4,
    },
    {
      label: 'Timeout',
      value: 8,
    },
  ],
  '4': [
    {
      label: 'Send Messages',
      value: 1,
    },
    {
      label: 'Manage Messages',
      value: 2,
    },
  ],
  '5': [
    {
      label: 'Speak',
      value: 1,
    },
    {
      label: 'Manage Voices',
      value: 2,
    },
  ],
  '6': [
    {
      label: 'Manage Announcements',
      value: 1,
    },
  ],
  '7': [
    {
      label: 'Create Posts',
      value: 1,
    },
    {
      label: 'Reply',
      value: 2,
    },
    {
      label: 'Manage Posts',
      value: 4,
    },
    {
      label: 'Mentions',
      value: 8,
    },
  ],
  '8': [
    {
      label: 'Manage Messages',
      value: 1,
    },
  ],
};

export const ListItem = [
  {
    label: 'notify',
    value: 'notify',
  },
  {
    label: 'validateChannelPermissions',
    value: 'validateChannelPermissions',
  },
  {
    label: 'validateServerPermissions',
    value: 'validateServerPermissions',
  },
];

export const OPENCORD_DOCS_LINK = 'https://developers.opencord.xyz';
export const PAGE_SIDEBAR_RUNTIME = 1;
export const PAGE_SIDEBAR_CODE = 2;
export const PAGE_SIDEBAR_ADDRESS = 3;
export const PAGE_SIDEBAR_PERMISSIONS = 4;
export const PAGE_SIDEBAR_NOTION = 5;

export const SyntaxHighlighterTheme = {
  hljs: {
    color: '#FFFFFF',
    padding: '10px',
    background: '#333333',
  },
};
export const sidebarList = [
  {
    headline: 'Get runtime information',
    marking: PAGE_SIDEBAR_RUNTIME,
  },
  {
    headline: 'Get authorization code',
    marking: PAGE_SIDEBAR_CODE,
  },
  {
    headline: 'Get wallet address',
    marking: PAGE_SIDEBAR_ADDRESS,
  },
  {
    headline: 'Validate permissions',
    marking: PAGE_SIDEBAR_PERMISSIONS,
  },
  {
    headline: 'Push notification',
    marking: PAGE_SIDEBAR_NOTION,
  },
];
