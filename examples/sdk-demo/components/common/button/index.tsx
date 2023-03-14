import { Box, CircularProgress, Text } from '@chakra-ui/react';
import { vw } from '@/utils';
export const OButton = (props: {
  text: string;
  onClick?: () => void;
  loading?: boolean;
  width: string;
}) => {
  const { text, onClick, loading, width } = props;
  return (
    <Box
      padding="0px 12px"
      display="inline-block"
      height="30px"
      minHeight="30px"
      borderRadius="4px"
      bg="#FFFFFF"
      opacity={0.9}
      fontWeight="500"
      fontSize="14px"
      lineHeight="30px"
      color="#282828"
      textAlign="center"
      cursor="pointer"
      marginTop="20px"
      width={width}
      onClick={onClick}
      overflow="hidden"
    >
      {!loading ? (
        text
      ) : (
        <CircularProgress isIndeterminate color={'#000000'} size={21} />
      )}
    </Box>
  );
};

export const MobileButton = (props: {
  text: string;
  onClick?: () => void;
  loading?: boolean;
}) => {
  const { onClick, text, loading } = props;
  return (
    <Box height={vw(72)} bg="#FFFFFF" borderRadius={vw(10)} marginTop={vw(32)}>
      <Text
        fontWeight="600"
        fontSize={vw(28)}
        lineHeight={vw(72)}
        color="#1B1B1B"
        textAlign="center"
        onClick={onClick}
        overflow="hidden"
      >
        {!loading ? (
          text
        ) : (
          <CircularProgress isIndeterminate color={'#000000'} size={21} />
        )}
      </Text>
    </Box>
  );
};
