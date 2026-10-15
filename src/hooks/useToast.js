import { useContext } from 'react';
import { ToastContext } from '../context/contexts.js';

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context.showToast;
}

export function useToastState() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastState deve ser usado dentro de um ToastProvider');
  }
  return context;
}
