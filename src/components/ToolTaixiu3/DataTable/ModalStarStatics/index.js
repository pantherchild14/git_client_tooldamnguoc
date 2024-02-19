import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Star6in1 from './Star6in1';
// import { Table } from "@mui/material";

const ModalStarStatics = (props) => {
    const { openStar,
        handleStarClose,
        analysisRedux,
        detailRedux,
        statsRedux,
        away,
        home,
        tipStar,
        scoreHome,
        scoreAway
    } = props;

    const style = {
        Box: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '400px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 1,
            maxHeight: '600px',
            overflowY: 'auto',
        },
        score: {
            backgroundColor: 'rgb(196 60 68)',
            width: '100%',
            lineHeight: '25px',
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
            open={openStar}
            onClose={handleStarClose}
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
                                    <td height="20" width="44%"><font><b>{home}</b></font></td>
                                    <td width="12%"><b>{scoreHome} - {scoreAway}</b></td>
                                    <td width="44%"><font><b>{away}</b></font></td>
                                </tr>
                            </thead>
                        </table>
                        <Star6in1
                            parsedStatics={parsedStatics['STATS']}
                            parsedH2H={parsed['HEADTOHEAD']}
                            parsedHome={parsed['HOME_LAST_MATCH']}
                            parsedAway={parsed['AWAY_LAST_MATCH']}
                            nameTeam={home}
                            awayTeam={away}
                            tipStar={tipStar}
                        />
                    </React.Fragment>
                )}
            </Box>
        </Modal>
    );
}

export default ModalStarStatics;
