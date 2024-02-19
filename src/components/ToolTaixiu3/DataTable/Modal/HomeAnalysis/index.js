import React from "react";

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

const HomeAnaly = (props) => {
    const { parsed, nameTeam } = props;

    const formatDate = (timestamp) => {
        if (typeof timestamp !== 'number' || isNaN(timestamp)) {
            return 'Invalid Timestamp';
        }

        const localTimestamp = timestamp + (7 * 3600);
        const date = new Date(localTimestamp * 1000);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    const home = (name) => {
        if (nameTeam === name) {
            const color = "red";
            return color;
        }
    }

    const styles = {
        title: {
            backgroundColor: '#3c78c4',
            padding: '8px 0',
        },
        tableStyle: {
            marginTop: '20px',
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'rgb(240 240 240 / 0%)',
        },
        cellStyle: {
            padding: '5px',
            borderBottom: '1px solid #ccc',
            textAlign: "center",
            lineHeight: '25px',
            fontSize: '13px',
        },
        cellHeader: {
            color: '#888',
            fontWeight: 'normal',
            lineHeight: '30px',
            backgroundColor: '#eaeaea',
            borderBottom: '1px solid #d8d8d8',
            whiteSpace: 'nowrap',
        },
    }

    if (parsed) {
        try {
            const jsonData = (parsed);

            return (
                <table width="100%" cellPadding="0" cellSpacing="1" className="modal_detail odds-table-bg" style={styles.tableStyle}>
                    <thead>
                        <tr>
                            <th width="100%" height="20" colSpan="8" className="hand-bg" align="center" style={styles.title}>
                                <font color="white"><b>Phong độ ({nameTeam})</b></font>
                            </th>
                        </tr>
                        <tr className="tr-title" align="center" height="25">
                            <th width="6%" style={styles.cellHeader}>Giải đấu</th>
                            <th width="7%" style={styles.cellHeader}>Thời gian</th>
                            <th width="10%" style={styles.cellHeader}>Chủ nhà</th>
                            <th width="5%" style={styles.cellHeader}>Tỉ số</th>
                            <th width="10%" style={styles.cellHeader}>Đội khách</th>
                            <th width="2%" style={styles.cellHeader}>Europe</th>
                            <th width="2%" style={styles.cellHeader}>Handicap</th>
                            <th width="2%" style={styles.cellHeader}>Over/Under</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(jsonData) && jsonData.length > 0 ? (
                            jsonData.slice(0, 3).map((jsonStr, index) => {
                                const dataArray = jsonStr.split(',');

                                return (
                                    <React.Fragment key={index}>
                                        <tr key={index} name={`oddsTr_${index + 1}`} className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                            <td width="3%" height="30" style={styles.cellStyle}>{dataArray[1]}</td>
                                            <td width="5%" height="30" style={styles.cellStyle}>{formatDate(parseFloat(dataArray[3]) + 7 * 3600)}</td>
                                            <td width="10%" height="30" style={{ color: home(dataArray[4]), padding: '5px', borderBottom: '1px solid #ccc' }}>{dataArray[4]}</td>
                                            <td width="5%" height="30" style={styles.cellStyle}>
                                                {dataArray[8] && dataArray[10] ? (
                                                    <div>
                                                        <span style={{ color: "red" }}>{dataArray[8]}-{dataArray[9]}</span>({dataArray[10]}-{dataArray[11]})
                                                    </div>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td width="10%" height="30" style={{ color: home(dataArray[6]), padding: '5px', borderBottom: '1px solid #ccc' }}>{dataArray[6]}</td>
                                            <td width="2%" height="30" style={styles.cellStyle} className="HW">
                                                <span className={`o-${europe(dataArray[8], dataArray[9], dataArray[4], dataArray[6], nameTeam)}`}>
                                                    {europe(dataArray[8], dataArray[9], dataArray[4], dataArray[6], nameTeam)}
                                                </span>
                                            </td>
                                            <td width="2%" height="30" style={styles.cellStyle} className="HW">
                                                <span className={`o-${handicap(dataArray[8], dataArray[9], dataArray[4], dataArray[6], nameTeam, dataArray[20])}`}>
                                                    {handicap(dataArray[8], dataArray[9], dataArray[4], dataArray[6], nameTeam, dataArray[20])}
                                                </span>
                                            </td>
                                            <td width="2%" height="30" style={styles.cellStyle} className="HW">
                                                <span className={`o-${OU(dataArray[8], dataArray[9], dataArray[32])}`}>
                                                    {OU(dataArray[8], dataArray[9], dataArray[32])}
                                                </span>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <tr width="2%">
                                <td colSpan="16" align="center">No Data!</td>
                            </tr>
                        )}

                    </tbody>
                </table>
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

export default HomeAnaly;
