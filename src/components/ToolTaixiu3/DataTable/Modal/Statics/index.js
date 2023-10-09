import React from "react";

const statBar = (scoreHome, ScoreAway, score) => {
    const home = parseInt(scoreHome, 10);
    const away = parseInt(ScoreAway, 10);
    const total = (home + away);
    const result = ((score / total) * 100).toFixed(2);;
    return `${result}%`;
}

const Statics = (props) => {
    const { parsed } = props;

    const styles = {
        title: {
            backgroundColor: '#3c78c4',
            marginBottom: '10px',
        },
        tableStyle: {
            marginTop: '20px',
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f0f0f0',
        },
        cellStyle: {
            padding: '5px',
            border: '1px solid #ccc',
            textAlign: 'center',
        },
    }

    if (parsed) {
        try {
            const jsonData = JSON.parse(parsed);
            return (
                <div className="fx20">
                    <ul className="stat">
                        <li style={styles.title}>
                            <span height="20" colSpan="3" className="hand-bg" align="center" >
                                <font color="white"><b>Match Stats</b></font>
                            </span>
                        </li>
                        {jsonData.map((row, index) => (
                            <React.Fragment key={index}>
                                {row.type === 6 ? (
                                    <li>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-title">Corner Kicks</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                    </li>
                                ) : null}
                                {row.type === 13 ? (
                                    <li>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-title">Red card</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                    </li>
                                ) : null}

                                {row.type === 4 ? (
                                    <li>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-title">Shots on Goal</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                    </li>
                                ) : null}

                                {row.type === 43 ? (
                                    <li>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-title">Attacks</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                    </li>
                                ) : null}

                                {row.type === 44 ? (
                                    <li>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-title">Dangerous attacks</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                    </li>
                                ) : null}

                                {row.type === 14 ? (
                                    <li>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: row.home }}></span>
                                        </span>
                                        <span className="stat-title">Possession</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: row.away }}></span>
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                    </li>

                                ) : null}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            );
        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
            return null;
        }
    } else {
        console.error("Parsed data is undefined or empty");
        return null;
    }
};

export default Statics;
