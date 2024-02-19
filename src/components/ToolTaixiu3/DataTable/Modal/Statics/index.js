import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { OUFunc, europeFunc } from "../../../Functions/DateSelector";

const statBar = (scoreHome, ScoreAway, score) => {
    const home = parseFloat(scoreHome, 10);
    const away = parseFloat(ScoreAway, 10);
    const total = (home + away);
    const result = ((score / total) * 100).toFixed(2);;
    return `${result}%`;
}

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

    const numericScoreHome = parseFloat(scoreHome);
    const numericScoreAway = (scoreAway);

    if (String(home) === String(checkTeam)) {
        if (numericScoreHome > numericScoreAway) {
            value = 1;
        }
    } else if (String(away) === String(checkTeam)) {
        if (numericScoreHome < numericScoreAway) {
            value = 1;
        }
    }

    return value;
}

const checkStarAnalysisH2H = (home, away, checkTeam, scoreHome, scoreAway) => {
    let value = 0;

    const numericScoreHome = parseFloat(scoreHome);
    const numericScoreAway = parseFloat(scoreAway);
    if (numericScoreHome >= 2) {
        if (numericScoreHome > numericScoreAway) {
            value = 1;
        }
    }

    return value;
}

const checkStarAnalysis = (home, away, checkTeam, scoreHome, scoreAway) => {
    let value = 0;

    const numericScoreHome = parseFloat(scoreHome);
    const numericScoreAway = parseFloat(scoreAway);

    if (numericScoreHome > numericScoreAway) {
        value = 1;
    }

    return value;
}

const Statics = (props) => {
    const [countHandicapWin, setCountHandicapWin] = useState(0);
    const [countHandicapLost, setCountHandicapLost] = useState(0);

    const [countHome, setCountHome] = useState("");
    const [countHomeName, setCountHomeName] = useState("");
    const [countHomeWin, setCountHomeWin] = useState(0);
    const [countHomeLost, setCountHomeLost] = useState(0);
    const [countHomeScore, setCountHomeScore] = useState(0);
    const [countHomeU, setCountHomeU] = useState(0);
    const [countHomeO, setCountHomeO] = useState(0);

    const [countAway, setCountAway] = useState("");
    const [countAwayName, setCountAwayName] = useState("");
    const [countAwayWin, setCountAwayWin] = useState(0);
    const [countAwayLost, setCountAwayLost] = useState(0);
    const [countAwayScore, setCountAwayScore] = useState(0);
    const [countAwayU, setCountAwayU] = useState(0);
    const [countAwayO, setCountAwayO] = useState(0);

    const {
        parsed,
        parsedH2H,
        parsedHome,
        parsedAway,
        nameTeam,
        awayTeam,
        tipStar } = props;

    const styles = {
        title: {
            backgroundColor: '#3c78c4',
            marginBottom: '10px',
            padding: '8px 0',
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
        stat_c_home: {
            width: '38%',
            textAlign: 'end',
            marginRight: '10px',
        },
        stat_c_away: {
            width: '38%',
            textAlign: 'start',
            paddingLeft: '10px',
        }
    }

    useEffect(() => {
        if (!parsedH2H || !parsedAway || !parsedHome) {
            return;
        }

        let countH2HWin = 0;
        let countH2HLost = 0;

        let checkName = "";
        let homeWin = 0;
        let homeLost = 0;
        let homeOWin = 0;
        let homeUWin = 0;

        let checkAway = "";
        let awayWin = 0;
        let awayLost = 0;
        let awayOWin = 0;
        let awayUWin = 0;

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
                } else if (handicaps === 'L') {
                    countH2HLost++;
                }
            });
        }

        // if (parsedHome) {
        //     const allMatchesHome = parsedHome.filter((jsonStr) => {
        //         const dataArray = jsonStr.split(',');
        //         return dataArray[4] === nameTeam;
        //     });

        //     const first3FilteredData = allMatchesHome.slice(0, 3);

        //     first3FilteredData.forEach((jsonStr) => {
        //         const dataArray = jsonStr.split(',');
        //         const handicaps = europeFunc(
        //             dataArray[8],
        //             dataArray[9],
        //             dataArray[4],
        //             dataArray[6],
        //             nameTeam
        //         );
        //         const OU = OUFunc(
        //             dataArray[8],
        //             dataArray[9],
        //             dataArray[32]
        //         )

        //         if (handicaps === 'W') {
        //             homeWin++;
        //         } else {
        //             homeLost++;
        //         }

        //         if (OU === 'U') {
        //             homeUWin++
        //         } else if (OU === 'O') {
        //             homeOWin++
        //         }
        //     });
        // }

        // if (parsedAway) {
        //     const allMatchesAway = parsedAway.filter((jsonStr) => {
        //         const dataArray = jsonStr.split(',');
        //         return dataArray[6] === awayTeam;
        //     });

        //     const first3FilteredData = allMatchesAway.slice(0, 3);

        //     first3FilteredData.forEach((jsonStr) => {
        //         const dataArray = jsonStr.split(',');
        //         const handicaps = europeFunc(
        //             dataArray[8],
        //             dataArray[9],
        //             dataArray[4],
        //             dataArray[6],
        //             awayTeam
        //         );

        //         const OU = OUFunc(
        //             dataArray[8],
        //             dataArray[9],
        //             dataArray[32]
        //         );

        //         if (handicaps === 'W') {
        //             awayWin++;
        //         } else {
        //             awayLost++;
        //         }
        //         if (OU === 'U') {
        //             awayUWin++
        //         } else if (OU === 'O') {
        //             awayOWin++
        //         }
        //     });
        // }

        let homeFilter = [];
        let homeFilterScoreOU = [];
        let awayFilter = [];
        let awayFilterScoreOU = [];

        if (parsedHome) {
            let win = 0;
            let lost = 0;
            let draw = 0;


            const first3FilteredData = parsedHome.slice(0, 3);

            first3FilteredData.forEach((jsonStr) => {
                const dataArray = jsonStr.split(',');
                const handicaps = europeFunc(
                    dataArray[8],
                    dataArray[9],
                    dataArray[4],
                    dataArray[6],
                    nameTeam
                );

                const OU = OUFunc(
                    dataArray[8],
                    dataArray[9],
                    dataArray[32]
                )


                let color = 'black';
                let scoreOU = 0;

                if (dataArray[4] === nameTeam) {
                    color = `<span style="color: red">${handicaps}</span>`;
                    scoreOU = `<span style="color: red">${dataArray[8]}</span>`;
                } else if (dataArray[6] === nameTeam) {
                    color = `<span style="color: blue">${handicaps}</span>`;
                    scoreOU = `<span style="color: blue">${dataArray[9]}</span>`;
                }

                if (handicaps === "W") {
                    win++;
                    homeWin++;
                } else if (handicaps === "L") {
                    lost++;
                    homeLost++;
                } else if (handicaps === "D") {
                    draw++;
                }

                if (win === 0) {
                    checkName = `<span>${lost} L, </span><span>${draw} D</span>`;
                } else if (lost === 0) {
                    checkName = `<span>${win} W, </span><span>${draw} D</span>`;
                } else if (draw === 0) {
                    checkName = `<span>${win} W, </span><span>${lost} L</span>`;
                } else if (win === 0, lost === 0) {
                    checkName = `<span>${draw} D</span>`;
                } else if (win === 0, draw === 0) {
                    checkName = `<span>${lost} L</span>`;
                } else if (lost === 0, draw === 0) {
                    checkName = `<span>${win} W</span>`;
                } else if (win !== 0 && lost !== 0 && draw !== 0) {
                    checkName = `<span>${win} W, </span><span>${lost} L, </span><span>${draw} D</span>`;
                }

                checkName = `<span>${win} W, </span><span>${lost} L, </span><span>${draw} D</span>`;

                if (OU === 'U') {
                    homeUWin++
                } else if (OU === 'O') {
                    homeOWin++
                }

                homeFilter.push(color);
                homeFilterScoreOU.push(scoreOU)
            });
        }

        if (parsedAway) {
            let win = 0;
            let lost = 0;
            let draw = 0;

            const first3FilteredData = parsedAway.slice(0, 3);

            first3FilteredData.forEach((jsonStr) => {
                const dataArray = jsonStr.split(',');
                const handicaps = europeFunc(
                    dataArray[8],
                    dataArray[9],
                    dataArray[4],
                    dataArray[6],
                    awayTeam
                );

                let color = 'black';
                let scoreOU = 0;
                if (dataArray[4] === awayTeam) {
                    color = `<span style="color: red">${handicaps}</span>`;
                    scoreOU = `<span style="color: red">${dataArray[8]}</span>`;
                } else if (dataArray[6] === awayTeam) {
                    color = `<span style="color: blue">${handicaps}</span>`;
                    scoreOU = `<span style="color: blue">${dataArray[9]}</span>`;
                }

                if (handicaps === "W") {
                    win++;
                    awayWin++;
                } else if (handicaps === "L") {
                    lost++;
                    awayLost++;
                } else if (handicaps === "D") {
                    draw++;
                }

                if (win === 0) {
                    checkAway = `<span>${lost} L, </span><span>${draw} D</span>`;
                } else if (lost === 0) {
                    checkAway = `<span>${win} W, </span><span>${draw} D</span>`;
                } else if (draw === 0) {
                    checkAway = `<span>${win} W, </span><span>${lost} L</span>`;
                } else if (win === 0, lost === 0) {
                    checkAway = `<span>${draw} D</span>`;
                } else if (win === 0, draw === 0) {
                    checkAway = `<span>${lost} L</span>`;
                } else if (lost === 0, draw === 0) {
                    checkAway = `<span>${win} W</span>`;
                } else if (win !== 0 && lost !== 0 && draw !== 0) {
                    checkAway = `<span>${win} W, </span><span>${lost} L, </span><span>${draw} D</span>`;
                }

                const OU = OUFunc(
                    dataArray[8],
                    dataArray[9],
                    dataArray[32]
                );

                if (OU === 'U') {
                    awayUWin++;
                } else if (OU === 'O') {
                    awayOWin++;
                }
                awayFilter.push(color);
                awayFilterScoreOU.push(scoreOU)

            });
        }

        setCountHandicapWin(countH2HWin);
        setCountHandicapLost(countH2HLost);

        setCountHome(homeFilter)
        setCountHomeName(checkName)
        setCountHomeScore(homeFilterScoreOU)
        setCountHomeO(homeOWin);
        setCountHomeU(homeUWin);
        setCountHomeWin(homeWin)
        setCountHomeLost(homeLost)

        setCountAway(awayFilter)
        setCountAwayName(checkAway)
        setCountAwayScore(awayFilterScoreOU)
        setCountAwayO(awayOWin);
        setCountAwayU(awayUWin);
        setCountAwayWin(awayWin)
        setCountAwayLost(awayLost)

    }, [parsed, parsedHome, parsedAway, nameTeam, awayTeam])
    try {
        if (parsed) {
            const statics = JSON.parse(parsed);
            statics.sort((a, b) => a.type - b.type);

            return (
                <div className="fx20">
                    <ul className="stat">
                        <li style={styles.title}>
                            <span height="20" colSpan="3" className="hand-bg" align="center" >
                                <font color="white"><b>Thống kê trận đấu</b></font>
                            </span>
                        </li>
                        {parsed && statics.map((row, index) => (
                            <React.Fragment key={index}>
                                {/*  Possession */}
                                {row.type === 14 ? (
                                    <li>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: row.home }}></span>
                                        </span>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-title">
                                            {tipStar === nameTeam ? (
                                                <div style={{ position: 'relative', }}><Rating name="read-only" value={checkStarPossesstion(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', bottom: '-23px', left: '5px', }} max={1} /></div>
                                            ) : ""}
                                            Kiểm soát bóng
                                            {tipStar === awayTeam ? (
                                                <div style={{ position: 'relative', }}><Rating name="read-only" value={checkStarPossesstion(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} /></div>
                                            ) : ""}
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: row.away }}></span>
                                        </span>

                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}

                        {parsed && statics.map((row, index) => (
                            <React.Fragment key={index}>
                                {/*  Shots */}
                                {row.type === 3 ? (
                                    <li>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-title">
                                            {tipStar === nameTeam ? (
                                                <div style={{ position: 'relative', }}>
                                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', bottom: '-23px', left: '5px', }} max={1} />
                                                </div>
                                            ) : ""}
                                            Sút
                                            {tipStar === awayTeam ? (
                                                <div style={{ position: 'relative', }}>
                                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                                </div>
                                            ) : ""}
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}

                        {parsed && statics.map((row, index) => (
                            <React.Fragment key={index}>
                                {/*  Corner Kicks */}
                                {row.type === 6 ? (
                                    <li>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-title">
                                            {tipStar === nameTeam ? (
                                                <div style={{ position: 'relative', }}>
                                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', bottom: '-23px', left: '5px', }} max={1} />
                                                </div>
                                            ) : ""}
                                            Phạt góc
                                            {tipStar === awayTeam ? (
                                                <div style={{ position: 'relative', }}>
                                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                                </div>
                                            ) : ""}
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>

                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}

                        {parsed && statics.map((row, index) => (
                            <React.Fragment key={index}>
                                {/*  Shots on Goal */}
                                {row.type === 4 ? (
                                    <li>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-title">Sút vào gôn</span>
                                        <span className="stat-c">{row.away}</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}

                        {parsed && statics.map((row, index) => (
                            <React.Fragment key={index}>
                                {/*  Attacks */}
                                {row.type === 43 ? (
                                    <li>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-title">Tấn công</span>
                                        <span className="stat-c">{row.away}</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>

                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}

                        {parsed && statics.map((row, index) => (
                            <React.Fragment key={index}>
                                {/* Dangerous attacks */}
                                {row.type === 44 ? (
                                    <li>
                                        <span className="stat-bar-wrapper homes">
                                            <span className="stat-bar fr" style={{ width: statBar(row.home, row.away, row.home) }}></span>
                                        </span>
                                        <span className="stat-c">{row.home}</span>
                                        <span className="stat-title">
                                            {tipStar === nameTeam ? (
                                                <div style={{ position: 'relative', }}>
                                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', bottom: '-23px', left: '5px', }} max={1} />
                                                </div>
                                            ) : ""}
                                            Tấn công nguy hiểm
                                            {tipStar === awayTeam ? (
                                                <div style={{ position: 'relative', }}>
                                                    <Rating name="read-only" value={checkStar(nameTeam, awayTeam, tipStar, row.home, row.away)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                                </div>
                                            ) : ""}
                                        </span>
                                        <span className="stat-c">{row.away}</span>
                                        <span className="stat-bar-wrapper aways">
                                            <span className="stat-bar fl" style={{ width: statBar(row.home, row.away, row.away) }}></span>
                                        </span>
                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}

                        {(countHandicapWin !== 0 || countHandicapLost !== 0) ? (
                            <li style={styles.stat_li}>
                                <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fr" style={{ width: statBar(countHandicapWin, countHandicapLost, countHandicapWin) }}></span>
                                </span>
                                <span className="stat-c" style={styles.stat_c}>
                                    {countHandicapWin} <b style={{ color: 'red' }}>W</b>
                                </span>
                                <span className="stat-title" style={styles.stat_title}>
                                    <div style={{ position: 'relative', }}>
                                        {tipStar === nameTeam ? (
                                            <Rating name="read-only" value={checkStarAnalysisH2H(nameTeam, awayTeam, tipStar, countHandicapWin, countHandicapLost)} readOnly style={{ fontSize: '18px', position: 'absolute', bottom: '-23px', left: '5px', }} max={1} />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    Đối đầu
                                    <div style={{ position: 'relative', }}>
                                        {tipStar === awayTeam ? (
                                            <Rating name="read-only" value={checkStarAnalysisH2H(nameTeam, awayTeam, tipStar, countHandicapLost, countHandicapWin)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </span>
                                <span className="stat-c" style={styles.stat_c}>
                                    {countHandicapLost} <b style={{ color: 'red' }}>W</b>
                                </span>
                                <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                    <span className="stat-bar fl" style={{ width: statBar(countHandicapWin, countHandicapLost, countHandicapLost) }}></span>
                                </span>
                            </li>
                        ) : null}

                        <li style={styles.stat_li}>
                            {/* <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                <span className="stat-bar fr" style={{ width: statBar(countHomeWin, countHomeLost, countHomeWin) }}></span>
                            </span> */}
                            <span className="stat-c" style={styles.stat_c_home}>
                                <span dangerouslySetInnerHTML={{ __html: countHomeName }} />
                                <span>  </span>
                                (<span dangerouslySetInnerHTML={{ __html: countHome.join(', ') }} />)
                            </span>
                            <span className="stat-title" style={styles.stat_title}>
                                Phong độ
                                {/* <div style={{ position: 'relative', }}>
                                    {tipStar !== "" ? (
                                        tipStar === nameTeam ? (
                                            <Rating name="read-only" value={checkStarAnalysis(nameTeam, awayTeam, tipStar, countHomeWin, countHomeLost)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                        ) : (
                                            <Rating name="read-only" value={checkStarAnalysis(nameTeam, awayTeam, tipStar, countAwayWin, countAwayLost)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                        )
                                    ) : (
                                        <Rating name="read-only" value={0} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                    )}
                                </div> */}
                            </span>
                            <span className="stat-c" style={styles.stat_c_away}>
                                <span dangerouslySetInnerHTML={{ __html: countAwayName }} />
                                <span>  </span>
                                (<span dangerouslySetInnerHTML={{ __html: countAway.join(', ') }} />)
                            </span>
                        </li>

                        <li style={styles.stat_li}>
                            <span className="stat-c" style={styles.stat_c_home}>
                                <span>{countHomeO} O, {countHomeU} U</span>
                                <span>  </span>
                                (<span dangerouslySetInnerHTML={{ __html: countHomeScore.join(', ') }} />)
                            </span>
                            <span className="stat-title" style={styles.stat_title}>
                                Over
                            </span>
                            <span className="stat-c" style={styles.stat_c_away}>
                                <span>{countAwayO} O, {countAwayU} U</span>
                                <span>  </span>
                                (<span dangerouslySetInnerHTML={{ __html: countAwayScore.join(', ') }} />)
                            </span>

                        </li>

                        {/* <li style={styles.stat_li}>
                            <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                <span className="stat-bar fr" style={{ width: statBar(countAwayO, countAwayU, countAwayO) }}></span>
                            </span>
                            <span className="stat-c" style={styles.stat_c}>
                                {countAwayO} <b style={{ color: 'red' }}>O</b>
                            </span>
                            <span className="stat-title" style={styles.stat_title}>
                                Over/Under (Khách)
                            </span>
                            <span className="stat-c" style={styles.stat_c}>
                                {countAwayU} <b style={{ color: 'green' }}>U</b>
                            </span>
                            <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                <span className="stat-bar fl" style={{ width: statBar(countAwayO, countAwayU, countAwayU) }}></span>
                            </span>
                        </li> */}

                        {/* {(countHomeWin !== 0 || countHomeLost !== 0) ? (
                            (tipStar === nameTeam && (
                                <li style={styles.stat_li}>
                                    <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                        <span className="stat-bar fr" style={{ width: statBar(countHomeWin, countHomeLost, countHomeWin) }}></span>
                                    </span>
                                    <span className="stat-c" style={styles.stat_c}>
                                        {countHomeWin} <b style={{ color: 'red' }}>W</b>
                                    </span>
                                    <span className="stat-title" style={styles.stat_title}>
                                        Phong độ (Chủ nhà)
                                        <div style={{ position: 'relative', }}>
                                            <Rating name="read-only" value={checkStarAnalysis(nameTeam, awayTeam, tipStar, countHomeWin, countHomeLost)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                        </div>
                                    </span>
                                    <span className="stat-c" style={styles.stat_c}>
                                        {countHomeLost} <b style={{ color: 'green' }}>L</b>
                                    </span>
                                    <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                        <span className="stat-bar fl" style={{ width: statBar(countHomeWin, countHomeLost, countHomeLost) }}></span>
                                    </span>
                                </li>
                            ))
                        ) : null}
    
                        {(countAwayWin !== 0 || countAwayLost !== 0) ? (
                            (tipStar === awayTeam && (
                                <li style={styles.stat_li}>
                                    <span className="stat-bar-wrapper homes" style={styles.stat_bar_wrapper}>
                                        <span className="stat-bar fr" style={{ width: statBar(countAwayWin, countAwayLost, countAwayWin) }}></span>
                                    </span>
                                    <span className="stat-c" style={styles.stat_c}>
                                        {countAwayWin} <b style={{ color: 'red' }}>W</b>
                                    </span>
                                    <span className="stat-title" style={styles.stat_title}>
                                        Phong độ (khách)
                                        <div style={{ position: 'relative', }}>
                                            <Rating name="read-only" value={checkStarAnalysis(nameTeam, awayTeam, tipStar, countAwayWin, countAwayLost)} readOnly style={{ fontSize: '18px', position: 'absolute', top: '-23px', right: '5px', }} max={1} />
                                        </div>
                                    </span>
                                    <span className="stat-c" style={styles.stat_c}>
                                        {countAwayLost} <b style={{ color: 'green' }}>L</b>
                                    </span>
                                    <span className="stat-bar-wrapper aways" style={styles.stat_bar_wrapper}>
                                        <span className="stat-bar fl" style={{ width: statBar(countAwayWin, countAwayLost, countAwayLost) }}></span>
                                    </span>
                                </li>
                            ))
                        ) : null} */}
                    </ul>
                </div>
            );
        } else {
            return null;
        }

    } catch (error) {
        console.error("Error parsing JSON data:", error.message);
        return null;
    }
};

export default Statics;
