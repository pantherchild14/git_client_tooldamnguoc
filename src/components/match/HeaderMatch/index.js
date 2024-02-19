import { useEffect } from 'react';

import { Box, Grid, Link } from '@mui/material';
import { startMatchTimer } from '../../../helpers';

const HeaderMatch = (props) => {
    const {
        matchID,
        runValue,
        ahValue,
        ouValue,
        schedule,
    } = props;

    if (!schedule || !schedule?.data?.$ || schedule?.data?.$?.length === 0) {
        return null;
    }

    const matchTime = new Date(schedule?.data?.$?.HALF_START_TIME * 1000);
    matchTime.setHours(matchTime.getHours() + 7);
    const newTimestamp = matchTime.getTime() / 1000;

    const matchStatus = startMatchTimer(schedule?.data?.$?.STATUS, newTimestamp, "matchTime");


    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        matchTime: {
            display: 'flex',
        },
        midder: {
            padding: '15px 0px 15px 0',
        },
        homeName: {
            fontSize: '18px',
            color: 'blue',
        },
        awayName: {
            fontSize: '18px',
            color: 'red',
        },
        score: {
            fontSize: '30px',
        },
        bxkeotype: {
            width: '54%',
            background: '#fff',
            color: '#000',
            position: 'relative',
            borderRadius: '5px',
            padding: '10px 10px 10px 35px',
            overflow: 'hidden',
            marginRight: '1%',
            border: '2px dashed #1a73e8',
        },
        tip: {
            position: 'absolute',
            fontSize: '13px',
            textTransform: 'uppercase',
            color: '#fff',
            textAlign: 'center',
            transform: 'rotate(-45deg)',
            left: '0px',
            top: '6px',
        },
        predictionSoccerResult: {
            display: 'flex',
            alignItems: 'flexStart',
            justifyContent: 'flexStart',
        },
        txtPrediction: {
            lineHeight: '25px',
            fontWeight: '900',
        },
        txtPredictionSpan: {
            color: '#227ad3',
            marginLeft: '0px',
        }
    };

    const handleViewClickButton = () => {
        const newUrl = `https://www.nowgoal8.com/match/h2h-${matchID}`;
        window.open(newUrl, '_blank');
    };


    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 2"></Box>
            <Box gridColumn="span 8" textAlign={'center'} style={styles.midder}>
                <Grid container spacing="auto">
                    <Grid style={styles.homeName} item xs={4}>
                        <p>{schedule?.data?.$?.HOME_NAME}</p>
                    </Grid>
                    <Grid item xs={4}>
                        {/* ------------------ */}
                        <div style={styles.container}>
                            <div style={styles.score}>{schedule?.data?.$?.HOME_SCORE}</div>
                            <div>
                                <div id="matchTime" style={styles.matchTime} >
                                    {schedule?.data?.$?.STATUS === 0 ? (
                                        <b>VS</b>
                                    ) : schedule?.data?.$?.STATUS === 1 ? (
                                        <b>1st Half</b>
                                    ) : schedule?.data?.$?.STATUS === 2 ? (
                                        <b>HT</b>
                                    ) : schedule?.data?.$?.STATUS === 3 ? (
                                        <b>2nd Half</b>
                                    ) : (
                                        <b>FT</b>
                                    )}
                                    {matchStatus && <div dangerouslySetInnerHTML={{ __html: matchStatus }} />}
                                </div>
                            </div>
                            <div style={styles.score}>{schedule?.data?.$?.AWAY_SCORE}</div>
                        </div>
                        {/* ------------------ */}
                    </Grid>
                    <Grid style={styles.awayName} item xs={4}>
                        <p>{schedule?.data?.$?.AWAY_NAME}</p>
                    </Grid>
                </Grid>
            </Box>
            <Box gridColumn="span 2"></Box>
            <Box gridColumn="span 2"></Box>

            <Box gridColumn="span 4">
                <div className="bxkeotype" style={styles.bxkeotype}>
                    <span className="tip" style={styles.tip}>tips</span>
                    {runValue !== "-" ? (
                        <div style={styles.predictionSoccerResult}>
                            <div style={styles.txtPrediction}>
                                Tip Đâm Ngược: <span style={styles.txtPredictionSpan}>{runValue}</span>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {ahValue !== "-" ? (
                        <div style={styles.predictionSoccerResult}>
                            <div style={styles.txtPrediction}>
                                Tip Handicap: <span style={styles.txtPredictionSpan}>{ahValue}</span>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {ouValue !== "-" ? (
                        <div style={styles.predictionSoccerResult}>
                            <div style={styles.txtPrediction}>
                                Tip Over/Under: <span style={styles.txtPredictionSpan}>{ouValue}</span>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                </div>
            </Box>
            <Box gridColumn="span 6">WHEATHER: {schedule?.data?.$?.WEATHER !== "" ? schedule?.data?.$?.WEATHER : "-"}</Box>
            <Box gridColumn="span 10"></Box>
        </Box>
    );
}

export default HeaderMatch;
