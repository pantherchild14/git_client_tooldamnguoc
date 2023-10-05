import React from "react";


const Detail = (props) => {
    const { parsed } = props;

    const styles = {
        title: {
            backgroundColor: '#3c78c4',
        },
        tableStyle: {
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f0f0f0',
        },
        cellStyle: {
            // padding: '8px',
            border: '1px solid #ccc',
            textAlign: 'center',
        },
        p: {
            margin: '7px',
        }
    }

    if (parsed) {
        try {
            const jsonData = JSON.parse(parsed);
            const status_score = (data) => {
                let html = "";
                if (data === 1) {
                    html = '/ghiban.png';
                } else if (data === 2) {
                    html = '/thedo.png'
                } else if (data === 3) {
                    html = '/thevang.png'
                } else if (data === 7) {
                    html = '/penalty.png';
                } else if (data === 11) {
                    html = '/thaynguoi.png';
                } else if (data === 13) {
                    html = '/13.png';
                } else if (data === 14) {
                    html = '/checkvar.png';
                }
                return html
            }

            return (
                <table width="400" cellpadding="0" cellspacing="1" className="modal_detail " style={styles.tableStyle}>
                    <tbody>
                        <tr>
                            <td height="20" colSpan="5" className="hand-bg" align="center" style={styles.title}>
                                <font color="white"><b>Summary</b></font>
                            </td>
                        </tr>
                        <tr className="jqSubTitle" align="center">
                            <td height="20" width="44%"><font><b>Home</b></font></td>
                            <td width="12%"><b>Min</b></td>
                            <td width="44%"><font><b>Away</b></font></td>
                        </tr>
                        {jsonData
                            .filter((row) => row.type === 1 || row.type === 2 || row.type === 7 || row.type === 13)
                            .sort((a, b) => b.minute - a.minute)
                            .map((row, index) => (
                                <tr key={index} align="center">
                                    <td className="white-bg" style={styles.cellStyle}>
                                        {row.homeEvent === true ? (
                                            <div>
                                                <p style={styles.p}>
                                                    <img alt="Substitution" src={status_score(row.type)} />
                                                    <span className="detail_player">
                                                        {row.playerName}
                                                    </span>
                                                </p>
                                            </div>
                                        ) : ''}
                                    </td>
                                    <td width="12%" className="gray-bg2" style={styles.cellStyle}>{row.minute}</td>
                                    <td className="white-bg" style={styles.cellStyle}>
                                        {row.homeEvent === false ? (
                                            <div>
                                                <p style={styles.p}>
                                                    <img alt="Substitution" src={status_score(row.type)} />
                                                    <span className="detail_player">
                                                        {row.playerName}
                                                    </span>
                                                </p>
                                            </div>
                                        ) : ''}
                                    </td>
                                </tr>
                            ))}


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

export default Detail;
