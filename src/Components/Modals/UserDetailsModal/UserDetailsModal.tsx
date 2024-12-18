import { ModalHeader } from "../ModalHeader/ModalHeader";

import { useGetUsersList } from "../../../Store/Users/users.hooks";
import { User } from "../../../Types/Users/Users.type";

import "./UserDetailsModal.css";

interface UserDetailsModalI {
    id: number;
    onClickClose: () => void;
}
export function UserDetailsModal({ id, onClickClose }: UserDetailsModalI) {
    const { userList } = useGetUsersList();

    const userDetails: User = userList?.find((user) => user.id === id) as User;
    const companyAddress = `${userDetails.company.address.address}, ${userDetails.company.address.city}, ${userDetails.company.address.state} - ${userDetails.company.address.postalCode}`

    const InfoLabel = ({ label,  value} : { label: string, value: string }) => {
        if (value === '' || !value) {
            value = '-';
        }

        return (
            <div className="info">
                <div className="label">{label}</div>
                <div className="details-value">{value}</div>
            </div>
        )
    }

    return (
        <>
            <div className="background" onClick={onClickClose} />
            <div className="modal-container">
                <ModalHeader title="User Details" onClickClose={onClickClose} />
                {userDetails && (
                    <>
                        <div className="user-modal-content">
                            <div className="grid-row">
                                <InfoLabel label="First Name:" value={userDetails.firstName} />
                                <InfoLabel label="Last Name:" value={userDetails.lastName} />
                            </div>
                            <div className="grid-row">
                                <InfoLabel label="Email:" value={userDetails.email} />
                                <InfoLabel label="Phone Number:" value={userDetails.phone} />
                            </div>
                            <div className="grid-row">
                                <InfoLabel label="Company Name:" value={userDetails.company.name} />
                                <InfoLabel label="Company Title:" value={userDetails.company.title} />
                            </div>
                            <div className="grid-row">
                                <InfoLabel label="Company Department:" value={userDetails.company.department} />
                                <InfoLabel label="Company Address:" value={companyAddress} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}