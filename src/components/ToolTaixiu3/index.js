import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import * as actions from "../../redux/actions";
import { scheduleState$, oddsState$ } from "../../redux/selectors";
import { DateSelector, setDate } from "./Functions/DateSelector";
import DataTable from "./DataTable";
import { UTCtoLocalTime, formatNumber } from "../../helpers";
import { fetchDetailMatchAllRT, fetchStatusRT, fetchTimeRunRT } from "../../api";

const ToolTaiXiu3 = () => {
    const dispatch = useDispatch();
    const schedule = useSelector(scheduleState$);
    const odds = useSelector(oddsState$);

    const [newSocket, setSocket] = useState(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const [schedulesEmit, setSchedulesEmit] = useState([]);

    const [selectedDate, setSelectedDate] = useState(setDate);
    const [oddRealTime, setOddRealTime] = useState([]);

    const [selectedTips, setSelectedTips] = useState(false);
    const [selectedTeamUp, setSelectedTeamUp] = useState("");
    const [selectedTipRun, setSelectedTipRun] = useState("");
    const [selectedFilterTimeRun, setSelectedFilterTimeRun] = useState("");

    const handleTipsCheckboxChange = (e) => {
        setSelectedTips(e.target.checked);
    };

    const handleReset = () => {
        setSelectedTips(false);
        setSelectedTeamUp("");
        setSelectedTipRun("");
        setSelectedFilterTimeRun("");
    };

    useEffect(() => {
        const fetchData = async (date) => {
            await Promise.all([
                dispatch(actions.getSchedules.getSchedulesRequest(date)),
                dispatch(actions.getOdds.getOddsRequest()),
            ]);
        };
        fetchData(selectedDate);
    }, [selectedDate]);


    // useEffect(() => {
    //     var length = 0;
    //     length = bfRefresh?.length || 0;

    //     for (var i = 0; i < length; i++) {
    //         var D;
    //         D = bfRefresh?.[i]?.$;

    //         if (!D) continue;
    //         var tr = document.getElementById("tr_" + D.MATCH_ID);
    //         if (tr === null) continue;
    //         try {

    //             var DHandicapJson = JSON.parse(D.ODDS_AH_FT);
    //             var DOuJson = JSON.parse(D.ODDS_OU_FT);
    //             /* Asian Handicap */
    //             var upodds = tr.querySelector("#upodds_" + D.MATCH_ID);
    //             var downodds = tr.querySelector("#downodds_" + D.MATCH_ID);
    //             var goal = tr.querySelector("#goal_" + D.MATCH_ID);
    //             var goalLive = tr.querySelector("#goalLive_" + D.MATCH_ID);


    //             /* Over/Under */
    //             var goal_t1 = tr.querySelector("#goal_t1_" + D.MATCH_ID);
    //             var upodds_t = tr.querySelector("#upodds_t_" + D.MATCH_ID);
    //             var downodds_t = tr.querySelector("#downodds_t_" + D.MATCH_ID);

    //             updateElement(formatNumber(DHandicapJson.l.u), upodds);

    //             updateElemenAttribute((DHandicapJson.l.g) < 0 ? (-DHandicapJson.l.g) : (-DHandicapJson.l.g), goal, "odd_goal")
    //             updateElemenAttribute((DHandicapJson.l.g) < 0 ? (DHandicapJson.l.g) : (DHandicapJson.l.g), goalLive, "odd_goallive")


    //             updateElement((DHandicapJson.l.g) < 0 ? "" : (DHandicapJson.l.g), goal);
    //             updateElement((DHandicapJson.l.g) < 0 ? (-DHandicapJson.l.g) : "", goalLive);

    //             updateElement(formatNumber(DHandicapJson.l.d), downodds);

    //             updateElement(formatNumber(DOuJson.l.u), upodds_t);
    //             updateElement((DOuJson.l.g), goal_t1);
    //             updateElement(formatNumber(DOuJson.l.d), downodds_t);

    //             function updateElement(newValue, element) {
    //                 element.textContent = newValue;
    //             }
    //             function updateElemenAttribute(newValue, trElement, attributeName) {
    //                 trElement.setAttribute(attributeName, newValue);
    //             }
    //         } catch (error) {
    //             console.error("Error parsing JSON:", error);
    //         }
    //     }


    // }, [bfRefresh])

    useEffect(() => {
        var length = 0;
        length = oddRealTime?.length || 0;

        for (var i = 0; i < length; i++) {
            var D;
            D = oddRealTime?.[i]?.$;
            if (!D) continue;
            var odds = D;
            var tr = document.getElementById("tr_" + D.MATCH_ID);
            if (tr === null) continue;
            try {
                var odds_handicapValue = tr.attributes["odds_handicap"]?.value;
                var odds_overValue = tr.attributes["odds_over"]?.value;

                var home = tr.querySelector("#home_" + D.MATCH_ID);
                var away = tr.querySelector("#away_" + D.MATCH_ID);
                /* Asian Handicap */
                var upodds = tr.querySelector("#upoddsRun_" + D.MATCH_ID);
                var downodds = tr.querySelector("#downoddsRun_" + D.MATCH_ID);
                var goal = tr.querySelector("#goalRun_" + D.MATCH_ID);
                var goalDemo = tr.querySelector("#goalRunDemo_" + D.MATCH_ID);

                /* Over/Under */
                var goal_t1 = tr.querySelector("#goalRun_t1_" + D.MATCH_ID);
                var upodds_t = tr.querySelector("#upoddsRun_t_" + D.MATCH_ID);
                var downodds_t = tr.querySelector("#downoddsRun_t_" + D.MATCH_ID);

                if (
                    (odds_handicapValue && odds_handicapValue.trim() !== "") ||
                    (odds_overValue && odds_overValue.trim() !== "")
                ) {
                    const old_handicap = JSON.parse(odds_handicapValue || "{}");
                    const old_over = JSON.parse(odds_overValue || "{}");

                    const odds_handicap = JSON.parse(D?.["handicap"] || "{}");
                    const odds_over = JSON.parse(D?.["overUnder"] || "{}");

                    // Kiểm tra và cập nhật dữ liệu mới nếu có
                    if (odds_handicap.INSTANT_HOME !== undefined) {
                        updateElement(
                            formatNumber(odds_handicap.INSTANT_HOME),
                            formatNumber(old_handicap.INSTANT_HOME),
                            "upoddsRun_",
                            upodds
                        );
                    }

                    if (odds_handicap.INSTANT_HANDICAP !== undefined) {
                        updateElement(
                            odds_handicap.INSTANT_HANDICAP < 0 ? "" : odds_handicap.INSTANT_HANDICAP,
                            old_handicap.INSTANT_HANDICAP < 0 ? "" : old_handicap.INSTANT_HANDICAP,
                            "goalRun_",
                            goal
                        );

                        updateElement(
                            odds_handicap.INSTANT_HANDICAP < 0
                                ? -odds_handicap.INSTANT_HANDICAP
                                : "",
                            old_handicap.INSTANT_HANDICAP < 0
                                ? -old_handicap.INSTANT_HANDICAP
                                : "",
                            "goalRunDemo_",
                            goalDemo
                        );

                        updateAttributeHandicap(
                            odds_handicap.INSTANT_HANDICAP < 0
                                ? ""
                                : odds_handicap.INSTANT_HANDICAP,
                            goal
                        );

                        updateAttributeHandicapRun(
                            odds_handicap.INSTANT_HANDICAP < 0
                                ? -odds_handicap.INSTANT_HANDICAP
                                : "",
                            goalDemo
                        );

                        updateAttribute(
                            odds_handicap.INSTANT_HANDICAP < 0
                                ? -odds_handicap.INSTANT_HANDICAP
                                : -odds_handicap.INSTANT_HANDICAP
                                    ? `me_color`
                                    : "",
                            home
                        );

                        updateAttribute(
                            odds_handicap.INSTANT_HANDICAP < 0
                                ? odds_handicap.INSTANT_HANDICAP
                                    ? `me_color`
                                    : ""
                                : odds_handicap.INSTANT_HANDICAP,
                            away
                        );
                    }

                    if (odds_handicap.INSTANT_AWAY !== undefined) {
                        updateElement(
                            formatNumber(odds_handicap.INSTANT_AWAY),
                            formatNumber(old_handicap.INSTANT_AWAY),
                            "downoddsRun_",
                            downodds
                        );
                    }

                    if (odds_over.INSTANT_OVER !== undefined) {
                        updateElement(
                            formatNumber(odds_over.INSTANT_OVER),
                            formatNumber(old_over.INSTANT_OVER),
                            "upoddsRun_t_",
                            upodds_t
                        );
                    }

                    if (odds_over.INSTANT_HANDICAP !== undefined) {
                        updateElement(
                            odds_over.INSTANT_HANDICAP,
                            old_over.INSTANT_HANDICAP,
                            "goalRun_t1_",
                            goal_t1
                        );
                    }

                    if (odds_over.INSTANT_UNDER !== undefined) {
                        updateElement(
                            formatNumber(odds_over.INSTANT_UNDER),
                            formatNumber(old_over.INSTANT_UNDER),
                            "downoddsRun_t_",
                            downodds_t
                        );
                    }
                }

                function updateElement(newValue, oldValue, elementPrefix, element) {
                    if ((oldValue) !== (newValue)) {
                        if (parseFloat(oldValue) > parseFloat(newValue)) {
                            newValue = '<span class="down">' + newValue + '</span>';

                        } else if (parseFloat(oldValue) < parseFloat(newValue)) {
                            newValue = '<span class="up">' + newValue + '</span>';
                        }
                    }
                    element.innerHTML = newValue;
                }

                function updateAttribute(newValue, element) {
                    element.setAttribute("class", newValue);
                }

                function updateAttributeHandicap(newValue, element) {
                    element.setAttribute("odd_handicap", newValue);
                }

                function updateAttributeHandicapRun(newValue, element) {
                    element.setAttribute("odd_handicapDemo", newValue);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
            // Tránh gán giá trị undefined vào thuộc tính
            if (odds?.["handicap"] !== undefined) {
                tr.attributes["odds_handicap"].value = JSON.stringify(odds?.["handicap"]);
            }
            if (odds?.["overUnder"] !== undefined) {
                tr.attributes["odds_over"].value = JSON.stringify(odds?.["overUnder"]);
            }
        }
    }, [oddRealTime])


    useEffect(() => {
        var length = 0;
        length = schedulesEmit?.length || 0;

        for (var i = 0; i < length; i++) {
            var D;
            D = schedulesEmit?.[i]?.$;
            if (!D) continue;
            let tr = document.getElementById("tr_" + D.MATCH_ID);
            if (tr === null) continue;

            try {
                const startMatchTimer = () => {
                    if (D.STATUS === undefined || D.HALF_START_TIME === undefined) {
                        return;
                    }

                    const matchStartTimeInSeconds = parseInt(D.HALF_START_TIME);
                    let ms = "";
                    // Check if it's a valid timestamp (greater than 0) and not NaN
                    if (isNaN(matchStartTimeInSeconds) || matchStartTimeInSeconds <= 0) {
                        // Handle the case where D.HALF_START_TIME is missing or invalid
                        // You can set ms to a default value or handle it as needed
                        ms = "N/A"; // Set a default value or handle it accordingly
                    } else {
                        const currentTime = new Date();
                        const matchStartTime = new Date(matchStartTimeInSeconds * 1000);

                        // Calculate elapsed time in minutes
                        const elapsedTimeMinutes = Math.floor((matchStartTime - currentTime) / 60000);


                        const timeIcon = "<span class='in-gif'></span>";

                        if (D.STATUS === 1) {
                            if (elapsedTimeMinutes < 1) {
                                ms = "1" + timeIcon;
                            } else if (elapsedTimeMinutes > 45) {
                                ms = "45+" + timeIcon;
                            } else {
                                ms = elapsedTimeMinutes + timeIcon;
                            }
                        } else if (D.STATUS === 3) {
                            if (elapsedTimeMinutes < 46) {
                                ms = "46" + timeIcon;
                            } else if (elapsedTimeMinutes > 90) {
                                ms = "90+" + timeIcon;
                            } else {
                                ms = elapsedTimeMinutes + timeIcon;
                            }
                        } else if (D.STATUS === 2) {
                            ms = "HT";
                        } else if (D.STATUS === 4) {
                            ms = "ET";
                        } else if (D.STATUS === 5) {
                            ms = "Pen";
                        }
                    }

                    const matchTimeElement = tr.querySelector(`#ms${D.MATCH_ID}`);
                    const hsElement = tr.querySelector(`#hs${D.MATCH_ID}`);
                    const gsElement = tr.querySelector(`#gs${D.MATCH_ID}`);
                    if (ms !== "") {
                        if (matchTimeElement) {
                            matchTimeElement.innerHTML = ms;
                        }
                        if (hsElement) {
                            hsElement.innerHTML = D.HOME_SCORE;
                        }
                        if (gsElement) {
                            gsElement.innerHTML = D.AWAY_SCORE;
                        }
                    }

                    setTimeout(startMatchTimer, 30 * 1000);
                }

                startMatchTimer();

            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [schedulesEmit])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const socket = io.connect(`${process.env.REACT_APP_URL_SERVER}`);
                socket.on("connect", () => {
                    setIsSocketConnected(true);
                    console.log("con sw");
                });

                socket.on("ODDS", async (data) => {
                    try {
                        const dataJson = JSON.parse(data);
                        if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
                            const dataOdds = dataJson['ODDS_DATA']['ODDS_ITEM'];
                            setOddRealTime(dataOdds);
                        }
                    } catch (error) {
                        console.error("Error while parsing JSON data:", error.message);
                    }
                });


                socket.on("SCHEDULE", async (data) => {
                    try {
                        const dataJson = JSON.parse(data);
                        if (dataJson && dataJson['SCHEDULE_DATA'] && dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM']) {
                            setSchedulesEmit(dataJson['SCHEDULE_DATA']['SCHEDULE_ITEM'], 1);
                        }
                    } catch (error) {
                        console.error("Error while parsing JSON data:", error.message);
                    }
                });


                socket.on("disconnect", () => {
                    setIsSocketConnected(false);
                    console.log("Socket disconnected");
                });

                setSocket(socket);

                return () => {
                    if (newSocket) {
                        newSocket.disconnect();
                    }
                    // socket.disconnect();
                };
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);


    // if (schedule.data.length === 0 || odds.data.length === 0) {
    //     return <div style={{ textAlign: 'center' }}><CircularProgress /></div>;
    // }


    return (
        <React.Fragment>
            <Box style={{ paddingBottom: '30px' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={4}>
                        <div>
                            <label>
                                Lọc Time Run:
                                <select
                                    value={selectedFilterTimeRun}
                                    onChange={(e) => setSelectedFilterTimeRun(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="80">Time run {`<=`} 80</option>
                                    <option value="75">Time run {`<=`} 75</option>
                                    <option value="70">Time run {`<=`} 70</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTips}
                                    onChange={handleTipsCheckboxChange}
                                />
                                Kèo đâm ngược
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                Đội kèo trên:
                                <select
                                    value={selectedTeamUp}
                                    onChange={(e) => setSelectedTeamUp(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="home">Home</option>
                                    <option value="away">Away</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>
                            <label>
                                Các trận đấu bị đâm ngược:
                                <select
                                    value={selectedTipRun}
                                    onChange={(e) => setSelectedTipRun(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="0.25">Kèo trên chấp {`>=`} 0.25</option>
                                    <option value="0.5">Kèo trên chấp {`>=`} 0.5</option>
                                    <option value="0.75">Kèo trên chấp {`>=`} 0.75</option>
                                    <option value="1">Kèo trên chấp {`>=`} 1</option>
                                    <option value="1.25">Kèo trên chấp {`>=`} 1.25</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                Reset Tất Cả:
                                <button onClick={handleReset}>Reset</button>
                            </label>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <TableContent
                schedule={schedule}
                odds={odds}
                schedulesEmit={schedulesEmit}
                selectedTips={selectedTips}
                selectedTeamUp={selectedTeamUp}
                selectedTipRun={selectedTipRun}
                selectedFilterTimeRun={selectedFilterTimeRun} />
        </React.Fragment>
    );
};

export default ToolTaiXiu3;

const TableContent = ({ schedule,
    odds,
    schedulesEmit,
    selectedTips,
    selectedTeamUp,
    selectedTipRun,
    selectedFilterTimeRun }) => {


    const sortedMatches = useMemo(() => {
        if (schedule.data) {
            return schedule.data.sort((a, b) => {
                const timeA = new Date(a.MATCH_TIME);
                const timeB = new Date(b.MATCH_TIME);
                return timeA - timeB;
            });
        } else {
            return [];
        }
    }, [schedule.data]);


    return (
        <table className="tooltaixiu3 dntable-list -td-0 table table-hover table-striped table-bordered align-middle">
            <thead>
                <tr>
                    <td rowSpan="2" className="td-time">Time</td>
                    <td rowSpan="2" className="td-league">League</td>
                    <td rowSpan="2" className="td-match">Match</td>
                    <td rowSpan="2" className="td-match">Score</td>
                    <td colSpan="2" className="td-handicap">Kèo Handicap (Run)</td>
                    <td colSpan="2" className="td-overunder">Over/Under (Run)</td>
                    <td rowSpan="2" className="td-handicap">Tips</td>
                    <td colSpan="3" className="td-handicap">Kèo Handicap</td>
                    <td colSpan="3" className="td-overunder">Over/Under</td>
                    <td rowSpan="2" className="td-view"></td>
                </tr>
                <tr>
                    <td className="td-handicap-keo-run">Kèo Run</td>
                    <td className="td-handicap-odds">Odds Run</td>

                    <td className="td-overunder-keo-run">Kèo Run</td>
                    <td className="td-overunder-odds">Odds Run</td>

                    <td className="td-handicap-live">Kèo Live</td>
                    <td className="td-handicap-slot-open">Kèo Mở</td>
                    <td className="td-handicap-bd-live">Biến động<br />kèo(Live)</td>

                    <td className="td-overunder-keo-live">Kèo Live</td>
                    <td className="td-overunder-slot-open">Kèo mở</td>
                    <td className="td-overunder-bd-live">Biến động<br />Live</td>
                </tr>
            </thead>
            <tbody id="tbody-data" className="tbody-data">
                <React.Fragment>
                    {sortedMatches.map((e) => {
                        const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
                        const matchedOddsItem = oddsItemData?.find(item => item?.$?.MATCH_ID === e?.$.MATCH_ID);

                        const scheduleEmitItemData = schedulesEmit;
                        const matchedScheduleEmitItem = scheduleEmitItemData?.find(item => item?.$?.MATCH_ID === e?.$.MATCH_ID);

                        if (matchedOddsItem) {
                            return <DataTable
                                key={e.MATCH_ID}
                                e={e?.$}
                                odds={matchedOddsItem}
                                matchedScheduleEmitItem={matchedScheduleEmitItem?.$}
                                selectedTips={selectedTips}
                                selectedTeamUp={selectedTeamUp}
                                selectedTipRun={selectedTipRun}
                                selectedFilterTimeRun={selectedFilterTimeRun} />;
                        }
                        return null;
                    })}
                </React.Fragment>
            </tbody>
        </table>
    );
};
