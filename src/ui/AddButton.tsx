import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";

interface AddButtonProps {}

export const AddButton: React.FC<AddButtonProps> = ({}) => {
  return (
    <IconButton
      colorScheme="green"
      variant="solid"
      aria-label="add"
      icon={<AddIcon />}
    />
  );
};
