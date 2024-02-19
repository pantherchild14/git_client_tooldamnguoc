import { useParams, useLocation } from 'react-router-dom';
import MatchLive from '../components/match';

function MatchPage(props) {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const run = searchParams.get('run');
    const ou = searchParams.get('ou');
    const ah = searchParams.get('ah');

    return (
        <>
            <MatchLive run={run} ou={ou} ah={ah} matchID={id} />
        </>
    );
}

export default MatchPage;