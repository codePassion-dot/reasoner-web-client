import { RootState } from "..";

export const selectSteps = (state: RootState) => state.wizard.steps;
export const selectActiveStepIdx = (state: RootState) =>
  state.wizard.activeStepIdx;
