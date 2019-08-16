import React, { useEffect, useState } from "react";
import Storyline from "./Storyline";
import { Grid, Paper, Box, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 0,
    textAlign: "center"
  },
  paperhead: {
    backgroundColor: "#ACC8EA",
    borderRadius: "7px 7px 0px 0px",
    padding: theme.spacing(1),
    fontWeight: "500"
  },
  paperbody: {
    padding: theme.spacing(1),
    wordBreak: "break-word"
  },
  divider: {
    padding: theme.spacing(1),
    backgroundColor: "#ACC8EA",
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "7px 7px 0px 0px",
    textAlign: "center"
  },
  box: {
    marginTop: "50px"
  }
}));

function CharInfoDisplay(props) {
  const classes = useStyles();
  const { characterInfoWindow } = props.navigation;
  const { charactersInfo } = props.characters;
  const [character, setCharacter] = useState("false");

  useEffect(() => {
    const info = charactersInfo.filter(i => i._id === characterInfoWindow);
    setCharacter(...info);
  }, [charactersInfo, characterInfoWindow]);

  const CustomProgress = withStyles({
    root: {
      color: "#ACC8EA"
    }
  })(CircularProgress);

  return (
    <>
      {character === "false" ? (
        <Box className={classes.box} display="flex" justifyContent="center">
          <CustomProgress />
        </Box>
      ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperhead}>Name:</Typography>
                  <Typography className={classes.paperbody}>
                    {character.name}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperhead}>Born:</Typography>
                  <Typography className={classes.paperbody}>
                    {character.born}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperhead}>Live:</Typography>
                  <Typography className={classes.paperbody}>
                    {character.live}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperhead}>
                    Physical Description:
                </Typography>
                  <Typography className={classes.paperbody}>
                    {character.physicalD}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperhead}>
                    Character Description:
                </Typography>
                  <Typography className={classes.paperbody}>
                    {character.characterD}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperhead}>
                    Philosophy:
                </Typography>
                  <Typography className={classes.paperbody}>
                    {character.philosophy}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Paper className={classes.paper}>
                  <Typography className={classes.paperhead}>
                    Abilities:
                </Typography>
                  <Typography className={classes.paperbody}>
                    {character.abilities}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid container direction="column" alignItems="center" spacing={4}>
              <Paper className={classes.divider}>
                <h2>Character Storyline</h2>
              </Paper>
              <Storyline />
            </Grid>
          </>
        )}
    </>
  );
}

CharInfoDisplay.propTypes = {
  navigation: PropTypes.object.isRequired,
  characters: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  navigation: state.navigation,
  characters: state.characters
});

export default connect(mapStateToProps, {})(CharInfoDisplay);
