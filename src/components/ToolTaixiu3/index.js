import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import * as actions from "../../redux/actions";
import {
    scheduleState$,
    oddsState$,
    oddHistoryAllState$,
    analysisAllState$,
    detailAllState$,
    statsAllState$,
} from "../../redux/selectors";
import { DateSelector, funcSelectTimeRun, funcTimeRun, setDate } from "./Functions/DateSelector";
import DataTable from "./DataTable";
import { UTCtoLocalTime, formatNumber } from "../../helpers";
import { fetchDetailMatchAllRT, fetchStatusRT, fetchTimeRunRT } from "../../api";

const ToolTaiXiu3 = () => {
    const dispatch = useDispatch();
    const schedule = useSelector(scheduleState$);
    const odds = useSelector(oddsState$);
    const oddHistory = useSelector(oddHistoryAllState$);
    const analysis = useSelector(analysisAllState$);
    const stats = useSelector(statsAllState$);
    const detail = useSelector(detailAllState$);

    const [newSocket, setSocket] = useState(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const [schedulesEmit, setSchedulesEmit] = useState([]);

    const [selectedDate, setSelectedDate] = useState(setDate);
    const [oddRealTime, setOddRealTime] = useState([]);

    const [selectedGiaChuan, setSelectedGiaChuan] = useState("");
    const [selectedTips, setSelectedTips] = useState(true);
    const [selectedTeamUp, setSelectedTeamUp] = useState("");
    const [selectedTipRun, setSelectedTipRun] = useState("");
    const [selectedFilterTimeRun, setSelectedFilterTimeRun] = useState(85);

    const [selectedOver, setSelectedOver] = useState("");
    const [selectedTime45, setSelectedTime45] = useState();
    const [selectedScoreDraw, setSelectedScoreDraw] = useState();

    const handleTipsCheckboxChange = (e) => {
        setSelectedTips(e.target.checked);
    };

    const handleScoreDrawCheckboxChange = (e) => {
        setSelectedScoreDraw(e.target.checked);
    };

    const handleTime45CheckboxChange = (e) => {
        setSelectedTime45(e.target.checked);
    };

    const handleReset = () => {
        setSelectedTips(false);
        setSelectedTeamUp("");
        setSelectedTipRun("");
        setSelectedFilterTimeRun("");
        setSelectedOver("");
        setSelectedTime45(false);
        setSelectedScoreDraw(false);
        setSelectedGiaChuan("");
    };

    const handleChuan1 = () => {
        setSelectedTips(true);
        setSelectedTipRun("0.5");
        setSelectedFilterTimeRun("85");
        setSelectedTeamUp("");
        setSelectedOver("");
        setSelectedTime45(false);
        setSelectedScoreDraw(false);
    };

    const handleChuan2 = () => {
        setSelectedTipRun("0.5");
        setSelectedOver("1.5");
        setSelectedTime45(true);
        setSelectedScoreDraw(true);
        setSelectedFilterTimeRun("");
        setSelectedTips(true);
        setSelectedTeamUp("");
    };

    useEffect(() => {
        const fetchData = async (date) => {
            await Promise.all([
                dispatch(actions.getSchedules.getSchedulesRequest()),
                dispatch(actions.getOdds.getOddsRequest()),
                dispatch(actions.getOddHistoryAll.getOddHistoryAllRequest()),
                dispatch(actions.getAnalysisAll.getAnalysisAllRequest()),
                dispatch(actions.getStatsAll.getStatsAllRequest()),
                dispatch(actions.getDetailAll.getDetailAllRequest()),
            ]);
        };
        fetchData(selectedDate);
    }, [selectedDate]);

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

    // useEffect(() => {
    //     const rows = document.querySelectorAll("table tr");

    //     for (let i = 0; i < rows.length; i++) {
    //         rows[i].classList.add(i % 2 === 0 ? "even-row" : "odd-row");
    //     }
    // }, [])

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
                        <div>
                            <label style={{ display: 'flex' }}>
                                <span>Lọc Time:</span>
                                <select
                                    value={selectedFilterTimeRun}
                                    onChange={(e) => setSelectedFilterTimeRun(e.target.value)}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="85">Time run {`<=`} 85</option>
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
                                    style={{ margin: '5px 7px' }}
                                />
                                <span>Kèo đâm ngược</span>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                <span>Đội kèo trên:</span>
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
                                <span>Kèo chấp:</span>
                                <select
                                    value={selectedTipRun}
                                    onChange={(e) => setSelectedTipRun(e.target.value)}
                                    style={style.selectTip}
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
                        <div style={{ textAlign: 'center' }}>
                            <label>
                                <button
                                    onClick={handleChuan1}
                                    style={{ ...style.button }}
                                >Chuẩn đâm ngược</button>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div >
                            <label>
                                <button
                                    onClick={handleReset}
                                    style={{ ...style.button, padding: '7px 15px' }}
                                >Reset</button>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex' }}>
                                <span style={{ marginRight: '13px' }}>Lọc giá:</span>
                                <select
                                    value={selectedGiaChuan}
                                    onChange={(e) => setSelectedGiaChuan(e.target.value)}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="0.12">Lọc giá {`<=`} 0.12</option>
                                    <option value="0.14">Lọc giá {`<=`} 0.14</option>
                                    <option value="0.16">Lọc giá {`<=`} 0.16</option>
                                </select>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTime45}
                                    onChange={handleTime45CheckboxChange}
                                    style={{ margin: '5px 7px' }}
                                />
                                <span>Time run {`>=`} 45</span>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedScoreDraw}
                                    onChange={handleScoreDrawCheckboxChange}
                                    style={{ margin: '5px 7px' }}
                                />
                                <span>Lọc tỉ số hòa</span>
                            </label>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>kèo Over:</span>
                                <select
                                    value={selectedOver}
                                    onChange={(e) => setSelectedOver(e.target.value)}
                                    style={style.selectTip}
                                >
                                    <option value="">All</option>
                                    <option value="1.5">kèo Over {`>=`} 1.5</option>
                                    <option value="2">kèo Over {`>=`} 2</option>
                                    <option value="2.5">kèo Over {`>=`} 2.5</option>
                                    <option value="3">kèo Over {`>=`} 3</option>
                                </select>
                            </label>
                        </div>
                    </Grid>

                    <Grid item xs={2}>
                        <div style={{ textAlign: 'center' }}>
                            <label>
                                <button
                                    onClick={handleChuan2}
                                    style={{ ...style.button, width: '132px', }}
                                >Chuẩn kèo run</button>
                            </label>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <TableContent
                schedule={schedule}
                odds={odds}
                oddHistory={oddHistory}
                analysis={analysis}
                detail={detail}
                stats={stats}
                schedulesEmit={schedulesEmit}
                selectedTips={selectedTips}
                selectedTeamUp={selectedTeamUp}
                selectedTipRun={selectedTipRun}
                selectedFilterTimeRun={selectedFilterTimeRun}
                selectedOver={selectedOver}
                selectedTime45={selectedTime45}
                selectedScoreDraw={selectedScoreDraw}
                selectedGiaChuan={selectedGiaChuan}
            />
        </React.Fragment >
    );
};

export default ToolTaiXiu3;

const TableContent = ({
    schedule,
    odds,
    oddHistory,
    analysis,
    detail,
    stats,
    schedulesEmit,
    selectedTips,
    selectedTeamUp,
    selectedTipRun,
    selectedFilterTimeRun,
    selectedOver,
    selectedTime45,
    selectedScoreDraw,
    selectedGiaChuan
}) => {
    const oddsItemData = useMemo(() => odds.data?.ODDS_DATA?.ODDS_ITEM, [odds.data]);

    const sortedMatches = useMemo(() => {
        if (schedule.data) {
            return [...schedule.data].sort((a, b) => new Date(a.MATCH_TIME) - new Date(b.MATCH_TIME));
        }
        return [];
    }, [schedule.data]);

    const isMatchValid = (matchedScheduleEmitItem, oddsItem, selectedFilterTimeRun, selectedTime45, selectedOver, selectedScoreDraw, selectedTeamUp, selectedTips, selectedTipRun, selectedGiaChuan) => {
        if (!oddsItem) return false;
        const status = matchedScheduleEmitItem?.$?.STATUS;
        if (status && (status >= "0" && status <= "5")) {

            const matchTime = new Date(matchedScheduleEmitItem?.$?.HALF_START_TIME * 1000);
            matchTime.setHours(matchTime.getHours() + 7);
            const newTimestamp = matchTime.getTime() / 1000;
            const timerun = funcSelectTimeRun(matchedScheduleEmitItem?.$?.STATUS, newTimestamp);

            const item = oddsItem;

            if (item?.hasOwnProperty('$') && item?.$?.handicap && item?.$?.overUnder) {
                let checkTeamUp = "";
                // let checkTip = "";
                // let checkOdds = "";

                const over = JSON.parse(item?.$?.overUnder);
                const handicap = JSON.parse(item?.$?.handicap);
                const checkHome = ((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) : (-handicap?.INSTANT_HANDICAP) ? `me_color` : "");
                const checkAway = ((handicap?.INSTANT_HANDICAP) < 0 ? (handicap?.INSTANT_HANDICAP) ? `me_color` : "" : (handicap?.INSTANT_HANDICAP));

                const giachuan = parseInt(2) - (parseFloat(handicap?.INSTANT_HOME) + parseFloat(handicap?.INSTANT_AWAY));
                const totalGiaChuan = Math.abs(giachuan);
                const roundedTotal = parseFloat(totalGiaChuan.toFixed(2));

                // const tipsHome = (parseInt(matchedScheduleEmitItem?.$?.HOME_SCORE) < parseInt(matchedScheduleEmitItem?.$?.AWAY_SCORE));
                // const tipsAway = (parseInt(matchedScheduleEmitItem?.$?.HOME_SCORE) > parseInt(matchedScheduleEmitItem?.$?.AWAY_SCORE));

                // const oddHome = parseFloat(handicap.INSTANT_HANDICAP) < 0 ? "" : parseFloat(handicap.INSTANT_HANDICAP);
                // const oddAway = parseFloat(handicap.INSTANT_HANDICAP) < 0 ? parseFloat(-handicap.INSTANT_HANDICAP) : "";

                const result = (parseFloat(matchedScheduleEmitItem?.$?.HOME_SCORE) + parseFloat(matchedScheduleEmitItem?.$?.AWAY_SCORE)) - parseFloat(over?.INSTANT_HANDICAP);
                const total = Math.abs(result);
                const timerunCheck = !selectedFilterTimeRun || timerun <= parseInt(selectedFilterTimeRun, 10);
                const time45Check = !selectedTime45 || timerun >= 45;
                const overCheck = !selectedOver || parseFloat(total) >= parseFloat(selectedOver);
                const giaChuanCheck = !selectedGiaChuan || roundedTotal <= parseFloat(selectedGiaChuan);
                // const scoreDrawCheck = !selectedScoreDraw || matchedScheduleEmitItem?.$?.HOME_SCORE === matchedScheduleEmitItem?.$?.AWAY_SCORE;

                if (selectedTeamUp === 'home') {
                    checkTeamUp = checkHome === 'me_color';
                } else if (selectedTeamUp === 'away') {
                    checkTeamUp = checkAway === 'me_color';
                }


                // if (selectedTips) {
                //     if (checkHome === 'me_color') {
                //         checkTip = tipsHome;
                //     } else if (checkAway === 'me_color') {
                //         checkTip = tipsAway;
                //     }
                // }

                // if (selectedTipRun) {
                //     if (checkHome === 'me_color') {
                //         if (parseFloat(handicap.INSTANT_HANDICAP < 0 ? "" : handicap.INSTANT_HANDICAP) >= parseFloat(selectedTipRun)) {
                //             if (oddHome !== "") {
                //                 checkOdds = oddHome;
                //             }
                //         }
                //     } else if (checkAway === 'me_color') {
                //         if (parseFloat(handicap.INSTANT_HANDICAP < 0 ? -handicap.INSTANT_HANDICAP : "") >= parseFloat(selectedTipRun)) {
                //             if (oddAway !== "") {
                //                 checkOdds = oddAway;
                //             }
                //         }
                //     }
                // }

                return timerunCheck && time45Check && overCheck && (checkTeamUp !== "" ? checkTeamUp : {}) && giaChuanCheck; // && scoreDrawCheck && (checkTip !== "" ? checkTip : {}) && (checkOdds !== "" ? checkOdds : {})

            }

        }
        return false;
    };

    return (
        <table className="tooltaixiu3 dntable-list -td-0 table table-hover table-striped table-bordered align-middle">
            <thead>
                <tr>
                    {/* <td rowSpan="2" className="td-time">Time</td> */}
                    <td rowSpan="2" className="td-match">Time</td>
                    <td rowSpan="2" className="td-league">League</td>
                    <td rowSpan="2" className="td-match">Match</td>
                    <td rowSpan="2" className="td-match">Score</td>
                    <td colSpan="2" className="td-handicap">Kèo Handicap (Run)</td>
                    <td colSpan="2" className="td-overunder">Over/Under (Run)</td>
                    <td rowSpan="2">Tips</td>
                    <td rowSpan="2"></td>
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
                        const matchedOddsItem = oddsItemData?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));
                        const matchedScheduleEmitItem = schedulesEmit?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));
                        const matchedHandicapItem = oddHistory?.data?.HANDICAP_ITEM?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));
                        const matchedOverItem = oddHistory?.data?.OVER_UNDER_ITEM?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));
                        const matchedAnalysisItem = analysis?.data?.ANALYSIS_DATA?.ANALYSIS_ITEM?.find(item => String(item?.MATCH_ID[0]) === String(e?.$?.MATCH_ID));
                        const matchedDetailItem = detail?.data?.DETAIL_DATA?.DETAIL_ITEM?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));
                        const matchedStatItem = stats?.data?.STATS_DATA?.STATS_ITEM?.find(item => String(item?.$?.MATCH_ID) === String(e?.$?.MATCH_ID));

                        if (isMatchValid(matchedScheduleEmitItem, matchedOddsItem, selectedFilterTimeRun, selectedTime45, selectedOver, selectedScoreDraw, selectedTeamUp, selectedTips, selectedTipRun, selectedGiaChuan)) {
                            return (
                                <DataTable
                                    key={e?.MATCH_ID}
                                    e={e?.$}
                                    odds={matchedOddsItem}
                                    matchedHandicapItem={matchedHandicapItem?.$}
                                    matchedOverItem={matchedOverItem?.$}
                                    matchedScheduleEmitItem={matchedScheduleEmitItem?.$}
                                    matchedAnalysisItem={matchedAnalysisItem}
                                    matchedStatItem={matchedStatItem}
                                    matchedDetailItem={matchedDetailItem}
                                    selectedTips={selectedTips}
                                    selectedTeamUp={selectedTeamUp}
                                    selectedTipRun={selectedTipRun}
                                    selectedFilterTimeRun={selectedFilterTimeRun}
                                    selectedOver={selectedOver}
                                    selectedTime45={selectedTime45}
                                    selectedScoreDraw={selectedScoreDraw}
                                    selectedGiaChuan={selectedGiaChuan}
                                />
                            );
                        }
                        return null;
                    })}

                </React.Fragment>
            </tbody>
        </table>
    );
};

