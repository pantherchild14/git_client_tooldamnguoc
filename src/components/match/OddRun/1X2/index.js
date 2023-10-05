const X2Run = (props) => {

    const { parsedOdds } = props;


    if (!Array.isArray(parsedOdds)) {
        return null;
    }

    const convertTime = (timestamp) => {
        if (!timestamp) {
            return ''; // Xử lý trường hợp timestamp không tồn tại
        }

        const dt_object = new Date(timestamp * 1000); // Chuyển đổi Unix timestamp thành mili giây

        // Thêm 7 giờ vào thời gian
        dt_object.setHours(dt_object.getHours() - 1);

        const year = dt_object.getFullYear();
        const month = (dt_object.getMonth() + 1).toString().padStart(2, '0');
        const day = dt_object.getDate().toString().padStart(2, '0');
        const hours = dt_object.getHours().toString().padStart(2, '0');
        const minutes = dt_object.getMinutes().toString().padStart(2, '0');

        const formattedTime = `${day}-${month} ${hours}:${minutes}`;
        return formattedTime;
    };

    const sortedOdds = [...parsedOdds].sort((a, b) => b?.$?.['CHANGE_TIME'] - a?.$?.['CHANGE_TIME']);

    try {
        const style = {
            caothu: {
                height: '460px',
            },
        };

        return (
            <div id='caothu' className='caothu-comp' style={style.caothu}>
                <table width="100%" border="0" align="center" cellPadding="2" cellSpacing="1">
                    <thead>
                        <tr align="center" className="flexed" height="30">
                            <th colspan="6">1X2 Odds</th>
                        </tr>
                        <tr align="center" className="flexed1">
                            <th width="20%">Update</th>
                            <th width="16%">Home</th>
                            <th width="16%">Draw</th>
                            <th width="16%">Away</th>
                            <th width="16%">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOdds.map((data, index) => {
                            return (
                                <tr key={index} style={{ textAlign: 'center' }}>
                                    <td width="20%" className="lb time" name="timeData" data-tf="6">
                                        {data?.$?.['CHANGE_TIME'] ? convertTime(data?.$?.['CHANGE_TIME']) : ''}
                                    </td>
                                    <td width="16%"><span className="up2">{data?.$?.['INSTANT_HOME']}</span></td>
                                    <td width="16%"><span className="">{data?.$?.['INSTANT_DRAW']}</span></td>
                                    <td width="16%"><span className="down2">{data?.$?.['INSTANT_AWAY']}</span></td>
                                    <td width="16%"><span className="down2">
                                        {data?.$?.['ODDS_TYPE'] === "2" ? "Live" : "Run"}
                                    </span></td>
                                </tr>
                            )
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

export default X2Run