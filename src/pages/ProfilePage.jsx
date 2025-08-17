import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProfileCard from './ProfileCard'; // Import the new animated card
import './ProfilePage.css'; // Your original styles for the container/form
import './ProfileCard.css'; // The new styles for the card itself

const ProfilePage = ({ user, onLogout, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // 1. Initial state changed to null
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // Use the Dicebear API for a fallback avatar
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
      {isEditing ? (
        // --- EDITING MODE ---
        // This uses your original form and styles
        <div className="profile-card edit-view">
          {/* 2. Image is now conditionally rendered */}
          {profileImage && <img src={profileImage} alt="Profile" className="profile-picture" />}
          <div className="edit-form">
            <label htmlFor="profileImageInput" className="image-upload-label">Change Photo</label>
            <input id="profileImageInput" type="file" accept="image/*" onChange={handleImageChange} />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
            <input type="email" value={email} disabled />
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        // --- DISPLAY MODE ---
        // This renders the new animated ProfileCard
        <div className="display-container">
          <ProfileCard
            name={user.name}
            title={user.title || "User"}
            handle={user.email}
            status="Online"
            contactText="Logout"
            avatarUrl={profileImage}
            onContactClick={handleLogout}
            enableTilt={true}
          />
          {/* We add our own Edit button outside the card */}
          <button onClick={() => setIsEditing(true)} className="edit-button-main">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;