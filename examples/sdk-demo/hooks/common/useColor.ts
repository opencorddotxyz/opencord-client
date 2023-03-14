import { useColorMode } from '@chakra-ui/react';

type StaticColor = {
  staticPrimary: string;
  staticWhite: string;
  staticBlack: string;
  online: string;
  upgrade: string;
  speaking: string;
  offline: string;
  twitterColor: string;
};

type VariantColor = {
  basicBrand: string;
  basicBgDP0: string;
  basicBgDP1: string;
  basicBgDP2: string;
  basicBgDP3: string;
  basicBgDP4: string;
  basicBgDP5: string;
  basicBgDP6: string;
  basicColor: string;
  danger: string;
  info: string;
  warning: string;
  success: string;
  notSupport: string;
  panda: string;
  quote: string;
  dangerBg: string;
} & StaticColor;

const _staticColors: StaticColor = {
  staticPrimary: '#282828',
  staticWhite: '#FFFFFF',
  staticBlack: '#000000',
  online: '#A2FF03',
  upgrade: '#A2FF03',
  speaking: '#A2FF03',
  offline: '#7C7C7C',
  twitterColor: '#0085FF',
};

const _lightColors = { ..._staticColors } as VariantColor;
const _darkColors = { ..._staticColors } as VariantColor;

const _initColorMap = (key: string, light: string, dark: string) => {
  _lightColors[key] = light;
  _darkColors[key] = dark;
};

_initColorMap('basicBrand', '#16b8f3', '#16b8f3');
_initColorMap('basicBgDP0', '#FFFFFF', '#282828');
_initColorMap('basicBgDP1', '#F4F4F4', '#333333');
_initColorMap('basicBgDP2', '#F0F0F0', '#373737');
_initColorMap('basicBgDP3', '#ECECEC', '#3B3B3B');
_initColorMap('basicBgDP4', '#E3E3E3', '#444444');
_initColorMap('basicBgDP5', '#DADADA', '#4D4D4D');
_initColorMap('basicBgDP6', '#D2D2D2', '#555555');
_initColorMap('basicColor', '#282828', '#ffffff');
_initColorMap('danger', '#EE4245', '#EE4C52');
_initColorMap('info', '#7CAEFF', '#87B5FF');
_initColorMap('warning', '#FFDC19', '#FFE524');
_initColorMap('success', '#82C115', '#8BCC1B');
_initColorMap('notSupport', '#03ff59', '#03ff59');
_initColorMap('panda', '#ffffff', '#000000');
_initColorMap('quote', '#16b8f3', '#16b8f3');
_initColorMap('dangerBg', 'rgba(255,55,55,0.3)', 'rgba(255,55,55,0.3)');

export function useColor(reverse = false) {
  const { colorMode } = useColorMode();
  const isLight = reverse ? colorMode !== 'light' : colorMode === 'light';
  const colors = isLight ? _lightColors : _darkColors;

  return {
    isLight,
    isDark: !isLight,
    ...colors,
  };
}
