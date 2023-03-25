import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DisplayCardContent from './DisplayCardContent';
import { startGame } from '../Actions/startGameAction';
import { flipCard } from '../Actions/flipCard';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";


const useStyles = makeStyles({
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "0.5rem",
  },
  profileImg: {
    width: "80px",
    borderRadius: "50%",
    margin: "0.1rem",
    marginTop:"0.3rem",
    color:"#C0C0C0",
  },
});


const HomePage = ({ card, startGame, flipCard }) => {
  const classes = useStyles();
  useEffect(() => {
    startGame();
  }, [startGame]);
 

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const { cardFlipped, cardArray, defuseCardNumber, res } = card;

  return (
    <>
      <Grid container direction='row' style={{ marginTop: 30 }}>
        <Grid item sm={3} />
        <Grid item xs={12} sm={6}>
          <DisplayCardContent cardContent={cardFlipped} cardRemaining={cardArray.length} defuseCardNumber={defuseCardNumber} res={res}
           />
        </Grid>
        
        <Grid item sm={3} />
        <Grid item sm={3} />
        <Grid item xs={12} sm={6} style={{ marginTop: 20 }}>
          <Button variant='contained' color='primary' onClick={() => flipCard()}>
            Flip
          </Button>
        </Grid>
        <Grid item sm={3} />
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Grid container direction='row' justify='center'>
            <Grid item>
            <Paper className={classes.profile}>
              {isAuthenticated ? (
                <>
                  <img
                src={user.picture}
                 alt="Profile"
                 className={classes.profileImg}
               />
                <div style={{ margin: 20 }}>Welcome, {user.name}!</div>
                <Grid item xs={12} sm={6} style={{ margin: 20 }}>
                  <Button  variant='contained' color='secondary' onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                  </Button>
                  </Grid>
                </>
              ) : (
                <Button variant='contained' color='primary' onClick={() => loginWithRedirect()}>
                  Log In
                </Button>
              )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ card }) => ({ card });
const mapDispatchToProps = { startGame, flipCard };
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);



