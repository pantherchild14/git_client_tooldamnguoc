import React, { useState } from "react";

const DateSelector = ({ selectedDate, onSelectDate }) => {
    const currentDate = new Date();
    const dateOptions = [];
    // // Kiểm tra nếu hiện tại là sau 12 giờ trưa thì tăng currentDate thêm 1 ngày
    // if (currentDate.getHours() >= 12) {
    //     currentDate.setDate(currentDate.getDate() + 1);
    // }

    for (let i = 0; i < 3; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        dateOptions.push(date.toISOString().split('T')[0]);
    }

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        onSelectDate(newDate);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="dateInput">Chọn ngày:</label>
            <select style={{ borderRadius: '5px' }} id="dateInput" value={selectedDate} onChange={handleDateChange}>
                {dateOptions.map((date, index) => (
                    <option key={index} value={date}>
                        {formatDate(date)}
                    </option>
                ))}
            </select>
        </div>
    );
};



const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
};


const setDate = () => {
    const currentDate = new Date(); // Thời gian hiện tại
    const currentHours = currentDate.getHours();

    // // Kiểm tra xem hiện tại đã qua 12h trưa chưa
    // if (currentHours < 12) {
    //     // Nếu chưa, thì lùi ngày đi 1
    //     currentDate.setDate(currentDate.getDate() - 1);
    // }

    // Lấy ngày, tháng và năm hiện tại
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Kết hợp ngày, tháng và năm thành chuỗi ngày
    const selectedDate = `${year}-${month}-${day}`;
    return selectedDate;
}


const funcTimeRun = (state, time) => {
    if (state === undefined || time === undefined) {
        // Nếu thiếu STATE hoặc TIME, không thực hiện gì cả.
        return;
    }
    var currentTimeUTC = new Date();
    const offsetHours = 7;
    currentTimeUTC.setHours(currentTimeUTC.getHours() + offsetHours);
    var _serverTime = `${currentTimeUTC.getFullYear()},${currentTimeUTC.getMonth()},${currentTimeUTC.getDate()},${currentTimeUTC.getHours()},${currentTimeUTC.getMinutes()},${currentTimeUTC.getSeconds()}`;

    var difftime;
    if (_serverTime) {
        var sps = _serverTime.split(",");
        difftime = new Date() - new Date(sps[0], sps[1], sps[2], sps[3], sps[4], sps[5]);
    }

    let ms = "";
    let goTime = "";
    const timeIcon = "<span class='in-gif'></span>";

    if (state === '1') {
        const currentTime = new Date();
        const elapsedTime = currentTime - new Date(time * 1000) - difftime;
        goTime = Math.floor(elapsedTime / 60000);

        if (goTime < 1) {
            goTime = "1";
        } else if (goTime > 45) {
            goTime = "45+";
        }

        ms += goTime + timeIcon;
    } else if (state === '3') {
        const currentTime = new Date();
        const elapsedTime = (currentTime) - new Date(time * 1000) - difftime;
        goTime = Math.floor(elapsedTime / 60000) + 46;

        if (goTime < 46) {
            goTime = "46";
        } else if (goTime > 90) {
            goTime = "90+";
        }

        ms += goTime + timeIcon;
    } else if (state === '2') {
        ms += "HT";
    } else if (state === '4') {
        ms += "ET";
    } else if (state === '5') {
        ms += "Pen";
    }

    if (ms !== "") {
        return ms;
    }

}

const funcSelectTimeRun = (state, time) => {
    if (state === undefined || time === undefined) {
        // Nếu thiếu STATE hoặc TIME, không thực hiện gì cả.
        return;
    }
    var currentTimeUTC = new Date();
    const offsetHours = 7;
    currentTimeUTC.setHours(currentTimeUTC.getHours() + offsetHours);
    var _serverTime = `${currentTimeUTC.getFullYear()},${currentTimeUTC.getMonth()},${currentTimeUTC.getDate()},${currentTimeUTC.getHours()},${currentTimeUTC.getMinutes()},${currentTimeUTC.getSeconds()}`;

    var difftime;
    if (_serverTime) {
        var sps = _serverTime.split(",");
        difftime = new Date() - new Date(sps[0], sps[1], sps[2], sps[3], sps[4], sps[5]);
    }

    let ms = "";
    let goTime = "";
    const timeIcon = "<span class='in-gif'></span>";

    if (state === '1') {
        const currentTime = new Date();
        const elapsedTime = currentTime - new Date(time * 1000) - difftime;
        goTime = Math.floor(elapsedTime / 60000);

        if (goTime < 1) {
            goTime = "1";
        } else if (goTime > 45) {
            goTime = "45";
        }

        ms += goTime;
    } else if (state === '3') {
        const currentTime = new Date();
        const elapsedTime = (currentTime) - new Date(time * 1000) - difftime;
        goTime = Math.floor(elapsedTime / 60000) + 46;

        if (goTime < 46) {
            goTime = "46";
        } else if (goTime > 90) {
            goTime = "90";
        }

        ms += goTime;
    } else if (state === '2') {
        ms += "45";
    } else if (state === '4') {
        ms += "90";
    } else if (state === '5') {
        ms += "90";
    }

    if (ms !== "") {
        return ms;
    }

}

const OUFunc = (scoreHome, scoreAway, OU) => {
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

const handicapFunc = (scoreHome, scoreAway, homeName, awayName, checkName, odds) => {
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

const europeFunc = (scoreHome, scoreAway, homeName, awayName, checkName) => {
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


export {
    DateSelector,
    setDate,
    funcTimeRun,
    OUFunc,
    handicapFunc,
    europeFunc,
    funcSelectTimeRun,
};
