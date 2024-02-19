import React from "react";

const Detail = (props) => {
    const {
        parsed,
        nameTeam,
        awayTeam,
    } = props;

    const styles = {
        title: {
            backgroundColor: "#3c78c4",
            padding: '8px 0 ',
        },
        tableStyle: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
        },
        cellStyle: {
            // border: "1px solid #ccc",
            borderBottom: '1px solid #ccc',
            textAlign: "center",
            lineHeight: '25px',

        },
        pRight: {
            margin: "7px",
            display: 'flex',
            justifyContent: 'end',
            fontSize: '14px',
        },
        pLeft: {
            margin: "7px",
            display: 'flex',
            justifyContent: 'start',
            fontSize: '14px',
        },
    };

    const statusScore = (data) => {
        switch (data) {
            case 1:
                return "/ghiban.png";
            case 2:
                return "/thedo.png";
            case 3:
                return "/thevang.png";
            case 7:
                return "/penalty.png";
            case 8:
                return "/8.png";
            case 11:
                return "/thaynguoi.png";
            case 13:
                return "/13.png";
            case 14:
                return "/checkvar.png";
            default:
                return "";
        }
    };

    if (parsed) {
        try {
            const jsonData = JSON.parse(parsed);

            return (
                <table width="400" cellPadding="0" cellSpacing="1" className="modal_detail" style={{ ...styles.tableStyle, }}>
                    <tbody>
                        <tr>
                            <td height="20" colSpan="5" className="hand-bg" align="center" style={styles.title}>
                                <font color="white" >
                                    <b>Tóm tắt diễn biến</b>
                                </font>
                            </td>
                        </tr>
                        <tr className="jqSubTitle" align="center">
                            <td height="20" width="44%" style={{ ...styles.cellStyle, color: "red" }}>
                                <font style={{ float: 'right', marginRight: '60px' }}>
                                    <b>{nameTeam}</b>
                                </font>
                            </td>
                            <td width="12%" style={{ ...styles.cellStyle }}>
                                <b>Thời Gian</b>
                            </td>
                            <td width="44%" style={{ ...styles.cellStyle, color: "blue" }}>
                                <font style={{ float: 'left', marginLeft: '60px' }}>
                                    <b>{awayTeam}</b>
                                </font>
                            </td>
                        </tr>
                        {jsonData
                            .filter((row) => [1, 2, 7, 8, 13].includes(row.type))
                            .map((row, index) => (
                                <tr key={index} align="center">
                                    <td className="white-bg" style={styles.cellStyle}>
                                        {row.homeEvent === true && (
                                            <div>
                                                <p style={styles.pRight}>
                                                    <span className="detail_player" style={{ marginRight: '15px' }}>{row.playerName}</span>
                                                    <div><img alt="Substitution" src={statusScore(row.type)} style={{ paddingTop: '4px' }} /></div>
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                    <td width="12%" className="gray-bg2" style={{ ...styles.cellStyle, fontWeight: '500' }}>
                                        {row.minute}'
                                    </td>
                                    <td className="white-bg" style={styles.cellStyle}>
                                        {row.homeEvent === false && (
                                            <div>
                                                <p style={styles.pLeft}>
                                                    <div><img alt="Substitution" src={statusScore(row.type)} style={{ paddingTop: '4px' }} /></div>
                                                    <span className="detail_player" style={{ marginLeft: '15px' }}>{row.playerName}</span>
                                                </p>
                                            </div>
                                        )}
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
