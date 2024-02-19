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
    || !schedule || !schedule?.data?.$ || schedule?.data?.$?.length === 0) {
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
  console.log(analysis);
  return (
    <>
      <H2H
        league={schedule?.data?.$?.LEAGUE_SHORT_NAME}
        nameTeam={schedule?.data?.$?.HOME_NAME}
        awayTeam={schedule?.data?.$?.AWAY_NAME}
        title="Thống kê đối đầu"
        style={styles.paddingTop}
        H2H={analysis['data']['HEADTOHEAD']}
      />
      <Box sx={{ width: '100%' }}>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <h2 style={styles.title}>Phong độ ({schedule?.data?.$?.HOME_NAME})</h2>
            <HomeAnalysis
              nameTeam={schedule?.data?.$?.HOME_NAME}
              LAST_MATCH_HOME={analysis['data']['HOME_LAST_MATCH']}
            />
          </Grid>
          <Grid item xs={12}>
            <h2 style={styles.title}>Phong độ ({schedule?.data?.$?.AWAY_NAME})</h2>
            <AwayAnalysis
              awayTeam={schedule?.data?.$?.AWAY_NAME}
              LAST_MATCH_AWAY={analysis['data']['AWAY_LAST_MATCH']}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Analysis;