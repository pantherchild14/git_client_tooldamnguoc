import React, { useState, useEffect } from "react";

const OU = (scoreHome, scoreAway, OU) => {
    const home = parseFloat(scoreHome, 10);
    const away = parseFloat(scoreAway, 10);
    const ou = parseFloat(OU);

    if (!isNaN(home) && !isNaN(away) && !isNaN(ou)) {
        const totalscore = home + away;
        if (ou < totalscore) {
            return "O";
        } else if (ou > totalscore) {
            return "U";
        } else {
            return "D"
        }
    }
};

const handicap = (scoreHome, scoreAway, homeName, awayName, checkName, odds) => {
    const home = parseFloat(scoreHome, 10);
    const away = parseFloat(scoreAway, 10);
    const odd = parseFloat(odds, 10);

    let totalScore;
    if (odd > 0) {
        totalScore = away + odd;
        if (checkName === homeName) {
            if (home > totalScore) {
                return "W";
            } else if (home < totalScore) {
                return "L";
            } else {
                return "D";
            }
        } else if (checkName === awayName) {
            if (home < totalScore) {
                return "W";
            } else if (home > totalScore) {
                return "L";
            } else {
                return "D";
            }
        }
    } else if (odd < 0) {
        totalScore = home + (-odd);
        if (checkName === homeName) {
            if (totalScore > away) {
                return "W";
            } else if (totalScore < away) {
                return "L";
            } else {
                return "D";
            }
        } else if (checkName === awayName) {
            if (totalScore < away) {
                return "W";
            } else if (totalScore > away) {
                return "L";
            } else {
                return "D";
            }
        }
    } else if (odd === 0) {
        if (checkName === homeName) {
            if (home > away) {
                return "W";
            } else if (home < away) {
                return "L";
            } else {
                return "D";
            }
        } else if (checkName === awayName) {
            if (home < away) {
                return "W";
            } else if (home > away) {
                return "L";
            } else {
                return "D";
            }
        }
    }
};

const europe = (scoreHome, scoreAway, homeName, awayName, checkName) => {
    const home = parseFloat(scoreHome, 10);
    const away = parseFloat(scoreAway, 10);

    if (checkName === homeName) {
        if (home > away) {
            return "W";
        } else if (home < away) {
            return "L";
        } else {
            return "D";
        }
    } else if (checkName === awayName) {
        if (home < away) {
            return "W";
        } else if (home > away) {
            return "L";
        } else {
            return "D";
        }
    }
}

const AwayAnalysis = (props) => {
    const { awayTeam, LAST_MATCH_AWAY } = props;
    const [showTable, setShowTable] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [listData, setListData] = useState([]);
    const [matchCount, setMatchCount] = useState(0);
    const [matchOUCount, setMatchOUCount] = useState(0);
    const [matchHandicapCount, setMatchHandicapCount] = useState(0);
    const [winCount, setWinCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);
    const [winOUCount, setWinOUCount] = useState(0);
    const [winAHCount, setWinAHCount] = useState(0);
    const [selectMatchCount, setSelectMatchCount] = useState(10);

    useEffect(() => {
        try {
            let data = LAST_MATCH_AWAY;

            setListData(data)
            const applyFilter = () => {
                if (activeFilter === "Away") {
                    const filteredByHome = data.filter((e) => {
                        const value = e.split(',');
                        return value[6] === awayTeam;
                    });
                    setFilteredData(filteredByHome);
                } else {
                    setFilteredData(data);
                }
            };
            applyFilter();
        } catch (error) {
            console.error("Error parsing JSON data:", error.message);
        }
    }, [activeFilter, LAST_MATCH_AWAY, awayTeam]);

    useEffect(() => {
        let matchCount = 0;
        let matchOUCount = 0;
        let matchHandicapCount = 0;
        let winCount = 0;
        let drawCount = 0;

        let winOU = 0;
        let winAH = 0;

        const first10FilteredData = filteredData.slice(0, selectMatchCount);

        first10FilteredData.map((e, index) => {
            const values = e.split(',');
            const tdMatchId = values[0];
            const tdValueEU = europe(values[8], values[9], values[4], values[6], awayTeam);

            const tdValueAH = handicap(values[8], values[9], values[4], values[6], awayTeam, values[20]);
            const tdValueOU = OU(values[8], values[9], values[32]);

            if (tdMatchId) {
                matchCount++;
            }
            if (tdValueOU) {
                matchOUCount++;
            }
            if (tdValueAH) {
                matchHandicapCount++;
            }

            if (tdValueEU === 'W') {
                winCount++;
            } else if (tdValueEU === 'D') {
                drawCount++;
            }

            if (tdValueAH === 'W') {
                winAH++;
            }
            if (tdValueOU === 'O') {
                winOU++;
            }

        });
        setMatchCount(matchCount);
        setMatchOUCount(matchOUCount);
        setMatchHandicapCount(matchHandicapCount);
        setWinCount(winCount);
        setDrawCount(drawCount);

        setWinAHCount(winAH);
        setWinOUCount(winOU);
    }, [filteredData, selectMatchCount]);


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const away = (name) => {
        if (awayTeam === name) {
            const color = "blue";
            return color;
        }
    }

    const handleFilterChange = (filterType) => {
        setActiveFilter((prevFilter) => (prevFilter === filterType ? "" : filterType));
        setShowTable(!showTable);
    }

    const handleSelectMatch = (event) => {
        const selected = parseInt(event.target.value, 10);
        setSelectMatchCount(selected);
    };

    const style = {
        textCenter: {
            textAlign: 'center',
        },
        awayHome: {
            backgroundColor: '#2495da',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '28px',
        },
        title: {
            display: 'flex',
            justifyContent: 'center',
        }
    }

    return (
        <>
            <div id='porletP5' className='porletP'>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1" className="odds-table-bg" data-t="">
                    <tbody>
                        <tr className="team-home" style={style.awayHome}>
                            <td colSpan="16">
                                <div style={style.title}>
                                    <label style={{ marginRight: '10px', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>{awayTeam}</label>
                                    <div style={{ marginRight: '10px' }}>
                                        <input
                                            onClick={() => handleFilterChange("Away")}
                                            type="checkbox"
                                            checked={activeFilter === "Away"}
                                            style={{ cursor: 'pointer' }}
                                        ></input>
                                        <label>Away</label>
                                    </div>
                                    <select value={selectMatchCount} onChange={handleSelectMatch} style={{ cursor: 'pointer' }}>
                                        {listData.map((e, index) => (
                                            <option key={index} value={index + 1}>
                                                Last {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr className="tr-title" align="center" >
                            <th width="5%" rowSpan={2}>League/Cup</th>
                            <th width="5%" rowSpan={2}>Date</th>
                            <th width="10%" rowSpan={2}>Home</th>
                            <th width="5%" rowSpan={2}>Score</th>
                            <th width="10%" rowSpan={2}>Away</th>
                            <th width="2%" colSpan={4}>Europe</th>
                            <th width="2%" colSpan={4}>Handicap</th>
                            <th width="2%" colSpan={2}>Over/Under</th>
                        </tr>
                        <tr className="tr-title" align="center" >
                            <th width="2%">HW</th>
                            <th width="2%">D</th>
                            <th width="2%">AW</th>
                            <th width="2%">W/L</th>
                            <th width="2%">H</th>
                            <th width="2%">AH</th>
                            <th width="2%">A</th>
                            <th width="2%">AH</th>
                            <th width="2%">Total O/U</th>
                            <th width="2%">O/U</th>
                        </tr>
                        {showTable ? (
                            Array.isArray(filteredData) && filteredData.length > 0 ? (
                                filteredData.slice(0, selectMatchCount).map((e, index) => {
                                    const values = e.split(',');

                                    return (
                                        <tr key={index} name={`oddsTr_${index + 1}`} className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                            <td width="2%" height="30">{values[1]}</td>
                                            <td width="5%" height="30">{formatDate(values[3] * 1000)}</td>
                                            <td width="10%" height="30" style={{ color: away(values[4]) }}>{values[4]}</td>
                                            <td width="5%" height="30">
                                                <div>
                                                    <span style={{ color: "red" }}>{values[8]}-{values[9]}</span>({values[10]}-{values[11]})
                                                </div>

                                            </td>
                                            <td width="10%" height="30" style={{ color: away(values[6]) }}>{values[6]}</td>
                                            {/* Europe  */}
                                            <td width="2%" height="30">{values[25]}</td>
                                            <td width="2%" height="30">{values[26]}</td>
                                            <td width="2%" height="30">{values[27]}</td>
                                            <td width="2%" height="30" className="HW">
                                                <span className={`o-${europe(values[8], values[9], values[4], values[6], awayTeam)}`}>
                                                    {europe(values[8], values[9], values[4], values[6], awayTeam)}
                                                </span>
                                            </td>
                                            {/* Handicap  */}
                                            <td width="2%" height="30">{values[19]}</td>
                                            <td width="2%" height="30">{values[20]}</td>
                                            <td width="2%" height="30">{values[21]}</td>
                                            <td width="2%" height="30" className="HW">
                                                <span className={`o-${handicap(values[8], values[9], values[4], values[6], awayTeam, values[20])}`}>
                                                    {handicap(values[8], values[9], values[4], values[6], awayTeam, values[20])}
                                                </span>
                                            </td>
                                            {/* Over  */}
                                            <td width="2%" height="30">{values[32]}</td>
                                            <td width="2%" height="30" className="HW">
                                                <span className={`o-${OU(values[8], values[9], values[32])}`}>
                                                    {OU(values[8], values[9], values[32])}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="12">No Data!</td>
                                </tr>
                            )
                        ) : (
                            Array.isArray(filteredData) && filteredData.length > 0 ? (
                                filteredData.slice(0, selectMatchCount).map((e, index) => {
                                    const values = e.split(',');
                                    return (
                                        <tr key={index} name={`oddsTr_${index + 1}`} className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                            <td width="2%" height="30">{values[1]}</td>
                                            <td width="5%" height="30">{formatDate(values[3] * 1000)}</td>
                                            <td width="10%" height="30" style={{ color: away(values[4]) }}>{values[4]}</td>
                                            <td width="5%" height="30">
                                                <div>
                                                    <span style={{ color: "red" }}>{values[8]}-{values[9]}</span>({values[10]}-{values[11]})
                                                </div>

                                            </td>
                                            <td width="10%" height="30" style={{ color: away(values[6]) }}>{values[6]}</td>
                                            {/* Europe  */}
                                            <td width="2%" height="30">{values[25]}</td>
                                            <td width="2%" height="30">{values[26]}</td>
                                            <td width="2%" height="30">{values[27]}</td>
                                            <td width="2%" height="30" className="HW">
                                                <span className={`o-${europe(values[8], values[9], values[4], values[6], awayTeam)}`}>
                                                    {europe(values[8], values[9], values[4], values[6], awayTeam)}
                                                </span>
                                            </td>
                                            {/* Handicap  */}
                                            <td width="2%" height="30">{values[19]}</td>
                                            <td width="2%" height="30">{values[20]}</td>
                                            <td width="2%" height="30">{values[21]}</td>
                                            <td width="2%" height="30" className="HW">
                                                <span className={`o-${handicap(values[8], values[9], values[4], values[6], awayTeam, values[20])}`}>
                                                    {handicap(values[8], values[9], values[4], values[6], awayTeam, values[20])}
                                                </span>
                                            </td>
                                            {/* Over  */}
                                            <td width="2%" height="30">{values[32]}</td>
                                            <td width="2%" height="30" className="HW">
                                                <span className={`o-${OU(values[8], values[9], values[32])}`}>
                                                    {OU(values[8], values[9], values[32])}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="12">No Data!</td>
                                </tr>
                            )
                        )}
                        <tr className="tb-stat1">
                            <td align="center" colSpan="16" id="td_stat1">
                                Last <font className="red">{matchCount}</font> Matches,
                                {winCount} Win,
                                {drawCount} Draw,
                                {matchCount - (winCount + drawCount)} Loss,
                                Win rate: <font class="red">{((winCount / matchCount) * 100).toFixed(1)}%</font>,
                                AH rate: <font class="red">{((winAHCount / matchHandicapCount) * 100).toFixed(1)}%</font>,
                                Over rate: <font class="red">{((winOUCount / matchOUCount) * 100).toFixed(1)}%</font>,
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AwayAnalysis;
