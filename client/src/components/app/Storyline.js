import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Icon, Button, Zoom, TextField, InputLabel, FormHelperText, FormControl, Select, Input, MenuItem, Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import RoundButton from '../customMui/RoundButton';
import CustomProgress from '../customMui/CustomProgress';
import EditStoryline from './EditStoryline';
import { connect } from 'react-redux';
import { addStory } from '../../redux/actions/characterActions';
import { openEditStoryline } from '../../redux/actions/navigationActions'
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 0,
        textAlign: 'center',
    },
    paperhead: {
        backgroundColor: 'var(--background-color)',
        borderRadius: '7px 7px 0px 0px',
        padding: theme.spacing(1),
        fontWeight: '500',
        wordBreak: "break-word"
    },
    paperbody: {
        padding: theme.spacing(1),
        wordBreak: "break-word",
    },
    margin: {
        margin: theme.spacing(1),
    },
    line: {
        width: '7px',
        height: '100%',
        margin: '0 auto',
        borderRadius: '7px',
        background: 'linear-gradient(var(--background-start) 1%, 20%, var(--background-end) 80%)',
    },
    timelineForm: {
        marginTop: theme.spacing(2),
    },
    timelineSpacing: {
        height: theme.spacing(2),
    },
    spacingLine: {
        width: '7px',
        height: '160%',
        position: 'relative',
        top: '-30%',
        margin: '0 auto',
        borderRadius: '7px',
        background: 'var(--background-end)',
    },
    box: {
        marginTop: '50px'
    }
}));

const StoryLine = ({openEditStoryline, addStory, characters: { charactersInfo}, navigation: {characterInfoWindow, editStoryWindow}}) => {
    const classes = useStyles();
    const [addStoryline, setAddStoryline] = useState(false);
    const [requiredField, setRequiredField] = useState(false);
    const [character, setCharacter] = useState(false);
    const [newStoryline, setNewStoryline] = useState({
        event: '',
        time: '',
        effect: '',
        intensity: '',
        title: '',
    });

    useEffect(() => {
        const info = charactersInfo.filter(i => i._id === characterInfoWindow);
        setCharacter(...info);
    }, [charactersInfo, characterInfoWindow])

    const handleStoryline = () => {
        setAddStoryline(true)
    }

    const handleCancel = () => {
        setNewStoryline({
            event: '',
            time: '',
            effect: '',
            intensity: '',
            title: '',
        });
        setAddStoryline(false);
        setRequiredField(false)
    }

    const makeColor = (color) => {
        switch (color) {
            case 'Positive':
                return '#9EE09E';
            case 'Negative':
                return '#FF6663';
            case 'Neutral':
                return '#CC99C9';
            default:
                return '#CC99C9';
        }
    }

    const handleSave = () => {
        const isEmpty = Object.values(newStoryline).some(x => x === '');
        if (character.story.length === 0) {
            if (isEmpty === false) {
                const lineColor = makeColor(newStoryline.effect);
                const newStory = { ...newStoryline, beforeColor: lineColor, color: lineColor };
                addStory(newStory, character._id);
                handleCancel();
            } else { setRequiredField(newStoryline) }
        } else {
            if (isEmpty === false) {
                const prevStory = character.story.length - 1;
                const lineColor = makeColor(newStoryline.effect);
                const newStory = { ...newStoryline, beforeColor: character.story[prevStory].color, color: lineColor };
                addStory(newStory, character._id);
                handleCancel();
            } else { setRequiredField(newStoryline) }
        }
    }

    const onAllChange = (event) => {
        setNewStoryline({
            ...newStoryline,
            [event.target.name]: event.target.value,
        });
    }

    const handleEditStoryline = () => {
        const index = charactersInfo.indexOf(character);
        openEditStoryline(character, index)
    }

    return (
        <>
            {character === false ?
                <Box className={classes.box} display="flex" justifyContent="center">
                    <CustomProgress />
                </Box> :
                <>
                    {character.story.length === 0 ? null :
                        character.story.map((s, index) =>
                            <Grid container key={index}>
                                <Grid item xs={8}>
                                    <Paper className={classes.paper}>
                                        <Typography
                                            className={classes.paperhead}
                                            style={
                                                { '--background-color': s.color }
                                            }
                                        >
                                            {s.title}
                                        </Typography>
                                        <Typography className={classes.paperbody}>
                                            {s.event}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={1}>
                                    <div
                                        className={classes.line}
                                        style={
                                            {
                                                '--background-start': s.beforeColor,
                                                '--background-end': s.color,
                                            }
                                        }
                                    >
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper className={classes.paper}>
                                        <Typography
                                            className={classes.paperhead}
                                            style={
                                                { '--background-color': s.color }
                                            }
                                        >
                                            {s.time}
                                        </Typography>
                                        <Typography className={classes.paperbody}>
                                            Effect: {s.effect} <br />
                                            Intensity: {s.intensity}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={8} className={classes.timelineSpacing}></Grid>
                                <Grid item xs={1} className={classes.timelineSpacing}>
                                    <div
                                        className={classes.spacingLine}
                                        style={{ '--background-end': s.color }}
                                    ></div>
                                </Grid>
                                <Grid item xs={3} className={classes.timelineSpacing}></Grid>
                            </Grid>
                        )
                    }
                    {
                        addStoryline === false ? null :
                            <Zoom in={addStoryline}>
                                <Grid container spacing={2} className={classes.timelineForm}>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            error={requiredField.event === ''}
                                            id="outlined-multiline-static"
                                            label="Event"
                                            name="event"
                                            multiline
                                            onChange={onAllChange}
                                            rows="10"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Grid item xs={12}>
                                            <TextField
                                                error={requiredField.title === ''}
                                                id="outlined-multiline-static"
                                                label="Title"
                                                name="title"
                                                multiline
                                                onChange={onAllChange}
                                                rows="1"
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                error={requiredField.time === ''}
                                                id="outlined-multiline-static"
                                                label="Events Time"
                                                name="time"
                                                multiline
                                                onChange={onAllChange}
                                                rows="1"
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl className={classes.margin}>
                                                <InputLabel htmlFor="eff">Effect</InputLabel>
                                                <Select
                                                    error={requiredField.effect === ''}
                                                    value={newStoryline.effect}
                                                    onChange={onAllChange}
                                                    input={<Input name="effect" id="eff" />}
                                                >
                                                    <MenuItem value={"Positive"}>Positive</MenuItem>
                                                    <MenuItem value={"Negative"}>Negative</MenuItem>
                                                    <MenuItem value={"Neutral"}>Neutral</MenuItem>
                                                </Select>
                                                <FormHelperText>How does it affect the character?</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl className={classes.margin}>
                                                <InputLabel htmlFor="inten">Intensity</InputLabel>
                                                <Select
                                                    error={requiredField.intensity === ''}
                                                    value={newStoryline.intensity}
                                                    onChange={onAllChange}
                                                    input={<Input name="intensity" id="inten" />}
                                                >
                                                    <MenuItem value={0}>0</MenuItem>
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                    <MenuItem value={6}>6</MenuItem>
                                                    <MenuItem value={7}>7</MenuItem>
                                                    <MenuItem value={8}>8</MenuItem>
                                                    <MenuItem value={9}>9</MenuItem>
                                                    <MenuItem value={10}>10</MenuItem>
                                                </Select>
                                                <FormHelperText>Event intensity</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Zoom>
                    }
                    {addStoryline === false && character.story.length === 0 ?
                        <RoundButton variant="contained"  color="primary" aria-label="Add" onClick={handleStoryline}>
                            <Icon>edit_icon</Icon>
                        </RoundButton>
                        : addStoryline === false && character.story.length >= 1 && editStoryWindow.open === false ?
                            <Grid container direction="row" justify="center" alignItems="center">
                                <RoundButton variant="contained" color="primary" aria-label="Add" onClick={handleStoryline}>
                                    <Icon>edit_icon</Icon>
                                </RoundButton>
                                <Button variant="contained" color="primary" onClick={handleEditStoryline}>
                                    Edit Storyline
                                </Button>
                            </Grid>
                            : editStoryWindow.open === true ?
                                <EditStoryline />
                                :
                                <Grid container direction="row" justify="center">
                                    <Button variant="contained" color="primary" onClick={handleSave} className={classes.margin}>
                                        Save
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleCancel} className={classes.margin}>
                                        Cancel
                                    </Button>
                                </Grid>
                    }
                </>
            }
        </>
    )
}

StoryLine.propTypes = {
    characters: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    addStory: PropTypes.func.isRequired,
    openEditStoryline: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    characters: state.characters,
    navigation: state.navigation,
})

export default connect(mapStateToProps, { addStory, openEditStoryline })(StoryLine);