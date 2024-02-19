const OverUnderRun = (props) => {

    const { parsedOdds } = props;

    if (!Array.isArray(parsedOdds)) {
        return null;
    }

    const convertTime = (timestamp) => {
        if (!timestamp) {
            return '';
        }

        const dt_object = new Date(timestamp * 1000);

        dt_object.setHours(dt_object.getHours());

        const year = dt_object.getFullYear();
        const month = (dt_object.getMonth() + 1).toString().padStart(2, '0');
        const day = dt_object.getDate().toString().padStart(2, '0');
        const hours = dt_object.getHours().toString().padStart(2, '0');
        const minutes = dt_object.getMinutes().toString().padStart(2, '0');

        const formattedTime = `${day}-${month}<br>${hours}:${minutes}`;
        return formattedTime;
    };

    const sortedOdds = [...parsedOdds].sort((a, b) => b?.$?.['CHANGE_TIME'] - a?.$?.['CHANGE_TIME']);

    try {
        const style = {
            caothu: {
                height: '460px',
            },
            borderBt: {
                borderBottom: '1px solid #d8d8d8 ',
            },
            text: {
                color: '#888',
                fontWeight: 'normal',
                lineHeight: '24px',
                backgroundColor: '#eaeaea',
                whiteSpace: 'nowrap',
                fontSize: '16px'
            },
            border: {
                border: '1px solid rgb(204, 204, 204)',
            }
        };

        return (
            <div id='caothu' className='caothu-comp' style={style.caothu}>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1">
                    <thead>
                        <tr align="center" className="flexed" height="30" style={style.borderBt}>
                            <th colspan="6" style={style.text}>Asian Handicap Odds</th>
                        </tr>
                        <tr align="center" className="flexed1" >
                            <th width="16%" style={style.text}>Status</th>
                            <th width="16%" style={style.text}>Home</th>
                            <th width="16%" style={style.text}>Draw</th>
                            <th width="16%" style={style.text}>Away</th>
                            <th width="20%" style={style.text}>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOdds.map((data, index) => {
                            const instantHandicap = data?.$?.['INSTANT_HANDICAP'];
                            const prevInstantHandicap = index > 0 ? parseFloat(sortedOdds[index + 1]?.$['INSTANT_HANDICAP']) : null;
                            const instantOver = parseFloat(data?.$?.['INSTANT_OVER']);
                            const prevInstantOver = index > 0 ? parseFloat(sortedOdds[index + 1]?.$['INSTANT_OVER']) : null;
                            const instantUnder = parseFloat(data?.$?.['INSTANT_UNDER']);
                            const prevInstantUnder = index > 0 ? parseFloat(sortedOdds[index + 1]?.$['INSTANT_UNDER']) : null;

                            const handicapTextColor = prevInstantHandicap !== null && instantHandicap !== null
                                ? instantHandicap > prevInstantHandicap ? 'red' : instantHandicap < prevInstantHandicap ? 'green' : ''
                                : '';

                            const overTextColor = prevInstantOver !== null && instantOver !== null
                                ? instantOver > prevInstantOver ? 'red' : instantOver < prevInstantOver ? 'green' : ''
                                : '';

                            const underTextColor = prevInstantUnder !== null && instantUnder !== null
                                ? instantUnder > prevInstantUnder ? 'red' : instantUnder < prevInstantUnder ? 'green' : ''
                                : '';
                            return (
                                <tr key={index} style={{ textAlign: 'center' }}>
                                    <td width="16%" style={style.border}><span className="down2">
                                        {data?.$?.['ODDS_TYPE'] === "2" ? "Live" : "Run"}
                                    </span></td>
                                    <td width="16%" style={style.border}>
                                        <span className="up2" style={{ color: overTextColor }}>{instantOver}</span>
                                    </td>
                                    <td width="16%" style={style.border}><span style={{ color: handicapTextColor }}>{instantHandicap}</span></td>
                                    <td width="16%" style={style.border}><span className="down2" style={{ color: underTextColor }}>{instantUnder}</span></td>
                                    <td width="20%" className="lb time" name="timeData" data-tf="6" style={style.border}>
                                        {data?.$?.['CHANGE_TIME'] ? (
                                            <div>
                                                {convertTime(data?.$?.['CHANGE_TIME']).split('<br>').map((part, index) => (
                                                    <div key={index}>{part}</div>
                                                ))}
                                            </div>
                                        ) : ''}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        console.error("Error parsing JSON data:", error.message);
        return null;
    }
}

export default OverUnderRun