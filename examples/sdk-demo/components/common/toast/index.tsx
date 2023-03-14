import { Flex, Text } from '@chakra-ui/react';

export const TextToast = (props: { text: string; onClick?: () => void }) => {
  return (
    <Flex
      align="center"
      textAlign="center"
      justifyContent="center"
      padding="6px 20px"
      borderRadius="32px"
      display="inline-block"
      bg="#383838"
    >
      <Text
        textAlign="center"
        color={'#FFFFFF'}
        fontWeight="500"
        maxW="644px"
        fontSize="14px"
        bg="#3B3B3B"
        boxShadow={`0px 4px 4px rgba(40, 40, 40, 0.25)}`}
        borderRadius="100px"
        padding="6px 17px"
        lineHeight="18px"
        cursor={props.onClick ? 'pointer' : 'default'}
        onClick={props?.onClick}
      >
        {props.text}
      </Text>
    </Flex>
  );
};
