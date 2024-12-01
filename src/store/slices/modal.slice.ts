import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface InitialState {
  modalClassActive: string;
}
const initialState: InitialState = {
  modalClassActive: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: () => initialState,
    openModal: (state, action: PayloadAction<string>) => {
      state.modalClassActive = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
