import React from "react";

const Statics = (props) => {
    const { parsed } = props;

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
        },
    }

    if (parsed) {
        try {
            const jsonData = JSON.parse(parsed);
            console.log("STATICS", jsonData);
            return (
                <table width="100%" cellPadding="0" cellSpacing="1" className="modal_detail odds-table-bg" style={styles.tableStyle}>
                    <tbody>
                        <tr>
                            <td height="20" colSpan="3" className="hand-bg" align="center" style={styles.title}>
                                <font color="white"><b>Match Stats</b></font>
                            </td>
                        </tr>
                        {jsonData.map((row, index) => (
                            <React.Fragment key={index}>
                                {row.type === 6 ? (
                                    <tr height="18" className="white-bg" align="center" >
                                        <td width="25%" style={styles.cellStyle}>{row.home}</td>
                                        <td className="gray-bg2" style={styles.cellStyle}>Corner Kick</td>
                                        <td width="25%" style={styles.cellStyle}>{row.away}</td>
                                    </tr>
                                ) : null}

                                {row.type === 13 ? (
                                    <tr height="18" className="white-bg" align="center">
                                        <td width="25%" style={styles.cellStyle}>{row.home}</td>
                                        <td className="gray-bg2" style={styles.cellStyle}>Red card</td>
                                        <td width="25%" style={styles.cellStyle}>{row.away}</td>
                                    </tr>
                                ) : null}

                                {row.type === 4 ? (
                                    <tr height="18" className="white-bg" align="center">
                                        <td width="25%" style={styles.cellStyle}>{row.home}</td>
                                        <td className="gray-bg2" style={styles.cellStyle}>Shots on Goal</td>
                                        <td width="25%" style={styles.cellStyle}>{row.away}</td>
                                    </tr>
                                ) : null}

                                {row.type === 43 ? (
                                    <tr height="18" className="white-bg" align="center">
                                        <td width="25%" style={styles.cellStyle}>{row.home}</td>
                                        <td className="gray-bg2" style={styles.cellStyle}>Attacks</td>
                                        <td width="25%" style={styles.cellStyle}>{row.away}</td>
                                    </tr>
                                ) : null}

                                {row.type === 44 ? (
                                    <tr height="18" className="white-bg" align="center">
                                        <td width="25%" style={styles.cellStyle}>{row.home}</td>
                                        <td className="gray-bg2" style={styles.cellStyle}>Dangerous attacks</td>
                                        <td width="25%" style={styles.cellStyle}>{row.away}</td>
                                    </tr>
                                ) : null}

                                {row.type === 14 ? (
                                    <tr height="18" className="white-bg" align="center">
                                        <td width="25%" style={styles.cellStyle}>{row.home}</td>
                                        <td className="gray-bg2" style={styles.cellStyle}>Possession</td>
                                        <td width="25%" style={styles.cellStyle}>{row.away}</td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
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

export default Statics;
