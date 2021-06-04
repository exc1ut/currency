import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Base } from "./Base";
import { addBase, selectCurrency } from "./currencySlice";

interface indexProps {}

export const Currency: React.FC<indexProps> = ({}) => {
  const currencies = useAppSelector(selectCurrency);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(addBase());
  };

  return (
    <Box p={7}>
      <Flex>
        <Text width="20%" fontSize="3xl">
          From
        </Text>
        <Text fontSize="3xl">To</Text>
      </Flex>
      {currencies.map((val) => (
        <Box py={2}>
          <Base index={val.id} key={val.id} />
        </Box>
      ))}
      <Flex pt={2}>
        <IconButton
          aria-label="add"
          colorScheme="green"
          onClick={handleClick}
          isRound
          icon={<AddIcon />}
        />
      </Flex>
    </Box>
  );
};
