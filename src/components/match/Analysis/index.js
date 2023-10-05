import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

import H2H from "./components/H2H";
import HomeAnalysis from "./components/HomeAnalysis";
import AwayAnalysis from "./components/AwayAnalysis";



const Analysis = (props) => {
  // updateStatisticsAnaly
  const { analysis, schedule } = props;



  if (!analysis || !analysis.data || analysis.data.length === 0
    || !schedule || !schedule.data || schedule.data.length === 0) {
    return null;
  }

  /* ******************************************************************* */

  const styles = {
    title: {
      textAlign: 'center',
    },
    paddingTop: {
      paddingTop: '20px',
    },
    paddingBottom: {
      paddingBottom: '20px',
    },
  };

  return (
    <>
      <H2H
        league={schedule.data[0].LEAGUE_SHORT_NAME}
        nameTeam={schedule.data[0].HOME_NAME}
        awayTeam={schedule.data[0].AWAY_NAME}
        title="Head to Head Statistics"
        style={styles.paddingTop}
        H2H={analysis['data']['HEADTOHEAD']}
      />
      {/* <Box sx={{ width: '100%' }}>
        <h2 style={styles.title}>Previous Scores Statistics</h2>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <HomeAnalysis
              nameTeam={schedules.data.$.HOME_NAME}
              title="Previous Scores Statistics"
              LAST_MATCH_HOME={LAST_MATCH_HOME}
              LAST_MATCH_HOME_IO={JSON.parse(h2hIO?.LAST_MATCH_HOME)}
            />
          </Grid>
          <Grid item xs={6}>
            <AwayAnalysis
              awayTeam={schedules.data.$.AWAY_NAME}
              LAST_MATCH_AWAY={LAST_MATCH_AWAY}
              LAST_MATCH_AWAY_IO={JSON.parse(h2hIO?.LAST_MATCH_AWAY)}
            />
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
}

export default Analysis;