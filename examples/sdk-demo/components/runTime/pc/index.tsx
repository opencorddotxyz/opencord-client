import { PageContainer } from '@/components/common/pageContainer';
import { PAGE_RUNTIME_DESCRIPTION, PAGE_RUNTIME_TITLE } from '@/constant';
import { oc } from '@/lib/opencord';
import { Text, Flex, Spacer } from '@chakra-ui/react';

export const RunTimeInformation = () => {
  return (
    <PageContainer
      pageTitle={PAGE_RUNTIME_TITLE}
      pageDescription={PAGE_RUNTIME_DESCRIPTION}
    >
      <Flex
        marginTop="20px"
        height="64px"
        borderRadius="4px"
        bg="#333333"
        flexDirection="column"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
        color="#FFFFFF"
        textAlign="left"
        padding="12px 16px"
        width="min"
      >
        <Spacer />
        <Text>Version:&nbsp;{oc.version}</Text>
        <Text marginTop="5px">Platform:&nbsp;{oc.platform}</Text>
        <Spacer />
      </Flex>
    </PageContainer>
  );
};
