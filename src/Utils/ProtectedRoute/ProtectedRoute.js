import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';

function ProtectedRoute({ teacherOnly, children }) {
    const user = useSelector(selectUser);
    if (user) {
        if (teacherOnly === true && user.role !== "teacher") {
            return (<Navigate to="/" replace />)
        }
        return children;
    } else {
        return (<Navigate to="/" replace />)
    }
}

export default ProtectedRoute