import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REQUEST_TYPE, STEP_NAMES } from "../../constants/wizard";
import { FC } from "react";
interface StepState {
  key: string;
  label: string;
  isDone: boolean;
  component: string;
  idx: number;
  requestType: REQUEST_TYPE;
}

const initialState: {
  steps: StepState[];
  activeStepIdx: number;
} = {
  steps: [
    {
      key: "SOURCE",
      label: STEP_NAMES.SOURCE,
      isDone: false,
      component: "stepOne",
      idx: 0,
      requestType: REQUEST_TYPE.DATABASE,
    },
    {
      key: "SCHEMA_AND_TABLE",
      label: STEP_NAMES.SCHEMA_AND_TABLE,
      isDone: false,
      component: "stepTwo",
      idx: 1,
      requestType: REQUEST_TYPE.SCHEMA,
    },
    {
      key: "COLUMNS",
      label: STEP_NAMES.COLUMNS,
      isDone: false,
      component: "stepThree",
      idx: 2,
      requestType: REQUEST_TYPE.COLUMNS_GET,
    },
    {
      key: "COLUMNS_TYPE",
      label: STEP_NAMES.COLUMNS_TYPE,
      isDone: false,
      component: "stepFour",
      idx: 3,
      requestType: REQUEST_TYPE.COLUMNS_TYPE_POST,
    },
    {
      key: "SELECTED_ORDINAL_COLUMNS",
      label: STEP_NAMES.SELECTED_ORDINAL_COLUMNS,
      isDone: false,
      component: "stepFive",
      idx: 4,
      requestType: REQUEST_TYPE.COLUMNS_SELECTED_ORDINAL_POST,
    },
  ],
  activeStepIdx: 0,
};

export const wizardSlice = createSlice({
  name: "wizard",
  initialState,
  reducers: {
    setSteps: (state, action: PayloadAction<{ steps: StepState[] }>) => {
      const { steps } = action.payload;
      state.steps = steps;
    },

    setActiveStepIdx: (state, action: PayloadAction<{ idx: number }>) => {
      const { idx } = action.payload;
      state.activeStepIdx = idx;
    },
    setInitialActiveStep: (
      state,
      action: PayloadAction<{ stepKey: string }>
    ) => {
      const { stepKey } = action.payload;
      state.activeStepIdx =
        state.steps.find((step) => step.key === stepKey)?.idx ?? 0;
    },
    handleNext: (state) => {
      state.steps[state.activeStepIdx].isDone = true;
      if (state.activeStepIdx < state.steps.length - 1) {
        state.activeStepIdx++;
      }
    },
    handleBack: (state) => {
      state.steps[state.activeStepIdx].isDone = false;
      if (state.activeStepIdx > 0) {
        state.activeStepIdx--;
        if (state.activeStepIdx === 0) {
          state.steps[0].isDone = false;
        }
      }
    },
  },
});

export const {
  setSteps,
  setActiveStepIdx,
  setInitialActiveStep,
  handleNext,
  handleBack,
} = wizardSlice.actions;

export default wizardSlice.reducer;
