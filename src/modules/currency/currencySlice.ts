import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import type { AppState } from "../../app/store";

export interface ICurrency {
  base: string;
  id: number;
  amount: number;
  to: ITarget[];
}

export interface ITarget {
  id: number;
  type: string;
}

const initialState: ICurrency[] = [
  {
    id: 1,
    base: "RUB",
    amount: 198000,
    to: [{ id: 1, type: "USD" }],
  },
];

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateBase: (
      state,
      { payload }: PayloadAction<{ index: number; value: string }>
    ) => {
      const idx = state.findIndex((val) => val.id === payload.index);
      state[idx].base = payload.value;
    },
    updateAmount: (
      state,
      { payload }: PayloadAction<{ index: number; amount: number }>
    ) => {
      const idx = state.findIndex((val) => val.id === payload.index);
      state[idx].amount = payload.amount;
    },
    updateTarget: (
      state,
      {
        payload,
      }: PayloadAction<{ index: number; targetIndex: number; value: string }>
    ) => {
      const idx = state.findIndex((val) => val.id === payload.index);
      const targetIdx = state[idx].to.findIndex(
        (val) => val.id === payload.targetIndex
      );

      state[idx].to[targetIdx].type = payload.value;
    },
    addBase: (state) => {
      const last = state[state.length - 1];
      const newObj = { ...last, id: last.id + 1 };
      state.push(newObj);
    },
    addTarget: (state, { payload }: PayloadAction<number>) => {
      const idx = state.findIndex((val) => val.id === payload);
      console.log(idx);
      const base = state[idx];
      const last = base.to[base.to.length - 1];
      base.to.push({ type: "USD", id: last.id + 1 });
    },
    deleteTarget: (
      state,
      { payload }: PayloadAction<{ id: number; targetId: number }>
    ) => {
      const baseIndex = state.findIndex((v) => v.id === payload.id);
      const newState = state[baseIndex].to.filter(
        (v) => v.id !== payload.targetId
      );
      state[baseIndex].to = newState;
    },
  },
});

const selectSelf = (state: AppState) => state.currency;

export const selectById = (id: number) =>
  createDraftSafeSelector(selectSelf, (state) => {
    return state.find((val) => val.id === id);
  });

export const {
  updateBase,
  updateAmount,
  updateTarget,
  deleteTarget,
  addBase,
  addTarget,
} = currencySlice.actions;

export const selectCurrency = (state: AppState) => state.currency;

export default currencySlice.reducer;
