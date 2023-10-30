import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, onAuthStateChanged, Unsubscribe } from 'firebase/auth';

interface IAuthRouteProps {
  auth: Auth; // Assuming you are passing the Firebase Auth instance as a prop
}

const AuthRoute: React.FC<IAuthRouteProps> = ({ auth, children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log('unauthorized');
        navigate('/login');
      }
    });

    return () => {
      // Unsubscribe from the onAuthStateChanged listener to prevent memory leaks
      unsubscribe();
    };
  }, [auth, navigate]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}

export default AuthRoute;
