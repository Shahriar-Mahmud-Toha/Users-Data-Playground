import { useContext } from 'react';
import { formatDate } from './../../utils/helpers';
import UserContext from '../../context/UserContext';
import useUserForm from '../../hooks/useUserForm';
import UsersModal from './UsersModal';


const UsersTable = () => {
    const { users } = useContext(UserContext);
    const { handleDeleteUser, handleEditUser } = useUserForm();
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
                                <div className='flex'>
                                    <div className='mr-2'><UsersModal id={index} user={user} /></div>
                                    <button className="btn text-accent mr-2" onClick={() => { handleEditUser(user) }}>Edit</button>
                                    <button className="btn text-red-400" onClick={() => { handleDeleteUser(user.id) }}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;