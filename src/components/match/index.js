import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";

import { scheduleSingleState$, analysisState$, oddHistoryState$ } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import HeaderMatch from './HeaderMatch';
import Analysis from './Analysis';
import OddRun from './OddRun';

export default function MatchLive(props) {
  const {
    run,
    ah,
    ou,
    matchID } = props;

  const runValue = run || '-'
  const ahValue = ah || '-';
  const ouValue = ou || '-';

  const dispatch = useDispatch();
  const schedule = useSelector(scheduleSingleState$);
  const analysis = useSelector(analysisState$);
  const odd_history = useSelector(oddHistoryState$);


  const [timeRun, setTimeRun] = useState([]);

  useEffect(() => {
    dispatch(actions.getScheduleSingle.getScheduleSingleRequest(matchID));
    dispatch(actions.getAnalysis.getAnalysisRequest(matchID));
    dispatch(actions.getOddHistory.getOddHistoryRequest(matchID));
  }, [dispatch, matchID]);

  const styles = {
    headerMatch: {
      marginBottom: '20px',
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const socket = io.connect(`${process.env.REACT_APP_URL_SERVER}`);
  //       socket.on("connect", () => {
  //         console.log("con ws");
  //       });

  //       socket.on("3IN1", async (data) => {
  //         try {
  //           const dataJson = JSON.parse(data);
  //           if (dataJson && dataJson['ODDS_DATA'] && dataJson['ODDS_DATA']['ODDS_ITEM']) {
  //             const data = (dataJson['ODDS_DATA']['ODDS_ITEM']);
  //             const length = data?.length || 0;
  //             const matchingDs = [];

  //             for (var i = 0; i < length; i++) {
  //               const D = data?.[i]?.$;

  //               if (D._MATCH_ID === matchID) {
  //                 matchingDs.push(D);
  //               }

  //             }
  //             Set3In1(matchingDs[0]?._ODDS);

  //           }
  //         } catch (error) {
  //           console.error("Error while parsing JSON data:", error.message);
  //         }
  //       });

  //       socket.on("H2H", async (data) => {
  //         try {
  //           const dataJson = JSON.parse(data);
  //           if (dataJson && dataJson['H2H_DATA'] && dataJson['H2H_DATA']['H2H_ITEM']) {
  //             const data = (dataJson['H2H_DATA']['H2H_ITEM']);
  //             const length = data?.length || 0;
  //             const matchingDs = [];

  //             for (var i = 0; i < length; i++) {
  //               const D = data?.[i]?.$;

  //               if (D.MATCH_ID === matchID) {
  //                 matchingDs.push(D);
  //               }

  //             }
  //             setH2H(matchingDs[0]);

  //           }
  //         } catch (error) {
  //           console.error("Error while parsing JSON data:", error.message);
  //         }
  //       });

  //       socket.on("TIME_RUN", async (data) => {
  //         try {
  //           const dataJson = JSON.parse(data);
  //           if (dataJson && dataJson['TIMES_DATA'] && dataJson['TIMES_DATA']['TIME_ITEM']) {
  //             const data = (dataJson['TIMES_DATA']['TIME_ITEM']);
  //             const length = data?.length || 0;
  //             const matchingDs = [];

  //             for (var i = 0; i < length; i++) {
  //               const D = data?.[i]?.$;

  //               if (D.MATCH_ID === matchID) {
  //                 matchingDs.push(D);
  //               }

  //             }
  //             setTimeRun(matchingDs[0]);

  //           }
  //         } catch (error) {
  //           console.error("Error while parsing JSON data:", error.message);
  //         }
  //       });

  //       return () => {
  //         socket.disconnect();
  //       };
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='matchLive'>
      <div style={styles.headerMatch} className='headerMatch'>
        <HeaderMatch
          matchID={matchID}
          runValue={runValue}
          ahValue={ahValue}
          ouValue={ouValue}
          schedule={schedule}
        />
      </div>
      <div className='oddRun'>
        <OddRun matchID={matchID} odd_history={odd_history} />
      </div>
      <div className='analysis'>
        <Analysis
          analysis={analysis}
          schedule={schedule}
        />
      </div>
    </div>
  );
}
