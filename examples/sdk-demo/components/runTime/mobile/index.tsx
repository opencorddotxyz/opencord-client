import { MobilePageContainer } from '@/components/common/pageContainer/mobile';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import { PAGE_RUNTIME_DESCRIPTION, PAGE_RUNTIME_TITLE } from '@/constant';
import { oc } from '@/lib/opencord';
import { vw } from '@/utils';
export const RunTimeMobile = () => {
  return (
    <MobilePageContainer
      pageTitle={PAGE_RUNTIME_TITLE}
      pageDescription={PAGE_RUNTIME_DESCRIPTION}
    >
      <Flex
        marginTop={vw(36)}
        width={vw(300)}
        height={vw(130)}
        borderRadius={vw(8)}
        bg="#333333"
        flexDirection="column"
        fontWeight="400"
        fontSize={vw(26)}
        lineHeight={vw(33)}
        color="#FFFFFF"
        textAlign="left"
        paddingX={vw(32)}
      >
        <Spacer />
        <Text>Version:&nbsp;{oc.version}</Text>
        <Text marginTop="5px">Platform:&nbsp;{oc.platform}</Text>
        <Spacer />
      </Flex>
    </MobilePageContainer>
  );
};
