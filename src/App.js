import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from "react"; // Import useEffect
import MatchPage from "./pages/MatchPage";
import Header from "./components/Header";
import SignIn from './components/auth/SignIn';

import PageToolTaiXiu1 from './pages/ToolTaiXiu1';
import PageToolTaiXiu3 from './pages/ToolTaiXiu3';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const isLocalRole = localStorage.getItem('ROLE');

    const isDashboardRoute = location.pathname === '/profile/dashboard';

    useEffect(() => {
        if (isLocalRole !== 'Administrator' && !isDashboardRoute) {
            navigate('/sign-in');
        }
    }, [isLocalRole, isDashboardRoute, navigate]);
    const style = {
        container: {
            padding: '0 10px 70px 10px',
        }
    };

    return (
        <>
            {/* Main routes */}
            {isDashboardRoute ? null : <Header />}
            <div style={style.container} className="container">
                <Routes>
                    {isLocalRole === 'Administrator' && (
                        <>
                            <Route path='/' element={<PageToolTaiXiu3 />} />
                            <Route path='/drop-odds' element={<PageToolTaiXiu1 />} />
                            <Route path='/match/:id' element={<MatchPage />} />
                        </>
                    )}

                    {/* Auth  */}
                    <Route path='/sign-in' element={<SignIn />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
