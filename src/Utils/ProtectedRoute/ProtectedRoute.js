import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';

function ProtectedRoute({ children }) {
    const user = useSelector(selectUser);
    if (user) {
        return children;
    } else {
        return (<Navigate to="/" replace />)
    }
}

export default ProtectedRoute