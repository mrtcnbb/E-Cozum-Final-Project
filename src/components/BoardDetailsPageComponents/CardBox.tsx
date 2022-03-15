import { Box, Text, Icon } from '@chakra-ui/react';
import { BiCommentDetail, BiFile } from 'react-icons/bi';
import MiniLabel from './MiniLabel';
import CardTag from './CardTag';

function CardBox() {
  const labels = ['red', 'blue', 'orange', 'green'];
  return (
    <Box bg="#F9F9F9" borderRadius="2xl" boxShadow="sm" width={286} m={100} border="1px" borderColor="rgb(230,230,230)">
      <Box p="15px">
        <Box display="flex" gap={2}>
          {labels.map((item: string) => {
            return <MiniLabel labelColor={item} key={item} />;
          })}
        </Box>
        <Text my="18px">Card Title</Text>
        <Box display="flex" justifyContent="start" gap="5px">
          <CardTag tagType="dueDate" test="test" />
          <CardTag tagType="checkRatio" test="test" />
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="47px"
        p="18px"
        borderTop="1px"
        borderColor="rgb(230,230,230)"
      >
        <Box>
          <Icon boxSize={4} as={BiFile} />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="30px">
          <Icon boxSize={4} mt="2px" as={BiCommentDetail} />
          <Text fontSize="xs" display="inline-block" lineHeight="0">
            2
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default CardBox;
