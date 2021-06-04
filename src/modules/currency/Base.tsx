import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Flex, HStack, Text } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CurrencyBox } from "../../ui/CurrencyBox";
import {
  addTarget,
  selectById,
  updateAmount,
  updateBase,
} from "./currencySlice";
import { Target } from "./Target";

interface BaseProps {
  index: number;
}

export const Base: React.FC<BaseProps> = ({ index }) => {
  const currency = useAppSelector(selectById(index));
  console.log(index, currency);
  const dispatch = useAppDispatch();

  const handleChange = (val: number) => {
    dispatch(updateAmount({ amount: val, index }));
  };

  const handleSelect = (value: string) => {
    dispatch(updateBase({ index, value }));
  };

  const handleClick = () => {
    dispatch(addTarget(index));
  };

  return (
    <Flex
      initial={{
        y: -100,
      }}
      animate={{ y: 0 }}
      as={motion.div}
    >
      <Flex justifyContent="space-between" w="20%">
        <CurrencyBox
          onChange={handleChange}
          onSelect={handleSelect}
          amount={currency!.amount}
          type="base"
          value={currency!.base}
        />
        <Text mx="auto" fontSize="3xl" as="span">
          =
        </Text>
      </Flex>
      <HStack spacing={2}>
        <AnimatePresence>
          {currency!.to.map((val) => (
            <Target
              targetIndex={val.id}
              index={index}
              target={val}
              key={val.id}
            />
          ))}
        </AnimatePresence>
        <IconButton
          isRound
          colorScheme="green"
          aria-label="add"
          onClick={handleClick}
          icon={<AddIcon />}
        />
      </HStack>
    </Flex>
  );
};
