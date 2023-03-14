import { Box, Text } from '@chakra-ui/react';

export const PageContainer = (props: {
  pageTitle: string;
  pageDescription: string;
  children: JSX.Element;
}) => {
  const { pageTitle = '', pageDescription = '', children } = props;
  return (
    <Box>
      <Text fontWeight="700" fontSize="24px" lineHeight="30px" color="#FFFFFF">
        {pageTitle}
      </Text>
      <Text
        fontWeight="400"
        fontSize="16px"
        lineHeight="24px"
        color="rgba(255,255,255,0.8)"
        marginTop="10px"
      >
        {pageDescription}
      </Text>
      {children}
    </Box>
  );
};
