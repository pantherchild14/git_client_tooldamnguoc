import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Statics from "./Statics";
import Detail from "./Detail";
import H2H from "./H2H";
import HomeAnaly from "./HomeAnalysis";
import AwayAnaly from "./AwayAnalysis";
import { Table } from "@mui/material";

const DetailModal = (props) => {
    const { open,
        handleClose,
        analysisRedux,
        detailRedux,
        statsRedux,
        away,
        home,
        tipStar,
        scoreHome,
        scoreAway } = props;

    const style = {
        Box: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '1000px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 1,
            maxHeight: '800px',
            overflowY: 'auto',
        },
        score: {
            // backgroundColor: 'rgb(196 60 68)',
            width: '100%',
            lineHeight: '30px',
        }
    };

    let parsed = {};
    let parsedDetail = {};
    let parsedStatics = {};

    if (analysisRedux && analysisRedux?.data) {
        parsed = (analysisRedux?.data);
    }

    if (detailRedux && detailRedux?.data && detailRedux?.data?.$) {
        parsedDetail = (detailRedux?.data?.$);
    }

    if (statsRedux && statsRedux?.data && statsRedux?.data?.$) {
        parsedStatics = (statsRedux?.data?.$);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.Box}>
                {analysisRedux.isLoading ? (
                    <CircularProgress />
                ) : (
                    <React.Fragment>
                        <table width="400" cellpadding="0" cellspacing="1" style={style.score}>
                            <thead>
                                <tr className="jqSubTitle" align="center">
                                    <td height="20" width="44%" style={{ color: 'red', fontSize: '18px' }}><font><b>{home}</b></font></td>
                                    <td width="12%" style={{ fontSize: '17px' }}><b>{scoreHome} - {scoreAway}</b></td>
                                    <td width="44%" style={{ color: 'blue', fontSize: '18px' }}><font><b>{away}</b></font></td>
                                </tr>
                            </thead>
                        </table>
                        <Statics
                            parsed={parsedStatics['STATS']}
                            parsedH2H={parsed['HEADTOHEAD']}
                            parsedHome={parsed['HOME_LAST_MATCH']}
                            parsedAway={parsed['AWAY_LAST_MATCH']}
                            nameTeam={home}
                            awayTeam={away}
                            tipStar={tipStar} />
                        <Detail
                            parsed={parsedDetail['EVENTS']}
                            nameTeam={home}
                            awayTeam={away}
                        />
                        <H2H parsed={parsed['HEADTOHEAD']} nameTeam={home} awayTeam={away} />
                        <HomeAnaly nameTeam={home} parsed={parsed['HOME_LAST_MATCH']} />
                        <AwayAnaly awayTeam={away} parsed={parsed['AWAY_LAST_MATCH']} />
                    </React.Fragment>
                )}
            </Box>
        </Modal>
    );
}

export default DetailModal;
