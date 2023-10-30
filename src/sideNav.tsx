import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut,onAuthStateChanged } from 'firebase/auth'; // Corrected the import statement

const SideNav: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Added useNavigate to handle navigation
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to the login page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const profile = user.photoURL; // Get the user's profile picture URL
        setProfilePictureUrl(profile);



      //add users profile name
      const displayName = user.displayName;
      setUserDisplayName(displayName);

      } else {
        // User is signed out.
        setProfilePictureUrl(null);
      }
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [auth]);


  return (
    <div>
      <nav className="nav">
        
        <div className="profile-picture">
{profilePictureUrl ? (<img src={profilePictureUrl} alt="Avatar" className="Avatar" />)
: ( <img src="../IMG/avatar.jpg" alt="Default Avatar" className="Avatar" />)}
        
        </div>
         <div className="welcome-message">
         {userDisplayName && <p>Welcome, {userDisplayName}</p>}</div>
        <ul>
          <li>
            <Link className="links" to="/">Home</Link>
          </li>
          <li>
            <Link className="links" to="/Creative">Creative</Link>
          </li>
          <li>
            <Link className="links" to="/contact">Contact</Link>
          </li>
        </ul>
        <button onClick={handleSignOut}>Sign Out</button>
      </nav>
    </div>
  );
};

export default SideNav;
