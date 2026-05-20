import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a' }}>
        <div style={{ width: '30px', height: '30px', border: '3px solid #333', borderTopColor: '#f5f5f5', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
