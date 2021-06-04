import {
  ITarget,
  selectById,
  updateTarget,
  deleteTarget,
} from "./currencySlice";
import { useConvert } from "../../api/useConvert";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CurrencyBox } from "../../ui/CurrencyBox";

interface TargetProps {
  target: ITarget;
  targetIndex: number;
  index: number;
}

export const Target: React.FC<TargetProps> = ({
  target,
  index,
  targetIndex,
}) => {
  const base = useAppSelector(selectById(index))!;
  const dispatch = useAppDispatch();
  const converted = useConvert(base.base, target.type, base.amount);

  const handleSelect = (val: string) => {
    dispatch(updateTarget({ index, value: val, targetIndex }));
  };

  const handleDelete = () => {
    dispatch(deleteTarget({ id: index, targetId: target.id }));
  };

  return (
    <CurrencyBox
      type="to"
      onDelete={handleDelete}
      id={target.id}
      isLoading={converted.isLoading}
      amount={converted.data!}
      isDeletable={target.id !== 1}
      onSelect={handleSelect}
      value={target.type}
    />
  );
};
