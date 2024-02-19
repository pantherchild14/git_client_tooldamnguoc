import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../redux/actions";
import { UTCtoLocalTime, formatNumber } from "../../../helpers";
import { INIT_STATE } from "../../../constant";
import DetailModal from "./Modal";
import ModalStarStatics from "./ModalStarStatics";
import { analysisState$, detailState$, statsState$ } from "../../../redux/selectors";
import { europeFunc, funcTimeRun, handicapFunc } from "../Functions/DateSelector";

import { Button } from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

import Rating from '@mui/material/Rating';



const DataTable = (props) => {
    const { e,
        odds,
        matchedHandicapItem,
        matchedOverItem,
        matchedScheduleEmitItem,
        matchedStatItem,
        matchedDetailItem,
        selectedTips,
        selectedTeamUp,
        selectedTipRun,
        selectedFilterTimeRun,
        matchedAnalysisItem,
        selectedOver,
        selectedTime45,
        selectedScoreDraw,
    } = props;

    const dispatch = useDispatch();
    const [tipOU, setTipOU] = useState("");
    const [tipStar, setTipStar] = useState("");
    const [oddTipOU, setOddTipOU] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openStar, setOpenStar] = React.useState(false);
    const analysisRedux = useSelector(analysisState$);
    const detailRedux = useSelector(detailState$);
    const statsRedux = useSelector(statsState$);
    const isLocalTimeZone = localStorage.getItem('TIME_ZONE')

    // set value star 
    const [value, setValue] = React.useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        dispatch(actions.getAnalysis.clearAnalysis());
        dispatch(actions.getDetail.clearDetail());
        dispatch(actions.getStats.clearStats());
        setOpen(false);
    };
    const handleViewClick = () => {
        dispatch(actions.getAnalysis.getAnalysisRequest(e.MATCH_ID));
        dispatch(actions.getDetail.getDetailRequest(e.MATCH_ID));
        dispatch(actions.getStats.getStatsRequest(e.MATCH_ID));
        handleOpen();
    };

    // const handleStarOpen = () => setOpenStar(true);
    // const handleStarClose = () => {
    //     dispatch(actions.getAnalysis.clearAnalysis());
    //     dispatch(actions.getDetail.clearDetail());
    //     dispatch(actions.getStats.clearStats());
    //     setOpenStar(false);
    // };
    // const handleViewStarClick = () => {
    //     dispatch(actions.getAnalysis.getAnalysisRequest(e.MATCH_ID));
    //     dispatch(actions.getDetail.getDetailRequest(e.MATCH_ID));
    //     dispatch(actions.getStats.getStatsRequest(e.MATCH_ID));
    //     handleStarOpen();
    // };

    const handleViewClickButton = () => {
        let params = '';

        if (tipOU !== '') {
            if (params !== '') {
                params += '&';
            }
            params += `run=${tipOU}`;
        }

        const newUrl = `/match/${e.MATCH_ID}${params !== '' ? `?${params}` : ''}`;
        window.open(newUrl, '_blank');
    };

    const handleLinkNowgGoal = () => {
        const newUrl = `${INIT_STATE.nowgoal.url}${e.MATCH_ID}`;
        window.open(newUrl, '_blank');
    };

    useEffect(() => {
        const runTip = () => {
            const getOdds = (trElement, nameAttri) => {
                var text = trElement.attributes[`${nameAttri}`].value;
                return text
            }

            const findAttributeTip = (elementId, attributeName, tr) => {
                const element = tr.querySelector(elementId);
                if (element) {
                    const attributeValue = element.getAttribute(attributeName);
                    if (attributeValue !== null) {
                        return (attributeValue);
                    }
                }
                return 0;
            };

            var tr = document.getElementById("tr_" + e.MATCH_ID);

            var checkHome = tr.querySelector(`#home_${e.MATCH_ID}`);
            var checkAway = tr.querySelector(`#away_${e.MATCH_ID}`);

            var scoreHome = tr.querySelector(`#hs${e.MATCH_ID}`).textContent;
            var scoreAway = tr.querySelector(`#gs${e.MATCH_ID}`).textContent;

            var CheckAttriHome = checkHome.getAttribute("class");
            var CheckAttriAway = checkAway.getAttribute("class");

            var odd_handicap = findAttributeTip(`#goalRun_${e.MATCH_ID}`, 'odd_handicap', tr);
            var odd_handicapDemo = findAttributeTip(`#goalRunDemo_${e.MATCH_ID}`, 'odd_handicapdemo', tr);


            let timeRun = tr.querySelector("#ms" + e.MATCH_ID).textContent;
            if (timeRun === "HT" || timeRun === "45+") {
                timeRun = "40";
            } else if (timeRun === "90+") {
                timeRun = "90";
            }
            var tipValue = tr.attributes["tip"].value;
            var teamValue = tr.attributes["team"].value;

            // if (selectedTips === true && selectedTipRun) {
            //     if (tipValue === "tip") {
            //         tr.style.display = 'revert';
            //         if (selectedTipRun) {
            //             if (CheckAttriHome === "me_color") {
            //                 if (odd_handicap >= selectedTipRun) {
            //                     tr.style.display = 'revert';
            //                 } else {
            //                     tr.style.display = 'none';
            //                 }
            //             } else if (CheckAttriAway === "me_color") {
            //                 if (odd_handicapDemo >= selectedTipRun) {
            //                     tr.style.display = 'revert';
            //                 } else {
            //                     tr.style.display = 'none';
            //                 }
            //             } else if (CheckAttriHome !== "me_color" && CheckAttriHome !== "me_color") {
            //                 tr.style.display = 'none';
            //             }
            //         }

            //     } else {
            //         tr.style.display = 'none';
            //     }
            // } else if (selectedTips === true) {
            //     if (tipValue === "tip") {
            //         tr.style.display = 'revert';
            //     } else {
            //         tr.style.display = 'none';
            //     }
            // } else if (selectedTipRun) {
            //     if (CheckAttriHome === "me_color") {
            //         if (odd_handicap >= selectedTipRun) {
            //             tr.style.display = 'revert';
            //         } else {
            //             tr.style.display = 'none';
            //         }
            //     } else if (CheckAttriAway === "me_color") {
            //         if (odd_handicapDemo >= selectedTipRun) {
            //             tr.style.display = 'revert';
            //         } else {
            //             tr.style.display = 'none';
            //         }
            //     } else if (CheckAttriHome !== "me_color" && CheckAttriHome !== "me_color") {
            //         tr.style.display = 'none';
            //     }
            // }

            if (selectedTips === true && selectedScoreDraw && selectedTipRun) {
                if (tipValue === "tip") {
                    tr.style.display = 'revert';
                    if (selectedTipRun) {
                        if (CheckAttriHome === "me_color") {
                            if (odd_handicap >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriAway === "me_color") {
                            if (odd_handicapDemo >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriHome !== "me_color" && CheckAttriHome !== "me_color") {
                            tr.style.display = 'none';
                        }
                    }
                } else if (scoreHome === scoreAway) {
                    tr.style.display = 'revert';
                    if (selectedTipRun) {
                        if (CheckAttriHome === "me_color") {
                            if (odd_handicap >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriAway === "me_color") {
                            if (odd_handicapDemo >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriHome !== "me_color" && CheckAttriHome !== "me_color") {
                            tr.style.display = 'none';
                        }
                    }
                } else {
                    tr.style.display = 'none';
                }
            } else if (selectedTips === true && selectedScoreDraw) {
                if (tipValue === "tip") {
                    tr.style.display = 'revert';
                } else if (scoreHome === scoreAway) {
                    tr.style.display = 'revert';
                } else {
                    tr.style.display = 'none';
                }
            } else if (selectedTips === true && selectedTipRun) {
                if (tipValue === "tip") {
                    tr.style.display = 'revert';
                    if (selectedTipRun) {
                        if (CheckAttriHome === "me_color") {
                            if (odd_handicap >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriAway === "me_color") {
                            if (odd_handicapDemo >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriHome !== "me_color" && CheckAttriHome !== "me_color") {
                            tr.style.display = 'none';
                        }
                    }

                } else {
                    tr.style.display = 'none';
                }
            } else if (selectedScoreDraw && selectedTipRun) {
                if (scoreHome === scoreAway) {
                    tr.style.display = 'revert';
                    if (selectedTipRun) {
                        if (CheckAttriHome === "me_color") {
                            if (odd_handicap >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriAway === "me_color") {
                            if (odd_handicapDemo >= selectedTipRun) {
                                tr.style.display = 'revert';
                            } else {
                                tr.style.display = 'none';
                            }
                        } else if (CheckAttriHome !== "me_color" && CheckAttriHome !== "me_color") {
                            tr.style.display = 'none';
                        }
                    }
                } else {
                    tr.style.display = 'none';
                }
            } else if (selectedTips === true) {
                if (tipValue === "tip") {
                    tr.style.display = 'revert';
                } else {
                    tr.style.display = 'none';
                }
            } else if (selectedScoreDraw) {
                if (scoreHome === scoreAway) {
                    tr.style.display = 'revert';
                } else {
                    tr.style.display = 'none';
                }
            } else if (selectedTipRun) {
                if (CheckAttriHome === "me_color") {
                    if (odd_handicap >= selectedTipRun) {
                        tr.style.display = 'revert';
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (CheckAttriAway === "me_color") {
                    if (odd_handicapDemo >= selectedTipRun) {
                        tr.style.display = 'revert';
                    } else {
                        tr.style.display = 'none';
                    }
                } else if (CheckAttriHome !== "me_color" && CheckAttriHome !== "me_color") {
                    tr.style.display = 'none';
                }
            } else if (selectedTips === false) { // && selectedTipRun === "" && selectedScoreDraw === false
                tr.style.display = 'revert';
            }





            const rowsWithTip = document.querySelectorAll('tr[tip="tip"]');
            let isEven = true;
            for (const row of rowsWithTip) {
                if (row) {
                    if (selectedTips === true) {
                        if (isEven) {
                            row.classList.add("even_row");
                            row.classList.remove("odd_row");
                        } else {
                            row.classList.remove("even_row");
                            row.classList.add("odd_row");
                        }
                    } else {
                        row.classList.remove("even_row");
                        row.classList.remove("odd_row");
                    }
                    isEven = !isEven;
                }
            }
        }

        runTip();
        const intervalIdOdds = setInterval(runTip, 3000);

        return () => {
            clearInterval(intervalIdOdds);
        };

    }, [selectedTipRun, selectedTips, selectedScoreDraw])



    useEffect(() => {
        const sreachOdd = (elementId, tr) => {
            const element = tr.querySelector(elementId);
            if (element) {
                const textContent = element.textContent;
                if (textContent !== null) {
                    return parseFloat(textContent);
                }
            }
            return 0;
        };

        const sreachScore = (elementId, tr) => {
            const element = tr.querySelector(elementId);
            if (element) {
                let textContent = element.textContent;

                textContent = textContent.replace(/\[.*\]/, '');

                textContent = textContent.trim();

                return textContent;
            }
            return 0;
        };

        const findAttribute = (elementId, attributeName, tr) => {
            const element = tr.querySelector(elementId);
            if (element) {
                const attributeValue = element.getAttribute(attributeName);
                if (attributeValue !== null) {
                    return parseFloat(attributeValue);
                }
            }
            return 0;
        };

        const findAttributeTip = (elementId, attributeName, tr) => {
            const element = tr.querySelector(elementId);
            if (element) {
                const attributeValue = element.getAttribute(attributeName);
                if (attributeValue !== null) {
                    return (attributeValue);
                }
            }
            return 0;
        };


        const insertData = (tr, data) => {
            const {
                elementId_positive,
                sumData_positive,
                elementId_minus,
                sumData_minus,
                tipOU,
                homeScore,
                awayScore,
                oddOU,
                oddOUHome,
                oddOUAway,
                homeName,
                awayName,
                checkKeoChapHome,
                checkKeoChapAway } = data;
            const insertElement_positive = tr.querySelector(elementId_positive);
            const insertElement_minus = tr.querySelector(elementId_minus);
            const insertTipsOU = tr.querySelector(tipOU);

            if (insertElement_positive) {
                let iconColor = 'transparent';
                let icon = '';
                let absSumData = '0';

                if (sumData_positive > 0) {
                    iconColor = 'green';
                    icon = '▲';
                } else if (sumData_positive < 0) {
                    iconColor = 'red';
                    icon = '▼';
                }
                if (!isNaN(sumData_positive)) {
                    absSumData = Math.abs(sumData_positive).toFixed(2);
                } else {
                    absSumData = "";
                }


                const iconElement = document.createElement('span');
                iconElement.style.color = iconColor;
                iconElement.textContent = icon;

                const absSumDataText = document.createTextNode(absSumData !== "" ? parseFloat(absSumData).toString() : "");

                insertElement_positive.innerHTML = '';
                insertElement_positive.appendChild(absSumDataText);

                if (icon !== '') {
                    insertElement_positive.appendChild(iconElement);
                }

            }

            if (insertElement_minus) {
                let iconColor = 'transparent';
                let icon = '';
                let absSumData = '0';

                if (sumData_minus < 0) {
                    iconColor = 'green';
                    icon = '▲';
                } else if (sumData_minus > 0) {
                    iconColor = 'red';
                    icon = '▼';
                }

                if (sumData_minus !== 0 || sumData_positive !== "") {
                    absSumData = Math.abs(sumData_minus).toFixed(2);
                } else {
                    absSumData = "-"
                }

                const iconElement = document.createElement('span');
                iconElement.style.color = iconColor;
                iconElement.textContent = icon;

                const absSumDataText = document.createTextNode(parseFloat(absSumData).toString());

                insertElement_minus.innerHTML = '';
                insertElement_minus.appendChild(absSumDataText);

                if (icon !== '') {
                    insertElement_minus.appendChild(iconElement);
                }
            }

            if (insertTipsOU) {
                let h2h = matchedAnalysisItem?.HEADTOHEAD;
                let home = matchedAnalysisItem?.HOME_LAST_MATCH;
                let away = matchedAnalysisItem?.AWAY_LAST_MATCH;

                let countH2H = 0;
                let countPlayHorA = 0;
                let coutPossessionBall = 0;
                let coutShotBall = 0;
                let coutRedCardBall = 0;
                let coutCorrnerBall = 0;

                let coutDangerousAttackBall = 0;

                let checkTip = '';
                let checkStarTip = '';
                let oddsTip = '';
                if (checkKeoChapHome === "me_color") {
                    if (homeScore < awayScore) {
                        checkTip = `${homeName} - ${oddOUHome > 0 ? oddOUHome : -oddOUHome}`;
                        checkStarTip = `${homeName}`;
                        oddsTip = oddOUHome;
                        /*********************************************************************** */
                        if (matchedAnalysisItem) {
                            if (h2h[0]) {
                                const h2hCount = h2h[0].HEADTOHEAD.slice(0, 3).reduce((count, jsonStr) => {
                                    const dataArray = jsonStr.split(',');
                                    const handicaps = europeFunc(dataArray[8], dataArray[9], dataArray[4], dataArray[6], e.HOME_NAME)

                                    if (handicaps === 'W') {
                                        return count + 1;
                                    }
                                    return count;
                                }, 0)
                                if (h2hCount >= 2) {
                                    countH2H++;
                                }
                            }
                            if (home[0]) {
                                // const allMatchesHome = home[0].HOME_LAST_MATCH.filter(jsonStr => {
                                //     const dataArray = jsonStr.split(',');
                                //     return dataArray[4] === e.HOME_NAME;
                                // });
                                const first3FilteredData = home[0].HOME_LAST_MATCH.slice(0, 3);

                                const winCountHome = first3FilteredData.reduce((count, jsonStr, index) => {
                                    const dataArray = jsonStr.split(',');
                                    const handicaps = europeFunc(dataArray[8], dataArray[9], dataArray[4], dataArray[6], e.HOME_NAME);
                                    if (handicaps === 'W') {
                                        return count + 1;
                                    }
                                    return count;
                                }, 0);

                                if (winCountHome >= 2) {
                                    countPlayHorA++;
                                }

                            }

                        }
                        if (matchedStatItem) {
                            const stat = JSON.parse(matchedStatItem?.$?.STATS);
                            {
                                stat.map((row, index) => {

                                    const homeValue = parseFloat(row.home.replace('%', ''));
                                    // const coutRedCart = row.type === 13 ? (parseInt(row.home) < parseInt(row.away) ? 1 : 0) : 0;
                                    const countPossesBall = row.type === 14 ? (homeValue >= '60' ? 1 : 0) : 0;
                                    const coutShot = row.type === 3 ? (parseInt(row.home) > parseInt(row.away) ? 1 : 0) : 0;
                                    const coutCorrner = row.type === 6 ? (parseInt(row.home) > parseInt(row.away) ? 1 : 0) : 0;
                                    const coutDangerousAttack = row.type === 44 ? (parseInt(row.home) > parseInt(row.away) ? 1 : 0) : 0;
                                    if (countPossesBall) {
                                        coutPossessionBall++;
                                    }
                                    // if (coutRedCart) {
                                    //     coutRedCardBall++
                                    // }
                                    if (coutShot) {
                                        coutShotBall++
                                    }
                                    if (coutCorrner) {
                                        coutCorrnerBall++
                                    }

                                    if (coutDangerousAttack) {
                                        coutDangerousAttackBall++
                                    }
                                })
                            }

                        }
                    }
                } else if (checkKeoChapAway === "me_color") {
                    if (homeScore > awayScore) {
                        checkStarTip = `${awayName}`;
                        checkTip = `${awayName} - ${oddOUAway > 0 ? oddOUAway : -oddOUAway}`;
                        oddsTip = oddOUAway;

                        /*********************************************************************** */
                        if (matchedAnalysisItem) {
                            if (h2h[0]) {
                                const h2hCount = h2h[0].HEADTOHEAD.slice(0, 3).reduce((count, jsonStr) => {
                                    const dataArray = jsonStr.split(',');
                                    const handicaps = europeFunc(dataArray[8], dataArray[9], dataArray[4], dataArray[6], e.AWAY_NAME)

                                    if (handicaps === 'W') {
                                        return count + 1;
                                    }
                                    return count;
                                }, 0)

                                if (h2hCount >= 2) {
                                    countH2H++;
                                }
                            }
                            if (away[0]) {
                                // const allMatchesAway = away[0].AWAY_LAST_MATCH.filter(jsonStr => {
                                //     const dataArray = jsonStr.split(',');
                                //     return dataArray[6] === e.AWAY_NAME;
                                // });
                                const first3FilteredData = away[0].AWAY_LAST_MATCH.slice(0, 3);
                                const winCountAway = first3FilteredData.reduce((count, jsonStr, index) => {
                                    const dataArray = jsonStr.split(',');
                                    const handicaps = europeFunc(dataArray[8], dataArray[9], dataArray[4], dataArray[6], e.AWAY_NAME);
                                    if (handicaps === 'W') {
                                        return count + 1;
                                    }
                                    return count;
                                }, 0);

                                if (winCountAway >= 2) {
                                    countPlayHorA++;
                                }
                            }

                        }
                        if (matchedStatItem) {
                            const stat = JSON.parse(matchedStatItem?.$?.STATS);
                            {
                                stat.map((row, index) => {
                                    const awayValue = parseFloat(row.away.replace('%', ''));
                                    // const coutRedCart = row.type === 13 ? (parseInt(row.home) > parseInt(row.away) ? 1 : 0) : 0;
                                    const countPossesBall = row.type === 14 ? (awayValue > '60' ? 1 : 0) : 0;
                                    const coutShot = row.type === 3 ? (parseInt(row.home) < parseInt(row.away) ? 1 : 0) : 0;
                                    const coutCorrner = row.type === 6 ? (parseInt(row.home) < parseInt(row.away) ? 1 : 0) : 0;
                                    const coutDangerousAttack = row.type === 44 ? (parseInt(row.home) < parseInt(row.away) ? 1 : 0) : 0;
                                    if (countPossesBall) {
                                        coutPossessionBall++;
                                    }
                                    // if (coutRedCart) {
                                    //     coutRedCardBall++
                                    // }
                                    if (coutShot) {
                                        coutShotBall++
                                    }
                                    if (coutCorrner) {
                                        coutCorrnerBall++
                                    }

                                    if (coutDangerousAttack) {
                                        coutDangerousAttackBall++
                                    }
                                })
                            }
                        }

                    }
                }
                insertTipsOU.innerHTML = checkTip;
                setTipStar(checkStarTip)
                setTipOU(checkTip)
                setOddTipOU(oddsTip);
                // setValue(countH2H + countPlayHorA + coutShotBall + coutRedCardBall + coutPossessionBall + coutCorrnerBall);
                setValue(countH2H + coutDangerousAttackBall + coutShotBall + coutPossessionBall + coutCorrnerBall);
            }
        };

        const Odd = async () => {
            const tr = document.getElementById("tr_" + e.MATCH_ID);
            let checkTip = '';
            if (tr !== null) {
                const dataToInsert = [
                    {
                        elementIdGoal: `#goal_${e.MATCH_ID}`,
                        liveElementIdGoalLive: `#goalLive_${e.MATCH_ID}`
                    },
                    {
                        elementId_positive: `#insertGoal_${e.MATCH_ID}`,
                        // sumData_positive: await sreachOdd(`#goalEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_${e.MATCH_ID}`, tr),
                        sumData_positive: await findAttribute(`#goalEarly_${e.MATCH_ID}`, "odd_goal", tr) - await findAttribute(`#goal_${e.MATCH_ID}`, "odd_goal", tr),

                    },
                    {
                        elementId_positive: `#insertGoalLive_${e.MATCH_ID}`,
                        // sumData_positive: await sreachOdd(`#goalEarlyLive_${e.MATCH_ID}`, tr) - await sreachOdd(`#goalLive_${e.MATCH_ID}`, tr),
                        sumData_positive: await findAttribute(`#goalEarlyLive_${e.MATCH_ID}`, "odd_goallive", tr) - await findAttribute(`#goalLive_${e.MATCH_ID}`, "odd_goallive", tr),
                    },
                    {
                        elementId_minus: `#insertUpOdd_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#upoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertDownOdd_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#downoddsEarly_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_${e.MATCH_ID}`, tr),
                    },
                    /* Over/Under */
                    {
                        // elementId_positive: `#insertGoal_t1_${e.MATCH_ID}`,
                        // sumData_positive: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                        // checkTipsData: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),

                        elementId_minus: `#insertGoal_t1_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#goalEarly_t1_${e.MATCH_ID}`, tr) - await sreachOdd(`#goal_t1_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertUpodds_t_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#upoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#upodds_t_${e.MATCH_ID}`, tr),
                    },
                    {
                        elementId_minus: `#insertDownodds_t_${e.MATCH_ID}`,
                        sumData_minus: await sreachOdd(`#downoddsEarly_t_${e.MATCH_ID}`, tr) - await sreachOdd(`#downodds_t_${e.MATCH_ID}`, tr),
                    },
                    {
                        tipOU: `#tipOU_${e.MATCH_ID}`,
                        oddOU: await sreachScore(`#goalRun_${e.MATCH_ID}`, tr),
                        oddOUHome: await findAttributeTip(`#goalRun_${e.MATCH_ID}`, "odd_handicap", tr),
                        oddOUAway: await findAttributeTip(`#goalRunDemo_${e.MATCH_ID}`, "odd_handicapdemo", tr),
                        homeScore: await sreachScore(`#hs${e.MATCH_ID}`, tr),
                        awayScore: await sreachScore(`#gs${e.MATCH_ID}`, tr),
                        homeName: await sreachScore(`#home_${e.MATCH_ID}`, tr),
                        awayName: await sreachScore(`#away_${e.MATCH_ID}`, tr),
                        checkKeoChapHome: await findAttributeTip(`#home_${e.MATCH_ID}`, "class", tr),
                        checkKeoChapAway: await findAttributeTip(`#away_${e.MATCH_ID}`, "class", tr),

                    }
                ];

                for (const data of dataToInsert) {
                    await insertData(tr, data);
                }
            }
        }

        Odd();
        const intervalIdOdds = setInterval(Odd, 5000);

        return () => {
            clearInterval(intervalIdOdds);
        };

    }, [matchedAnalysisItem, matchedStatItem]);

    // odd 
    const oddsKeys = ['handicap', 'europe', 'overUnder'];
    const parseJSON = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            return {};
        }
    };


    const parsedOdds = oddsKeys.reduce((acc, key) => {
        if (odds && odds.$ && odds.$[key]) {
            acc[key] = parseJSON(odds.$[key]);
        }
        return acc;
    }, {});
    const { handicap, europe, overUnder } = parsedOdds;

    const style = {
        match: {
            // display: 'flex',
            // justifyContent: 'space-around',
            // textAlign: 'initial',
            padding: '0 0 0 20px',
        },
        tdMatch: {
            // padding: '0 20px 0 20px',
        },
        centered: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        font: {
            fontWeight: 'bold',
            wordBreak: 'break-word',
            fontSize: '13px',
            cursor: 'default',

        },


    };
    const matchTime = new Date(matchedScheduleEmitItem?.HALF_START_TIME * 1000);
    matchTime.setHours(matchTime.getHours() + 7);
    const newTimestamp = matchTime.getTime() / 1000;

    return (
        <React.Fragment>
            <tr
                style={{ ...style.font }}
                matchid={e.MATCH_ID}
                id={`tr_${e.MATCH_ID}`}
                statusRun={(matchedScheduleEmitItem ? matchedScheduleEmitItem?.STATUS : e?.STATUS) <= "0" ? "-1" : (matchedScheduleEmitItem ? matchedScheduleEmitItem?.STATUS : e?.STATUS)}
                odds_handicap=""
                odds_over=""
                team={((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) ? `meAway_${e.MATCH_ID}` : "" : (-handicap?.INSTANT_HANDICAP) ? `meHome_${e.MATCH_ID}` : "")}
                tip={tipOU ? "tip" : ""}
            >
                {/* <td className="td-time" style={{ width: '5%' }} >
                    <span id={'t_' + e.MATCH_ID} name="timeData" style={{ fontSize: '13px' }} >
                        <div dangerouslySetInnerHTML={{ __html: UTCtoLocalTime(e.MATCH_TIME, 0) }} />
                    </span>

                    <br />
                    <span id={'tos_' + e.MATCH_ID} style={{ fontSize: '13px' }} className="red" sx={{ display: 'grid' }}>
                        {e?.STATUS === "1" || e?.STATUS === "2" || e?.STATUS === "3" || e?.STATUS === "4" ? (
                            <div className="live-score">Live </div>
                        ) : (
                            ""
                        )}
                    </span>
                </td> */}
                <td width="5%" style={{ textAlign: 'center' }} className="td-score" id={`tdSrc_${e.MATCH_ID}`}>
                    <div>
                        <div className="time_inmatch" style={{ paddingBottom: '12px' }}>
                            <span id={'ms' + e.MATCH_ID} className="red" style={{ marginTop: "5px" }} dangerouslySetInnerHTML={{ __html: funcTimeRun(matchedScheduleEmitItem?.STATUS, newTimestamp) }}></span>
                        </div>
                        <div className="time_local" >
                            <span style={{ fontWeight: 'initial', color: 'rgb(128, 128, 128)' }} dangerouslySetInnerHTML={{ __html: UTCtoLocalTime(e.MATCH_TIME, 0) }}></span>
                        </div>
                    </div>
                </td>
                <td className="td-league" style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 'initial', color: 'black' }}>{e.LEAGUE_SHORT_NAME}</span>
                </td>
                <td width="17%" className="td-match" style={style.tdMatch}>
                    <div style={style.match}>
                        <div className="match_name" > {/* style={{ width: '75%', }} */}
                            <div className="team_hg" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px' }}>
                                <p style={{ display: 'flex', margin: '0', }}>
                                    <p id={`home_${e.MATCH_ID}`} style={{ margin: '0', }} className={((handicap?.INSTANT_HANDICAP) < 0 ? (-handicap?.INSTANT_HANDICAP) : (-handicap?.INSTANT_HANDICAP) ? `me_color` : "")}>
                                        {e.HOME_NAME}
                                    </p>
                                    <a id={`redcard1_${e.MATCH_ID}`}>
                                        {matchedScheduleEmitItem?.HOME_RED === '0' ? (
                                            ''
                                        ) : (
                                            <span className="redcard" style={{ marginLeft: '5px', fontSize: '9px' }}>
                                                {matchedScheduleEmitItem?.HOME_RED}
                                            </span>
                                        )}
                                    </a>
                                </p>
                                {e.HOME_RANK ? (
                                    <span class="team-hg" style={{ marginLeft: '5px', color: "hsl( 0, 0%, 50% )", alignSelf: 'center', width: '70px' }}>{e.HOME_RANK}<span></span></span>
                                ) : ("")}
                            </div>
                            <div className="team_hg" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ display: 'flex', margin: '0', }}>
                                    <p id={`away_${e.MATCH_ID}`} style={{ margin: '0', }} className={((handicap?.INSTANT_HANDICAP) < 0 ? (handicap?.INSTANT_HANDICAP) ? `me_color` : "" : (handicap?.INSTANT_HANDICAP))}>
                                        {matchedScheduleEmitItem ? matchedScheduleEmitItem?.AWAY_NAME : e.AWAY_NAME}
                                    </p>
                                    <a id={`redcard2_${e.MATCH_ID}`}>
                                        {matchedScheduleEmitItem?.AWAY_RED === '0' ? (
                                            ''
                                        ) : (
                                            <span className="redcard" style={{ marginLeft: '5px', fontSize: '9px' }}>
                                                {matchedScheduleEmitItem?.AWAY_RED}
                                            </span>
                                        )}
                                    </a>
                                </p>
                                {e.AWAY_RANK ? (
                                    <span class="team-hg" style={{ marginLeft: '5px', color: "hsl( 0, 0%, 50% )", alignSelf: 'center', width: '70px' }}>{e.AWAY_RANK}<span></span></span>
                                ) : ("")}
                            </div>

                        </div>
                        {/* <div className="viewfull" style={style.centered}>
                            <ZoomInIcon style={{ fontSize: '30px' }} onClick={handleViewClick}>View</ZoomInIcon>
                            <DetailModal open={open}
                                handleClose={handleClose}
                                analysisRedux={analysisRedux}
                                detailRedux={detailRedux}
                                statsRedux={statsRedux}
                                away={e.AWAY_NAME}
                                home={e.HOME_NAME}
                                tipStar={tipStar}
                                scoreHome={matchedScheduleEmitItem ? matchedScheduleEmitItem?.HOME_SCORE : e.HOME_SCORE}
                                scoreAway={matchedScheduleEmitItem ? matchedScheduleEmitItem?.AWAY_SCORE : e.AWAY_SCORE} />
                        </div> */}
                    </div>
                </td>
                <td width="5%" style={{ textAlign: 'center' }} className="td-score" id={`tdSrc_${e.MATCH_ID}`}>
                    <div>
                        <span id={'hs' + e.MATCH_ID} className="red">{matchedScheduleEmitItem ? matchedScheduleEmitItem.HOME_SCORE : e.HOME_SCORE}</span>
                        <br />
                        <div style={{ marginTop: '10px' }} ><span id={'gs' + e.MATCH_ID} className="red">{matchedScheduleEmitItem ? matchedScheduleEmitItem.AWAY_SCORE : e.AWAY_SCORE}</span></div>
                    </div>
                </td>
                {/* ***************************************************  Handicap Run   ***************************************************** */}

                <td className="td-handicap-run">
                    <div className="tr__row">
                        {(handicap?.INSTANT_HANDICAP) < 0 ? (
                            " ") : (
                            <React.Fragment>
                                <div className="tr__col handicap.instantHandicap" odd_handicap={(handicap?.INSTANT_HANDICAP)} id={`goalRun_${e.MATCH_ID}`}>{handicap?.INSTANT_HANDICAP}</div>
                                <div className="tr__col handicap.instantHandicap" odd_handicapDemo="" id={`goalRunDemo_${e.MATCH_ID}`}></div>
                            </React.Fragment>
                        )}

                        {(handicap?.INSTANT_HANDICAP) < 0 ? (
                            <React.Fragment>
                                <div className="tr__col handicap.instantHandicap" odd_handicap="" id={`goalRun_${e.MATCH_ID}`}></div>
                                <div className="tr__col handicap.instantHandicap" odd_handicapDemo={-(handicap?.INSTANT_HANDICAP)} id={`goalRunDemo_${e.MATCH_ID}`}>{-handicap?.INSTANT_HANDICAP}</div>
                            </React.Fragment>
                        ) : (
                            ""
                        )}
                    </div>
                </td>
                <td>
                    <div className="tr__row">
                        <div className="tr__col handicap.instantHome" id={`upoddsRun_${e.MATCH_ID}`}>{handicap?.INSTANT_HOME}</div>
                        <div className="tr__col handicap.instantAway" id={`downoddsRun_${e.MATCH_ID}`}>{handicap?.INSTANT_AWAY}</div>
                    </div>
                </td>

                {/* ***************************************************  Over/Under Run   ***************************************************** */}

                <td>
                    <div className="tr__row_remove">
                        <div className="tr__col overUnder.instantHandicap" id={`goalRun_t1_${e.MATCH_ID}`}>{overUnder?.INSTANT_HANDICAP}</div>
                    </div>
                </td>
                <td>
                    <div className="tr__row">
                        <div className="tr__col overUnder.instantOver" id={`upoddsRun_t_${e.MATCH_ID}`}>{overUnder?.INSTANT_OVER}</div>
                        <div className="tr__col overUnder.instantUnder" id={`downoddsRun_t_${e.MATCH_ID}`}>{overUnder?.INSTANT_UNDER}</div>
                    </div>
                </td>

                {/* ***************************************************  Tips  ***************************************************** */}

                <td className="td-overunder-tip" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '13px' }}>
                        <div className=" handicap.fluctuatingHandicap" style={{ paddingBottom: '12px' }} id={`tipOU_${e.MATCH_ID}`}></div>
                        {tipOU !== '' ? <div onClick={handleViewClick} style={{ cursor: 'pointer', }}><Rating name="read-only" value={value} readOnly style={{ fontSize: '18px' }} max={5} /></div> : ""}
                    </div>

                    {/* <div onClick={handleViewStarClick}>{tipOU !== '' ? <Rating name="read-only" value={value} readOnly style={{ fontSize: '18px' }} max={5} /> : ""}</div>
                    <ModalStarStatics openStar={openStar}
                        handleStarClose={handleStarClose}
                        analysisRedux={analysisRedux}
                        detailRedux={detailRedux}
                        statsRedux={statsRedux}
                        away={e.AWAY_NAME}
                        home={e.HOME_NAME}
                        tipStar={tipStar}
                        scoreHome={matchedScheduleEmitItem ? matchedScheduleEmitItem?.HOME_SCORE : e.HOME_SCORE}
                        scoreAway={matchedScheduleEmitItem ? matchedScheduleEmitItem?.AWAY_SCORE : e.AWAY_SCORE}
                    /> */}
                </td>
                <td width="3%">
                    <div className="viewfull" style={style.centered}><ZoomInIcon style={{ fontSize: '30px', cursor: 'pointer', }} onClick={handleViewClick}>View</ZoomInIcon></div>
                    <DetailModal open={open}
                        handleClose={handleClose}
                        analysisRedux={analysisRedux}
                        detailRedux={detailRedux}
                        statsRedux={statsRedux}
                        away={e.AWAY_NAME}
                        home={e.HOME_NAME}
                        tipStar={tipStar}
                        scoreHome={matchedScheduleEmitItem ? matchedScheduleEmitItem?.HOME_SCORE : e.HOME_SCORE}
                        scoreAway={matchedScheduleEmitItem ? matchedScheduleEmitItem?.AWAY_SCORE : e.AWAY_SCORE} />
                </td>

                {/* ***************************************************  Handicap  ***************************************************** */}

                <td className="td-handicap-live">
                    <div className="tr__row">
                        {matchedHandicapItem?.INSTANT_HANDICAP ? (
                            <React.Fragment>
                                {matchedHandicapItem?.INSTANT_HANDICAP < 0 ? (
                                    " ") : (
                                    <React.Fragment>
                                        <div className="tr__col handicap.instantHandicap" odd_goal={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (-matchedHandicapItem?.INSTANT_HANDICAP) : (-matchedHandicapItem?.INSTANT_HANDICAP))} odd id={`goal_${e.MATCH_ID}`}>
                                            <span>
                                                {(matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (-matchedHandicapItem?.INSTANT_HANDICAP) : (matchedHandicapItem?.INSTANT_HANDICAP)}
                                            </span>
                                        </div>
                                        <div className="tr__col handicap.instantHandicap" odd_goalLive="" id={`goalLive_${e.MATCH_ID}`}>
                                            {/* odd_goalLive={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (matchedHandicapItem?.INSTANT_HANDICAP) : (matchedHandicapItem?.INSTANT_HANDICAP))} */}
                                            <span></span>
                                        </div>
                                    </React.Fragment>
                                )}

                                {matchedHandicapItem?.INSTANT_HANDICAP < 0 ? (
                                    <React.Fragment>
                                        <div className="tr__col handicap.instantHandicap" odd_goal="" id={`goal_${e.MATCH_ID}`}>
                                            {/* odd_goal={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (-matchedHandicapItem?.INSTANT_HANDICAP) : (-matchedHandicapItem?.INSTANT_HANDICAP))} */}
                                            <span></span>
                                        </div>
                                        <div className="tr__col handicap.instantHandicap" odd_goalLive={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (matchedHandicapItem?.INSTANT_HANDICAP) : (matchedHandicapItem?.INSTANT_HANDICAP))} id={`goalLive_${e.MATCH_ID}`}>
                                            <span>
                                                {(matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (-matchedHandicapItem?.INSTANT_HANDICAP) : (matchedHandicapItem?.INSTANT_HANDICAP)}
                                            </span>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    ""
                                )}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {handicap?.INITIAL_HANDICAP < 0 ? (
                                    " ") : (
                                    <React.Fragment>
                                        <div className="tr__col handicap.instantHandicap" odd_goal={((handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (-handicap?.INITIAL_HANDICAP))} odd id={`goal_${e.MATCH_ID}`}>
                                            <span>
                                                {(handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP)}
                                            </span>
                                        </div>
                                        <div className="tr__col handicap.instantHandicap" odd_goalLive="" id={`goalLive_${e.MATCH_ID}`}>
                                            {/* odd_goalLive={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (matchedHandicapItem?.INSTANT_HANDICAP) : (matchedHandicapItem?.INSTANT_HANDICAP))} */}
                                            <span></span>
                                        </div>
                                    </React.Fragment>
                                )}

                                {handicap?.INITIAL_HANDICAP < 0 ? (
                                    <React.Fragment>
                                        <div className="tr__col handicap.instantHandicap" odd_goal="" id={`goal_${e.MATCH_ID}`}>
                                            {/* odd_goal={((matchedHandicapItem?.INSTANT_HANDICAP) < 0 ? (-matchedHandicapItem?.INSTANT_HANDICAP) : (-matchedHandicapItem?.INSTANT_HANDICAP))} */}
                                            <span></span>
                                        </div>
                                        <div className="tr__col handicap.instantHandicap" odd_goalLive={((handicap?.INITIAL_HANDICAP) < 0 ? (handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP))} id={`goalLive_${e.MATCH_ID}`}>
                                            <span>
                                                {(handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP)}
                                            </span>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    ""
                                )}
                            </React.Fragment>
                        )}
                    </div>
                </td>
                <td>
                    <div className="tr__row">
                        {handicap?.INITIAL_HANDICAP < 0 ? (
                            " ") : (
                            <React.Fragment>
                                <div className="tr__col handicap.instantHandicap" odd_goal={(handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (-handicap?.INITIAL_HANDICAP)} id={`goalEarly_${e.MATCH_ID}`}>
                                    <span>
                                        {(handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP)}
                                    </span>
                                </div>
                                <div className="tr__col handicap.instantHandicap" odd_goalLive="" id={`goalEarlyLive_${e.MATCH_ID}`}>
                                    {/* odd_goalLive={(handicap?.INITIAL_HANDICAP) < 0 ? (handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP)} */}
                                    <span></span>
                                </div>
                            </React.Fragment>
                        )}
                        {handicap?.INITIAL_HANDICAP < 0 ? (
                            <React.Fragment>
                                <div className="tr__col handicap.instantHandicap" odd_goal="" id={`goalEarly_${e.MATCH_ID}`}>
                                    {/* odd_goal={(handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (-handicap?.INITIAL_HANDICAP)} */}
                                    <span></span>
                                </div>
                                <div className="tr__col handicap.instantHandicap" odd_goalLive={(handicap?.INITIAL_HANDICAP) < 0 ? (handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP)} id={`goalEarlyLive_${e.MATCH_ID}`}>
                                    <span>
                                        {(handicap?.INITIAL_HANDICAP) < 0 ? (-handicap?.INITIAL_HANDICAP) : (handicap?.INITIAL_HANDICAP)}
                                    </span>
                                </div>
                            </React.Fragment>
                        ) : (
                            ""
                        )}
                    </div>
                </td>
                <td className="td-handicap-bd-live">
                    <div className="tr__row_remove" >
                        <div className="tr__col handicap.initialHandicap-handicap.instantHandicap" id={`insertGoal_${e.MATCH_ID}`}></div>
                        <div className="tr__col el--up handicap.initialHandicap.-handicap.instantHandicap" id={`insertGoalLive_${e.MATCH_ID}`}></div>
                    </div>
                </td>
                {/* ***************************************************  Over/Under  ***************************************************** */}

                <td>
                    <div className="tr__row_remove">
                        <div className="tr__col overUnder.instantHandicap" id={`goal_t1_${e.MATCH_ID}`}>{matchedOverItem?.INSTANT_HANDICAP ? matchedOverItem?.INSTANT_HANDICAP : overUnder?.INITIAL_HANDICAP}</div>
                    </div>
                </td>
                <td>
                    <div className="tr__row_remove" >
                        <div className="tr__col overUnder.initialHandicap" id={`goalEarly_t1_${e.MATCH_ID}`}>{(overUnder?.INITIAL_HANDICAP)}</div>
                    </div>
                </td>
                <td>
                    <div className="tr__row_remove">
                        <div className="tr__col overUnder.initialHandicap - overUnder.instantHandicap" id={`insertGoal_t1_${e.MATCH_ID}`}></div>
                    </div>
                </td>
                {/* ***************************************************  View   ***************************************************** */}
                {/* onClick={handleViewClickButton} */}
                <td >
                    <div className="td-viewfull" style={{ display: 'grid', padding: '0px 5px 0 5px' }}>
                        <button style={{ marginBottom: '5px', cursor: 'pointer', }} onClick={handleViewClickButton}>View</button>
                    </div>
                </td>
            </tr>
        </React.Fragment>


    );
};

export default DataTable;
