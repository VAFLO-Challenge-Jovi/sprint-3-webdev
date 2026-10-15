import { Trash2 } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

export default function ConfirmDialog({ open, title, description, confirmLabel, onConfirm, onCancel, loading }) {
  return (
    <Modal open={open} onClose={onCancel} icon={Trash2} tone="danger" title={title} description={description}>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" block onClick={onCancel} autoFocus>
          Cancelar
        </Button>
        <Button variant="danger" block onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
