import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchUsers, updateUserStatus, deleteUser } from '../redux/slices/userSlice';
import AdminLayout from '../components/layout/AdminLayout';
import { toast } from 'react-toastify';
import { FaTrash, FaUserAlt, FaUserSlash, FaUserCheck } from 'react-icons/fa';

// Styled components
const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};
  text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.secondary}, transparent);
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const UserCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: rgba(255, 202, 40, 0.6);
  }
  
  /* Comic book style effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
    pointer-events: none;
    opacity: 0.5;
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  
  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const UserName = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const UserInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UserInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  span:first-child {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  span:last-child {
    color: ${({ theme }) => theme.colors.text.light};
    font-weight: 500;
  }
`;

const UserActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'edit':
        return theme.colors.info;
      case 'delete':
        return theme.colors.error;
      case 'activate':
        return theme.colors.success;
      case 'deactivate':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'active':
        return theme.colors.success;
      case 'inactive':
        return theme.colors.warning;
      case 'banned':
        return theme.colors.error;
      default:
        return theme.colors.gray[500];
    }
  }};
  color: ${({ theme }) => theme.colors.white};
`;

const SearchBar = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  
  input {
    flex: 1;
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid rgba(255, 202, 40, 0.3);
    background: rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme.colors.white};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.2);
    }
  }
`;

// Modal components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 500px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  
  /* Comic book style effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
    pointer-events: none;
    opacity: 0.5;
    z-index: -1;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ModalButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'confirm':
        return theme.colors.error;
      case 'cancel':
        return theme.colors.gray[600];
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 202, 40, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleStatusChange = (userId, newStatus) => {
    dispatch(updateUserStatus({ id: userId, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success(`User status updated to ${newStatus}`);
      })
      .catch((err) => {
        toast.error(`Failed to update user status: ${err}`);
      });
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser._id))
        .unwrap()
        .then(() => {
          toast.success('User deleted successfully');
          setShowDeleteModal(false);
          setSelectedUser(null);
        })
        .catch((err) => {
          toast.error(`Failed to delete user: ${err}`);
        });
    }
  };

  return (
    <AdminLayout>
      <PageTitle>User Management</PageTitle>
      
      <SearchBar>
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBar>
      
      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <UserGrid>
          {filteredUsers.map((user) => (
            <UserCard key={user._id}>
              <UserHeader>
                <UserAvatar>
                  <FaUserAlt />
                </UserAvatar>
                <div>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </div>
              </UserHeader>
              
              <UserInfo>
                <UserInfoItem>
                  <span>Status:</span>
                  <StatusBadge status={user.status || 'active'}>
                    {user.status || 'Active'}
                  </StatusBadge>
                </UserInfoItem>
                <UserInfoItem>
                  <span>Joined:</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </UserInfoItem>
                <UserInfoItem>
                  <span>Orders:</span>
                  <span>{user.orderCount || 0}</span>
                </UserInfoItem>
              </UserInfo>
              
              <UserActions>
                {user.status === 'inactive' ? (
                  <ActionButton 
                    variant="activate"
                    onClick={() => handleStatusChange(user._id, 'active')}
                  >
                    <FaUserCheck /> Activate
                  </ActionButton>
                ) : (
                  <ActionButton 
                    variant="deactivate"
                    onClick={() => handleStatusChange(user._id, 'inactive')}
                  >
                    <FaUserSlash /> Deactivate
                  </ActionButton>
                )}
                <ActionButton 
                  variant="delete"
                  onClick={() => handleDeleteClick(user)}
                >
                  <FaTrash /> Delete
                </ActionButton>
              </UserActions>
            </UserCard>
          ))}
        </UserGrid>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirm Delete</ModalTitle>
            <p>Are you sure you want to delete the user {selectedUser?.name}? This action cannot be undone.</p>
            <ModalButtons>
              <ModalButton variant="cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="confirm" onClick={confirmDelete}>
                Delete
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </AdminLayout>
  );
};

export default UsersPage;
