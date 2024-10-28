import { UserDetailsModal } from "./UserDetailsModal/UserDetailsModal";
import "./Modal.css"


interface ModalI {
    id: number,
    modal: modals,
    onClickClose: () => void
}

type modals = 'userList';

export function Modal({ id, modal, onClickClose }: ModalI) {
    const modals = {
        userList: <UserDetailsModal id={id} onClickClose={onClickClose} />
    };
    return modals[modal];
}