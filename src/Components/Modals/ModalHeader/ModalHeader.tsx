import '../Modal.css';

interface ModalHeaderI {
    title: string,
    onClickClose: () => void
}

export function ModalHeader({ title, onClickClose }: ModalHeaderI) {
    return (
        <div className="modal">
            <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <button className="close-icon" onClick={onClickClose}>
                    ✕
                </button>
            </div>
        </div>
    )
}