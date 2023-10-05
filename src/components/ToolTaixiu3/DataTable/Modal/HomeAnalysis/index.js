import React from "react";

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

    const OU = (score) => {
        if (score) {
            const scoreParts = score.split('-');
            if (scoreParts.length === 2) {
                const beforeDash = parseInt(scoreParts[0], 10);
                const afterDash = parseInt(scoreParts[1], 10);
                const OU = beforeDash + afterDash;
                if (OU >= 2.5) {
                    return "O";
                } else {
                    return "U";
                }
            }
        }
    };

    const styles = {
        title: {
            backgroundColor: '#3c78c4',
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
            fontSize: '12px',
        },
    }

    if (parsed) {
        try {
            const jsonData = (parsed);

            return (
                <table width="100%" cellPadding="0" cellSpacing="1" className="modal_detail odds-table-bg" style={styles.tableStyle}>
                    <thead>
                        <tr>
                            <th width="100%" height="20" colSpan="7" className="hand-bg" align="center" style={styles.title}>
                                <font color="white"><b>Home</b></font>
                            </th>
                        </tr>
                        <tr className="tr-title" align="center" height="25">
                            <th width="3%" style={styles.cellStyle}>League/Cup</th>
                            <th width="5%" style={styles.cellStyle}>Date</th>
                            <th width="10%" style={styles.cellStyle}>Home</th>
                            <th width="5%" style={styles.cellStyle}>Score</th>
                            <th width="10%" style={styles.cellStyle}>Away</th>
                            <th width="2%" style={styles.cellStyle}>W/L</th>
                            <th width="2%" style={styles.cellStyle}>O/U</th>
                        </tr>
                    </thead>
                    <tbody>

                        {jsonData.slice(0, 3).map((jsonStr, index) => {
                            const dataArray = jsonStr.split(',');

                            return (
                                <React.Fragment key={index}>
                                    <tr key={index} name={`oddsTr_${index + 1}`} className="tb-bgcolor1" cid="8" style={{ textAlign: 'center' }}>
                                        <td width="3%" height="30" style={styles.cellStyle}>{dataArray[1]}</td>
                                        <td width="5%" height="30" style={styles.cellStyle}>{formatDate(parseFloat(dataArray[3]) + 7 * 3600)}</td>
                                        <td width="10%" height="30" style={{ color: home(dataArray[4]), padding: '5px', border: '1px solid #ccc', border: '1px solid #ccc' }}>{dataArray[4]}</td>
                                        <td width="5%" height="30" style={styles.cellStyle}>
                                            {dataArray[8] && dataArray[10] ? (
                                                <div>
                                                    <span style={{ color: "red" }}>{dataArray[8]}-{dataArray[9]}</span>({dataArray[10]}-{dataArray[11]})
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td width="10%" height="30" style={{ color: home(dataArray[6]), padding: '5px', border: '1px solid #ccc', border: '1px solid #ccc' }}>{dataArray[6]}</td>
                                        {/* <td width="2%" height="30" style={styles.cellStyle}>
                                            <span className={`o-${e.W_L}`}>{e.W_L}</span>
                                        </td>
                                        <td width="2%" height="30" style={styles.cellStyle}>
                                            <span className={`o-${OU(e.Score)}`}>
                                                {OU(e.Score)}
                                            </span>
                                        </td> */}
                                    </tr>
                                </React.Fragment>
                            );
                        })}

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
