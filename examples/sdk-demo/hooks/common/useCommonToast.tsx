import { useToast } from '@chakra-ui/react';

export const useCommonToast = () => {
  const toast = useToast();

  const openErrorToast = (text: string) => {
    if (!text) {
      return;
    }

    toast({
      position: 'top',
      title: text,
      status: 'error',
      isClosable: true,
    });
  };

  const openSuccessToast = (text: string) => {
    if (!text) {
      return;
    }

    toast({
      position: 'top',
      title: text,
      status: 'success',
      isClosable: true,
    });
  };

  return {
    openErrorToast,
    openSuccessToast,
  };
};
