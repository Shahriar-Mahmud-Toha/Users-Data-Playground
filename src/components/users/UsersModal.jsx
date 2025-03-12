const UsersModal = ({ id, user }) => {
    return (
        <div>
            <button className="btn" onClick={() => document.getElementById(id).showModal()}>Details</button>
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">User Details</h3>
                    <div className="py-4 space-y-2">
                        <p><span className="font-bold">ID:</span> {user?.id}</p>
                        <p><span className="font-bold">First Name:</span> {user?.firstName}</p>
                        <p><span className="font-bold">Last Name:</span> {user?.lastName}</p>
                        <p><span className="font-bold">City:</span> {user?.address?.city}</p>
                        <p><span className="font-bold">Gender:</span> {user?.gender}</p>
                        <p><span className="font-bold">Birth Date:</span> {user?.birthDate}</p>
                        <p><span className="font-bold">Email:</span> {user?.email}</p>
                        <p><span className="font-bold">Phone:</span> {user?.phone}</p>
                        <p><span className="font-bold">Eye Color:</span> {user?.eyeColor}</p>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default UsersModal;