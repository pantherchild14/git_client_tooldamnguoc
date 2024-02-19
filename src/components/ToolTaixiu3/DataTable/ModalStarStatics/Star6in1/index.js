import React, { useEffect, useState } from "react";
import { europeFunc } from "../../../Functions/DateSelector";
import { Rating } from "@mui/material";

const statBar = (scoreHome, scoreAway, score) => {
    const home = parseInt(scoreHome, 10);
    const away = parseInt(scoreAway, 10);
    const total = home + away;
    const result = ((score / total) * 100).toFixed(2);
    return `${result}%`;
};

const checkStarPossesstion = (home, away, checkTeam, scoreHome, scoreAway) => {
    let value = 0;

    // Parse the values as numbers
    const numericScoreHome = parseFloat(scoreHome);
    const numericScoreAway = parseFloat(scoreAway);

    if (home === checkTeam) {
        if (numericScoreHome >= 60) {
            value = 1;
        }
    } else if (away === checkTeam) {
        if (numericScoreAway >= 60) {
            value = 1;
        }
    }

    return value;
}

// const checkStarRed = (home, away, checkTeam, scoreHome, scoreAway) => {
//     let value = 0;

//     // Parse the values as numbers
//     const numericScoreHome = parseFloat(scoreHome);
//     const numericScoreAway = parseFloat(scoreAway);

//     if (home === checkTeam) {
//         if (numericScoreHome < numericScoreAway) {
//             value = 1;
//         }
//     } else if (away === checkTeam) {
//         if (numericScoreHome > numericScoreAway) {
//             value = 1;
//         }
//     }

//     return value;
// }

const checkStar = (home, away, checkTeam, scoreHome, scoreAway) => {
    let value = 0;

    // Parse the values as numbers
    const numericScoreHome = parseFloat(scoreHome);
    const numericScoreAway = parseFloat(scoreAway);

    if (home === checkTeam) {
        if (numericScoreHome > numericScoreAway) {
            value = 1;
        }
    } else if (away === checkTeam) {
        if (numericScoreHome < numericScoreAway) {
            value = 1;
        }
    }

    return value;
}

const checkStarAnalysis = (home, away, checkTeam, scoreHome, scoreAway) => {
    let value = 0;

    // Parse the values as numbers
    const numericScoreHome = parseFloat(scoreHome);
    const numericScoreAway = parseFloat(scoreAway);

    if (numericScoreHome > numericScoreAway) {
        value = 1;
    }

    return value;
}


const Star6in1 = (props) => {
    const [countHandicapWin, setCountHandicapWin] = useState(0);
    const [countHandicapLost, setCountHandicapLost] = useState(0);
    const [countHomeWin, setCountHomeWin] = useState(0);
    const [countHomeLost, setCountHomeLost] = useState(0);
    const [countAwayWin, setCountAwayWin] = useState(0);
    const [countAwayLost, setCountAwayLost] = useState(0);

    const {
        parsedStatics,
        parsedH2H,
        parsedHome,
        parsedAway,
        nameTeam,
        awayTeam,
        tipStar,
    } = props;

    const styles = {
        title: {
            backgroundColor: '#3c78c4',
            marginBottom: '10px',
        },
        stat_li: {
            lineHeight: '18px',
            padding: '5px 0px',
            marginBottom: '-1px',
        },
        stat_title: {
            width: '90px',
            fontSize: '14px',
            lineHeight: '24px',
        },
        stat_c: {
            width: '30px',
        },
        stat_bar_wrapper: {
            width: '120px',
        },
    };

    useEffect(() => {
        if (!parsedStatics || !parsedH2H || !parsedHome || !parsedAway) {
            return;
        }
        let countH2HWin = 0;
        let countH2HLost = 0;
        let homeWin = 0;
        let homeLost = 0;
        let awayWin = 0;
        let awayLost = 0;
        if (parsedH2H) {
            parsedH2H.slice(0, 3).forEach((jsonStr) => {
                const dataArray = jsonStr.split(',');
                const handicaps = europeFunc(
                    dataArray[8],
                    dataArray[9],
                    dataArray[4],
                    dataArray[6],
                    nameTeam
                );

                if (handicaps === 'W') {
                    countH2HWin++;
                } else {
                    countH2HLost++;
                }
            });
        }

        if (parsedHome) {
            const allMatchesHome = parsedHome.filter((jsonStr) => {
                const dataArray = jsonStr.split(',');
                return dataArray[4] === nameTeam;
            });

            const first3FilteredData = allMatchesHome.slice(0, 3);

            first3FilteredData.forEach((jsonStr) => {
                const dataArray = jsonStr.split(',');
                const handicaps = europeFunc(
                    dataArray[8],
                    dataArray[9],
                    dataArray[4],
                    dataArray[6],
                    nameTeam
                );
                if (handicaps === 'W') {
                    homeWin++;
                } else {
                    homeLost++;
                }
            });
        }

        if (parsedAway) {
            const allMatchesAway = parsedAway.filter((jsonStr) => {
                const dataArray = jsonStr.split(',');
                return dataArray[6] === awayTeam;
            });

            const first3FilteredData = allMatchesAway.slice(0, 3);

            first3FilteredData.forEach((jsonStr) => {
                const dataArray = jsonStr.split(',');
                const handicaps = europeFunc(
                    dataArray[8],
                    dataArray[9],
                    dataArray[4],
                    dataArray[6],
                    awayTeam
                );
                if (handicaps === 'W') {
                    awayWin++;
                } else {
                    awayLost++;
                }
            });
        }

        setCountHandicapWin(countH2HWin);
        setCountHandicapLost(countH2HLost);
        setCountHomeWin(homeWin);
        setCountHomeLost(homeLost);
        setCountAwayWin(awayWin);
        setCountAwayLost(awayLost);
    }, [parsedStatics, parsedH2H, parsedHome, parsedAway, nameTeam, awayTeam]);

    const statics = parsedStatics ? JSON.parse(parsedStatics) : null;

    return (
        <div>
            <ul className="stat">
                {/* <li style={styles.title}>
                    <span height="20" colSpan="3" className="hand-bg" align="center">
                        <font color="white">
                            <b>Match Star</b>
                        </font>
                    </span>
                </li> */}
                {parsedStatics && statics.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.type === 14 ? (
                            <li style={styles.stat_li}>
                                <span className="stat-c" style={styles.stat_c}>
                                    {row.home}
                                </span>
                                <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fr" style={{ width: row.home }}></span>
                                </span>
                                <span className="stat-title" style={styles.stat_title}>
                                    Possession
                                    <br />
                                    <Rating name="read-only" value={checkStarPossesstion(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px' }} max={1} />
                                </span>
                                <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fl" style={{ width: row.away }}></span>
                                </span>
                                <span className="stat-c" style={styles.stat_c}>
                                    {row.away}
                                </span>
                            </li>
                        ) : null}

                        {row.type === 3 ? (
                            <li style={styles.stat_li}>
                                <span className="stat-c" style={styles.stat_c}>
                                    {row.home}
                                </span>
                                <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                </span>
                                <span className="stat-title" style={styles.stat_title}>
                                    Shots
                                    <br />
                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px' }} max={1} />
                                </span>
                                <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                </span>
                                <span className="stat-c" style={styles.stat_c}>
                                    {row.away}
                                </span>
                            </li>
                        ) : null}

                        {row.type === 6 ? (
                            <li style={styles.stat_li}>
                                <span className="stat-c" style={styles.stat_c}>
                                    {row.home}
                                </span>
                                <span className="stat-bar-wrapper homes " style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                </span>
                                <span className="stat-title" style={styles.stat_title}>
                                    Corner Kicks
                                    <br />
                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px' }} max={1} />
                                </span>
                                <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                </span>
                                <span className="stat-c" style={styles.stat_c}>
                                    {row.away}
                                </span>
                            </li>
                        ) : null}
                    </React.Fragment>
                ))}
                {(countHandicapWin !== 0 || countHandicapLost !== 0) ? (
                    <li style={styles.stat_li}>
                        <span className="stat-c" style={styles.stat_c}>
                            {countHandicapWin} <b style={{ color: 'red' }}>W</b>
                        </span>
                        <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                            <span className="stat-bar fr" style={{ width: statBar(countHandicapWin, countHandicapLost, countHandicapWin) }}></span>
                        </span>
                        <span className="stat-title" style={styles.stat_title}>
                            H2H
                            <br />
                            <Rating name="read-only" value={checkStarAnalysis(nameTeam, awayTeam, tipStar, countHandicapWin, countHandicapLost)} readOnly style={{ fontSize: '18px' }} max={1} />
                        </span>
                        <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                            <span className="stat-bar fl" style={{ width: statBar(countHandicapWin, countHandicapLost, countHandicapLost) }}></span>
                        </span>
                        <span className="stat-c" style={styles.stat_c}>
                            {countHandicapLost} <b style={{ color: 'green' }}>L</b>
                        </span>
                    </li>
                ) : null}

                {(countHomeWin !== 0 || countHomeLost !== 0) ? (
                    (tipStar === nameTeam && (
                        <li style={styles.stat_li}>
                            <span className="stat-c" style={styles.stat_c}>
                                {countHomeWin} <b style={{ color: 'red' }}>W</b>
                            </span>
                            <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                <span className="stat-bar fr" style={{ width: statBar(countHomeWin, countHomeLost, countHomeWin) }}></span>
                            </span>
                            <span className="stat-title" style={styles.stat_title}>
                                Home
                                <br />
                                <Rating name="read-only" value={checkStarAnalysis(nameTeam, awayTeam, tipStar, countHomeWin, countHomeLost)} readOnly style={{ fontSize: '18px' }} max={1} />
                            </span>
                            <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                <span className="stat-bar fl" style={{ width: statBar(countHomeWin, countHomeLost, countHomeLost) }}></span>
                            </span>
                            <span className="stat-c" style={styles.stat_c}>
                                {countHomeLost} <b style={{ color: 'green' }}>L</b>
                            </span>
                        </li>
                    ))
                ) : null}

                {(countAwayWin !== 0 || countAwayLost !== 0) ? (
                    (tipStar === awayTeam && (
                        <li style={styles.stat_li}>
                            <span className="stat-c" style={styles.stat_c}>
                                {countAwayWin} <b style={{ color: 'red' }}>W</b>
                            </span>
                            <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                <span className="stat-bar fr" style={{ width: statBar(countAwayWin, countAwayLost, countAwayWin) }}></span>
                            </span>
                            <span className="stat-title" style={styles.stat_title}>
                                Away
                                <br />
                                <Rating name="read-only" value={checkStarAnalysis(nameTeam, awayTeam, tipStar, countAwayWin, countAwayLost)} readOnly style={{ fontSize: '18px' }} max={1} />
                            </span>
                            <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                <span className="stat-bar fl" style={{ width: statBar(countAwayWin, countAwayLost, countAwayLost) }}></span>
                            </span>
                            <span className="stat-c" style={styles.stat_c}>
                                {countAwayLost} <b style={{ color: 'green' }}>L</b>
                            </span>
                        </li>
                    ))
                ) : null}

            </ul>
        </div>
    );
};

export default Star6in1;
