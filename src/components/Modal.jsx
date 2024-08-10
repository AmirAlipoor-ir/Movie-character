import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, onOpen, open }) {
  if (!open) return null;
  return (
    <div>
      <div className="w-screen h-screen fixed inset-0 bg-backDrop z-20" onClick={() => onOpen(false)}></div>
      <div className="modal z-20">
        <div className="modal__header">
          <h2 className="text-slate-200">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="icon text-red-600" />
          </button>
        </div>
        <div className="">{children}</div>
        
      </div>
    </div>
  );
}

export default Modal;
