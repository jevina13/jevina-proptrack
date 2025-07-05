import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to properties page as main landing page
    navigate('/properties', { replace: true });
  }, [navigate]);

  return null; // This will briefly show before redirect
};

export default Index;
