import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';

function ProtectedRoute({ teacherOnly, children }) {
    const { user, loading } = useSelector(selectUser);

    if (!loading) {
        if (user === null) {
            return (<Navigate to="/" replace />)
        } else {
            if (teacherOnly === true && user.role !== "teacher") {
                return (<Navigate to="/" replace />)
            }
            return children;
        }
    }
}

export default ProtectedRoute