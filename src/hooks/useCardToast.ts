import { useToast } from '@chakra-ui/react';

export default function useCardToast() {
  const toast = useToast();

  const showToast = () => {
    toast({
      position: 'top-right',
      description: 'Card Saved',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return { showToast };
}
