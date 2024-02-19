import React, { useLayoutEffect, useMemo, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import * as actions from "../../redux/actions";
import {
    scheduleDayState$,
    oddsState$,
    oddHistoryAllState$,
    oddHistoryArrState$
} from "../../redux/selectors";
import DataTable from "./DataTable";
import { DateSelector, setDate } from "../ToolTaixiu3/Functions/DateSelector";
import { UTCtoLocalTimeTool1, formatNumber } from "../../helpers";
// import { convertTime, convertTimeSelectOddRun, formatNumber } from "../../helpers";

const ToolTaiXiu1 = () => {
    const dispatch = useDispatch();
    const schedule = useSelector(scheduleDayState$);
    const odds = useSelector(oddsState$);
    const oddHistory = useSelector(oddHistoryAllState$);
    const threeIn1 = useSelector(oddHistoryArrState$);

    const [newSocket, setSocket] = useState(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [selectedDate, setSelectedDate] = useState(setDate);
    const [selectedHandicap, setSelectedHandicap] = useState("");
    const [selectedOddHandicap, setSelectedOddHandicap] = useState("");
    const [selectedOver, setSelectedOver] = useState("");
    const [selectedOddOver, setSelectedOddOver] = useState("");
    const [selectedTimeRun, setSelectedTimeRun] = useState("");
    const [selectedTeamUp, setSelectedTeamUp] = useState("");
    //   const [bfRefresh, SetBfRefresh] = useState([]);
    //   const [threeIn1, Set3In1] = useState([]);

    //   useLayoutEffect(() => {
    //     fetchData(selectedDate);
    //   }, [selectedDate]);

    const [schedulesEmit, setSchedulesEmit] = useState([]);
    const [oddRealTime, setOddRealTime] = useState([]);
    useEffect(() => {
        const fetchData = async (date) => {
            await Promise.all([
                dispatch(actions.getSchedulesDay.getSchedulesDayRequest(date)),
                dispatch(actions.getOdds.getOddsRequest()),
                dispatch(actions.getOddHistoryAll.getOddHistoryAllRequest()),
                dispatch(actions.getOddHistoryArr.getOddHistoryArrRequest()),
                // dispatch(actions.getAnalysisAll.getAnalysisAllRequest()),
                // dispatch(actions.getStatsAll.getStatsAllRequest()),
                // dispatch(actions.getDetailAll.getDetailAllRequest()),
            ]);
        };
        fetchData(selectedDate);
    }, [selectedDate]);

    //   const tb_refresh = useCallback((data, type) => {
    //     var length = 0;
    //     if (type === 1) {
    //       length = data?.length || 0;
    //     } else {
    //       length = data?.data?.SCHEDULE_DATA?.SCHEDULE_ITEM?.length || 0;
    //     }
    //     for (var i = 0; i < length; i++) {
    //       var D;
    //       if (type === 0) {
    //         D = data?.data?.SCHEDULE_DATA?.SCHEDULE_ITEM?.[i]?.$;
    //       } else {
    //         D = data?.[i]?.$;
    //       }
    //       if (!D) continue;
    //       var match = D;
    //       var tr = document.getElementById("tr_" + D.MATCH_ID);
    //       if (tr === null) continue;
    //       tr.attributes["data-s"].value = JSON.stringify(match.STATUS);
    //       tr.attributes["data-t"].value = JSON.stringify(match);
    //     }
    //   }, []);

    useEffect(() => {
        var length = 0;
        length = oddRealTime?.length || 0;
        for (var i = 0; i < length; i++) {
            var D = oddRealTime?.[i]?.$;

            if (!D) continue;
            var tr = document.getElementById("tr_" + D.MATCH_ID);
            if (tr === null) continue;

            try {
                if (D.handicap) {
                    var DHandicapJson = JSON.parse(D.handicap);
                    updateElement(formatNumber(DHandicapJson.INSTANT_HOME), tr.querySelector("#upodds_" + D.MATCH_ID));
                    updateElement((DHandicapJson.INSTANT_HANDICAP) < 0 ? (-DHandicapJson.INSTANT_HANDICAP) : (-DHandicapJson.INSTANT_HANDICAP), tr.querySelector("#goal_" + D.MATCH_ID));
                    updateElement((DHandicapJson.INSTANT_HANDICAP) < 0 ? (DHandicapJson.INSTANT_HANDICAP) : (DHandicapJson.INSTANT_HANDICAP), tr.querySelector("#goalLive_" + D.MATCH_ID));
                    updateElement(formatNumber(DHandicapJson.INSTANT_AWAY), tr.querySelector("#downodds_" + D.MATCH_ID));
                }

                if (D.overUnder) {
                    var DOuJson = JSON.parse(D.overUnder);
                    updateElement(formatNumber(DOuJson.INSTANT_OVER), tr.querySelector("#upodds_t_" + D.MATCH_ID));
                    updateElement((DOuJson.INSTANT_HANDICAP), tr.querySelector("#goal_t1_" + D.MATCH_ID));
                    updateElement(formatNumber(DOuJson.INSTANT_UNDER), tr.querySelector("#downodds_t_" + D.MATCH_ID));
                }

                function updateElement(newValue, element) {
                    if (element) {
                        element.textContent = newValue;
                    }
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    }, [oddRealTime])
    // const length = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.length || 0;
    // const D = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.[i]?.HANDICAP_ITEM;
    // const tr = document.getElementById("tr_" + threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.[i]?.$.MATCH_ID);
    useEffect(() => {
        const get3In1 = () => {
            const length = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.length || 0;

            for (let i = 0; i < length; i++) {
                const D = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.[i]?.HANDICAP_ITEM;
                const matchID = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.[i]?.$.MATCH_ID;
                if (!D) continue;
                const tr = document.getElementById("tr_" + matchID);
                if (!tr) continue;
                try {
                    const oddAH_ft = D;
                    if (selectedTimeRun !== "") {
                        updateAHOdds(tr, D, matchID, oddAH_ft);
                    }
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        }

        const getOver3In1 = () => {
            const length = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.length || 0;

            for (let i = 0; i < length; i++) {
                const D = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.[i]?.OVER_UNDER_ITEM;
                const matchID = threeIn1?.data?.ODDS_HISTORY_DATA?.ODDS_HISTORY_ITEM?.[i]?.$.MATCH_ID;
                if (!D) continue;
                const tr = document.getElementById("tr_" + matchID);
                if (!tr) continue;
                try {
                    const oddOU_ft = D;
                    if (selectedTimeRun !== "") {
                        updateOUOdds(tr, D, matchID, oddOU_ft);
                    }
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        }

        // Hàm cập nhật AH odds
        const updateAHOdds = (tr, D, matchID, oddAH_ft) => {
            if (oddAH_ft && oddAH_ft.length > 0) {

                oddAH_ft.sort((a, b) => Math.abs(hourse(a?.$?.CHANGE_TIME) - selectedTimeRun) - Math.abs(hourse(b?.$?.CHANGE_TIME) - selectedTimeRun));

                const nearestOdd = oddAH_ft.find(odd => parseFloat(hourse(odd?.$?.CHANGE_TIME)) <= parseFloat(selectedTimeRun));

                if (nearestOdd) {
                    const upodds = tr.querySelector("#upodds_" + matchID);
                    const downodds = tr.querySelector("#downodds_" + matchID);
                    const goal = tr.querySelector("#goal_" + matchID);
                    const goalLive = tr.querySelector("#goalLive_" + matchID);
                    updateElement(formatNumber(nearestOdd?.$?.INSTANT_HOME), upodds);
                    updateElement((nearestOdd?.$?.INSTANT_HANDICAP) < 0 ? (-nearestOdd?.$?.INSTANT_HANDICAP) : (-nearestOdd?.$?.INSTANT_HANDICAP), goal);
                    updateElement((nearestOdd?.$?.INSTANT_HANDICAP) < 0 ? (nearestOdd?.$?.INSTANT_HANDICAP) : (nearestOdd?.$?.INSTANT_HANDICAP), goalLive);
                    updateElement(formatNumber(nearestOdd?.$?.INSTANT_AWAY), downodds);
                }
            }
        }

        // // Hàm cập nhật OU odds
        const updateOUOdds = (tr, D, matchID, oddOU_ft) => {
            if (oddOU_ft && oddOU_ft.length > 0) {
                oddOU_ft.sort((a, b) => Math.abs(hourse(a?.$?.CHANGE_TIME) - selectedTimeRun) - Math.abs(hourse(b?.$?.CHANGE_TIME) - selectedTimeRun));
                const nearestOdd = oddOU_ft.find(odd => parseFloat(hourse(odd?.$?.CHANGE_TIME)) <= parseFloat(selectedTimeRun));

                if (nearestOdd) {
                    const goal_t1 = tr.querySelector("#goal_t1_" + matchID);
                    const upodds_t = tr.querySelector("#upodds_t_" + matchID);
                    const downodds_t = tr.querySelector("#downodds_t_" + matchID);

                    updateElement(formatNumber(nearestOdd?.$?.INSTANT_OVER), upodds_t);
                    updateElement((nearestOdd?.$?.INSTANT_HANDICAP), goal_t1);
                    updateElement(formatNumber(nearestOdd?.$?.INSTANT_UNDER), downodds_t);
                }
            }
        }

        const hourse = (time) => {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const hoursDifference = (currentTimestamp - time) / 3600;

            return hoursDifference;
        }


        // Hàm cập nhật phần tử HTML
        const updateElement = (newValue, element) => {
            element.innerHTML = newValue;
        }
        getOver3In1();
        get3In1();
    }, [threeIn1, selectedTimeRun]);

    const handleReset = () => {
        setSelectedDate(new Date().toISOString().split('T')[0]);
        setSelectedHandicap("");
        setSelectedOddHandicap("");
        setSelectedOver("");
        setSelectedOddOver("");
        setSelectedTimeRun("");
        setSelectedTeamUp("");
        // SetBfRefresh([]);
        // Set3In1([]);
    };

    const handleChuan1 = () => {
        setSelectedHandicap("0.5");
        setSelectedOddHandicap("giamgia");
        setSelectedTimeRun("24");
        setSelectedTeamUp("home");
    }

    const handleChuan2 = () => {
        setSelectedOver("0.5");
        setSelectedOddOver("giamgia");
        setSelectedTimeRun("24");
    }

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

    const style = {
        selectTip: {
            padding: '5px 0',
            borderRadius: '5px',
            marginLeft: '5px',
        },
        button: {
            padding: '7px 10px',
            marginLeft: '5px',
            borderRadius: '5px',
            color: '#fff',
            border: 'inherit',
            background: '#0D6EFD',
            cursor: 'pointer',
        }
    }

    return (
        <React.Fragment>
            <Box style={{ paddingBottom: '30px' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={2}>
                        <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                biến động kèo:
                                <select
                                    value={selectedTimeRun}
                                    onChange={(e) => setSelectedTimeRun(e.target.value)}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="3">3H</option>
                                    <option value="6">6H</option>
                                    <option value="12">12H</option>
                                    <option value="24">1 Ngày</option>
                                    <option value="48">2 Ngày</option>
                                    <option value="52">3 Ngày</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                Biến động Handicap:
                                <select
                                    value={selectedHandicap}
                                    onChange={(e) => setSelectedHandicap(e.target.value)}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="0.25">0.25</option>
                                    <option value="0.5">0.5</option>
                                    <option value="0.75">0.75</option>
                                    <option value="1">1</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div style={{ textAlign: 'center' }}>
                            <label>
                                <button
                                    onClick={handleChuan1}
                                    style={{ ...style.button }}
                                >Chuẩn</button>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                Biến động Tài/Xỉu:
                                <select
                                    value={selectedOver}
                                    onChange={(e) => setSelectedOver(e.target.value)}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="0.25">0.25</option>
                                    <option value="0.5">0.5</option>
                                    <option value="0.75">0.75</option>
                                    <option value="1">1</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                <button
                                    onClick={handleChuan2}
                                    style={{ ...style.button }}
                                >Chuẩn</button>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div>
                            <label>
                                <button
                                    onClick={handleReset}
                                    style={{ ...style.button }}
                                >Reset</button>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                Đội kèo trên:
                                <select
                                    value={selectedTeamUp}
                                    onChange={(e) => setSelectedTeamUp(e.target.value)}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="home">Home</option>
                                    <option value="away">Away</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                Biến động Odds Handicap:
                                <select
                                    value={selectedOddHandicap}
                                    onChange={(e) => setSelectedOddHandicap(e.target.value)}
                                    disabled={selectedHandicap ? "" : "disabled"}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="0.05">0.05</option>
                                    <option value="0.10">0.10</option>
                                    <option value="0.15">0.15</option>
                                    <option value="0.20">0.20</option>
                                    <option value="giamgia">Giảm giá</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                Biến động Odds Tài/Xỉu :
                                <select
                                    value={selectedOddOver}
                                    onChange={(e) => setSelectedOddOver(e.target.value)}
                                    disabled={selectedOver ? "" : "disabled"}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="0.05">0.05</option>
                                    <option value="0.10">0.10</option>
                                    <option value="0.15">0.15</option>
                                    <option value="0.20">0.20</option>
                                    <option value="giamgia">Giảm giá</option>
                                </select>
                            </label>
                        </div>
                    </Grid>

                </Grid>
            </Box>
            {/* statusRedux={statusRedux} odds={odds} selectedOddHandicap={selectedOddHandicap} selectedHandicap={selectedHandicap} selectedOddOver={selectedOddOver} selectedOver={selectedOver} selectedTeamUp={selectedTeamUp} */}
            <TableContent
                schedule={schedule}
                odds={odds}
                oddHistory={oddHistory}
                schedulesEmit={schedulesEmit}
                selectedOddHandicap={selectedOddHandicap}
                selectedHandicap={selectedHandicap}
                selectedOddOver={selectedOddOver}
                selectedOver={selectedOver}
                selectedTeamUp={selectedTeamUp}
                selectedDate={selectedDate}
            />
        </React.Fragment>
    );
};

export default ToolTaiXiu1;
// , odds, selectedHandicap, selectedOddHandicap, selectedOddOver, selectedOver, statusRedux, selectedTeamUp
const TableContent = ({
    schedule,
    odds,
    oddHistory,
    schedulesEmit,
    selectedOddHandicap,
    selectedHandicap,
    selectedOddOver,
    selectedOver,
    selectedTeamUp,
    selectedDate
}) => {
    const sortedMatches = useMemo(() => {
        return schedule.data.sort((a, b) => {
            const timeA = new Date(a.MATCH_TIME);
            const timeB = new Date(b.MATCH_TIME);
            return timeA - timeB;
        });
    }, [schedule.data]);

    const isMatchValid = (e, oddsItem, selectedTeamUp) => {
        if (!oddsItem) return false;
        const status = e?.$?.STATUS;
        if (status && (status >= "0" && status <= "5")) {
            const item = oddsItem;
            if (item?.hasOwnProperty('$') && item?.$?.handicap && item?.$?.overUnder) {
                let checkTeamUp = "";

                const handicap = JSON.parse(item?.$?.handicap);
                const checkHome = ((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) : (-handicap?.INSTANT_HANDICAP) ? `me_color` : "");
                const checkAway = ((handicap?.INSTANT_HANDICAP) < 0 ? (handicap?.INSTANT_HANDICAP) ? `me_color` : "" : (handicap?.INSTANT_HANDICAP));

                if (selectedTeamUp === 'home') {
                    checkTeamUp = checkHome === 'me_color';
                } else if (selectedTeamUp === 'away') {
                    checkTeamUp = checkAway === 'me_color';
                }

                return (checkTeamUp !== "" ? checkTeamUp : {});
            }
        }
        return false;
    };


    return (
        <table className="dntable-list -td-0 table table-hover table-striped table-bordered align-middle">
            <thead>
                <tr>
                    <td rowSpan="2" className="td-time">Time</td>
                    <td rowSpan="2" className="td-league">League</td>
                    <td rowSpan="2" className="td-match">Match</td>
                    <td colSpan="7" className="td-handicap">Kèo Handicap</td>
                    <td colSpan="7" className="td-overunder">Over/Under</td>
                    <td rowSpan="2" className="td-view"></td>
                </tr>
                <tr>
                    <td className="td-handicap-live">Kèo Live</td>
                    <td className="td-handicap-odds-live">Odds Live</td>
                    <td className="td-handicap-slot-open">Kèo Mở</td>
                    <td className="td-handicap-odds-open">Odds Mở</td>
                    <td className="td-handicap-bd-live">Biến động<br />kèo(Live)</td>
                    <td className="td-handicap-odds-bd">Odds<br />biến động</td>
                    <td className="td-handicap-tips">Tips</td>
                    <td className="td-handicap-keo-live">Kèo Live</td>
                    <td className="td-overunder-odds">Odds live</td>
                    <td className="td-overunder-slot-open">Kèo mở</td>
                    <td className="td-overunder-odds">Odds mở</td>
                    <td className="td-overunder-bd-live">Biến động<br />Live</td>
                    <td className="td-overunder-odds-bd">Odds<br />biến động</td>
                    <td className="td-overunder-tip">Tips</td>
                </tr>
            </thead>
            <tbody id="tbody-data" className="tbody-data">
                <React.Fragment>
                    {sortedMatches.filter((match) => match?.$?.STATUS >= 1).map((e) => {
                        const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
                        const matchedOddsItem = oddsItemData?.find(item => {
                            const status = e?.$?.STATUS;

                            if (status && (status === "0" || status === "1" || status === "2" || status === "3" || status === "4" || status === "5")) {
                                if (item?.hasOwnProperty('$') && item?.$?.handicap && item?.$?.overUnder) {
                                    return String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID);
                                }
                            }

                            return false;
                        });

                        const scheduleEmitItemData = schedulesEmit;
                        const matchedScheduleEmitItem = scheduleEmitItemData?.find(item => {
                            const status = e?.$?.STATUS;
                            if (status && (status === "0" || status === "1" || status === "2" || status === "3" || status === "4" || status === "5")) {
                                return String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID);
                            }
                            return false;
                        });

                        const handicapItem = oddHistory?.data?.HANDICAP_ITEM;
                        const matchedHandicapItem = handicapItem?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));

                        const overItem = oddHistory?.data?.OVER_UNDER_ITEM;
                        const matchedOverItem = overItem?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));

                        if (isMatchValid(e, matchedOddsItem, selectedTeamUp)) {
                            return <DataTable
                                key={e.MATCH_ID}
                                e={e?.$}
                                odds={matchedOddsItem}
                                matchedHandicapItem={matchedHandicapItem?.$}
                                matchedOverItem={matchedOverItem?.$}
                                matchedScheduleEmitItem={matchedScheduleEmitItem?.$}
                                selectedTeamUp={selectedTeamUp}
                                selectedHandicap={selectedHandicap}
                                selectedOddHandicap={selectedOddHandicap}
                                selectedOver={selectedOver}
                                selectedOddOver={selectedOddOver}
                            />;
                        }
                        return null;
                    })}

                    {sortedMatches.filter((match) => match?.$?.STATUS <= 0).map((e) => {
                        const oddsItemData = odds.data?.ODDS_DATA?.ODDS_ITEM;
                        const matchedOddsItem = oddsItemData?.find(item => {
                            const status = e?.$?.STATUS;

                            if (status && (status === "0" || status === "1" || status === "2" || status === "3" || status === "4" || status === "5")) {
                                if (item?.hasOwnProperty('$') && item?.$?.handicap && item?.$?.overUnder) {
                                    return String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID);
                                }
                            }

                            return false;
                        });

                        const scheduleEmitItemData = schedulesEmit;
                        const matchedScheduleEmitItem = scheduleEmitItemData?.find(item => {
                            const status = e?.$?.STATUS;
                            if (status && (status === "0" || status === "1" || status === "2" || status === "3" || status === "4" || status === "5")) {
                                return String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID);
                            }
                            return false;
                        });

                        const handicapItem = oddHistory?.data?.HANDICAP_ITEM;
                        const matchedHandicapItem = handicapItem?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));

                        const overItem = oddHistory?.data?.OVER_UNDER_ITEM;
                        const matchedOverItem = overItem?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));

                        if (isMatchValid(e, matchedOddsItem, selectedTeamUp)) {
                            return <DataTable
                                key={e.MATCH_ID}
                                e={e?.$}
                                odds={matchedOddsItem}
                                matchedHandicapItem={matchedHandicapItem?.$}
                                matchedOverItem={matchedOverItem?.$}
                                matchedScheduleEmitItem={matchedScheduleEmitItem?.$}
                                selectedTeamUp={selectedTeamUp}
                                selectedHandicap={selectedHandicap}
                                selectedOddHandicap={selectedOddHandicap}
                                selectedOver={selectedOver}
                                selectedOddOver={selectedOddOver}
                            />;
                        }
                        return null;
                    })}

                </React.Fragment>
            </tbody>
        </table>
    );
};