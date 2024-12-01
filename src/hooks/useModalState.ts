import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { modalActions } from '../store/slices/modal.slice';

const useModalState = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(modalActions, dispatch);
};

export default useModalState;
