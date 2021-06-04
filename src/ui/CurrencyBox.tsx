import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { motion } from "framer-motion";
import codes from "../data/codes.json";
import { roundNumber } from "../utilities/app";

type CommonProps = {
  value: string;
  onSelect: (val: string) => void;
  amount: number;
};

type CurrencyBoxProps =
  | { type: "base"; onChange: (val: number) => void }
  | {
      type: "to";
      isLoading: boolean;
      onDelete: (id: number) => void;
      id: number;
      isDeletable: boolean;
    };

type Props = CommonProps & CurrencyBoxProps;

export const CurrencyBox = (props: Props) => {
  return (
    <Flex
      justifyContent="space-between"
      borderColor="#3D97C8"
      w={200}
      boxShadow="0px 0px 10px #3D97C8"
      borderRadius={10}
      borderWidth={2}
      alignItems="center"
      p={2}
      as={motion.div}
      initial={{
        x: -100,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <Box>
        <Select
          onChange={(e) => props.onSelect(e.target.value)}
          value={props.value}
          size="sm"
          variant="unstyled"
        >
          {Object.keys(codes).map((v) => (
            <option>{v}</option>
          ))}
        </Select>
      </Box>
      {props.type === "to" && props.isLoading ? (
        <Spinner color="blue.500" />
      ) : (
        <Input
          isDisabled={props.type === "to"}
          onChange={(e) =>
            props.type === "base" && props.onChange(+e.target.value)
          }
          value={roundNumber(props.amount)}
          textAlign="right"
          type="number"
          w="50%"
          variant="unstyled"
        />
      )}
      {props.type === "to" && props.isDeletable && (
        <IconButton
          size="xs"
          onClick={() => props.onDelete(props.id)}
          color="red.700"
          variant="ghost"
          aria-label="asd"
          icon={<DeleteIcon />}
        />
      )}
    </Flex>
  );
};
