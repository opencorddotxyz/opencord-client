import { Box, Text } from '@chakra-ui/react';
import { vw } from '@/utils';
export const MobilePageContainer = (props: {
  pageTitle: string;
  pageDescription: string;
  children: JSX.Element;
}) => {
  const { pageTitle, pageDescription, children } = props;
  return (
    <Box>
      <Text
        fontWeight="700"
        fontSize={vw(56)}
        lineHeight={vw(71)}
        color="#FFFFFF"
      >
        {pageTitle}
      </Text>
      <Text
        marginTop={vw(48)}
        fontWeight="500"
        fontSize={vw(26)}
        lineHeight={vw(33)}
        color="#777777"
      >
        {pageDescription}
      </Text>
      {children}
    </Box>
  );
};
