import { formatDate } from './../../utils/helpers';
import { handleDeleteUser, handleEditUser } from './userFormHandler';

const UsersTable = ({ users, setUsers, setFormData, setEditingUserId }) => {
    return (
        <div className="mx-auto overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>City</th>
                        <th>Gender</th>
                        <th>Birth Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address.city}</td>
                            <td>{user.gender}</td>
                            <td>{formatDate(user.birthDate)}</td>
                            <td>
                                <button className="btn text-accent mr-2" onClick={() => { handleEditUser(user, setFormData, setEditingUserId) }}>Edit</button>
                                <button className="btn text-red-400" onClick={() => { handleDeleteUser(user.id, setUsers, users) }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;