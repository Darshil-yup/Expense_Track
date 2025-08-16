import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = ({ user, onLogout, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`);
    }
  }, [user]);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, name, email, profileImage };
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>No User Logged In</h2>
          <p>Please <Link to="/login">login</Link> to see your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={profileImage} alt="Profile" className="profile-picture" />
        
        {isEditing ? (
          <div className="edit-form">
            <label htmlFor="profileImageInput" className="image-upload-label">Change Photo</label>
            <input id="profileImageInput" type="file" accept="image/*" onChange={handleImageChange} />
            
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" value={email} disabled /> {/* Email is usually not editable */}
            
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </div>
        ) : (
          <div className="display-view">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;