import React, { useState } from 'react';
import { Grid, Button, Zoom, TextField, InputLabel, FormHelperText, FormControl, Select, Input, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeEditStoryline } from '../../redux/actions/navigationActions';
import { editStory } from '../../redux/actions/characterActions';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    timelineForm: {
        marginTop: theme.spacing(2),
    },
    selectStory: {
        margin: theme.spacing(3),
        border: '2px solid #ACC8EA',
        borderRadius: '7px',
        padding: '20px',
    },
    buttons: {
        marginTop: theme.spacing(2)
    },
    editForm: {
        width: '100%'
    }
}))

function EditStoryline(props) {
    const { editStoryWindow } = props.navigation;
    const { character } = props.navigation.editStoryWindow;
    const { closeEditStoryline, editStory } = props;
    const classes = useStyles();
    const [selectedStory, setSelectedStory] = useState({ index: '' });
    const [requiredFields, setRequiredFields] = useState(false);
    const [story, setStory] = useState(false)

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
        const isEmpty = Object.values(story).some(x => (x === null || x === ''));
        let storyline = [ ...character.story ];
        const storyIndex = selectedStory.index;
        const nextStoryIndex = selectedStory.index + 1;
        const prevStoryIndex = selectedStory.index - 1;
        const lineColor = makeColor(story.effect);
        if (character.story.length === 1 && isEmpty === false) {
            const newStory = { ...story, beforeColor: lineColor, color: lineColor };
            storyline.splice(storyIndex, 1, { ...newStory });
            editStory(storyline, character._id);
            closeEditStoryline();
        } else if (character.story.length > 1 && isEmpty === false && storyIndex !== 0) {
            if (character.story.length === storyIndex + 1) {
                const newStory = { ...story, beforeColor: character.story[prevStoryIndex].color, color: lineColor };
                storyline.splice(storyIndex, 1, { ...newStory });
                editStory(storyline, character._id);
                closeEditStoryline();
            } else {
                const newStory = { ...story, beforeColor: character.story[prevStoryIndex].color, color: lineColor };
                const nextStory = { ...character.story[nextStoryIndex], beforeColor: lineColor };
                storyline.splice(storyIndex, 1, { ...newStory });
                storyline.splice(nextStoryIndex, 1, { ...nextStory });
                editStory(storyline, character._id);
                closeEditStoryline();
            }
        } else if (character.story.length > 1 && isEmpty === false && storyIndex === 0) {
            const newStory = { ...story, beforeColor: lineColor, color: lineColor };
            const nextStory = { ...character.story[nextStoryIndex], beforeColor: lineColor };
            storyline.splice(storyIndex, 1, { ...newStory });
            storyline.splice(nextStoryIndex, 1, { ...nextStory });
            editStory(storyline, character._id);
            closeEditStoryline();
        }
    }

    const handleEdit = () => {
        if (selectedStory.index === '') {
            setRequiredFields(true)
        } else {
            setStory(character.story[selectedStory.index])
        }
    }

    const onAllChange = (event) => {
        setStory(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    const onSelectStoryChange = (event) => {
        setSelectedStory({
            index: event.target.value
        })
    }

    const CustomButton = withStyles(theme => ({
        root: {
            color: theme.palette.getContrastText('#88B4E3'),
            backgroundColor: '#88B4E3',
            '&:hover': {
                backgroundColor: '#6595DA',
            },
        },
    }))(Button);

    return (
        <>
            {story === false ?
                <Zoom in={editStoryWindow.open}>
                    <div className={classes.selectStory}>
                        <FormControl>
                            <InputLabel htmlFor="chooseStory">Select Story</InputLabel>
                            <Select
                                error={requiredFields}
                                value={selectedStory.index}
                                onChange={onSelectStoryChange}
                                input={<Input name="story" id="chooseStory" />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {editStoryWindow.character.story.map((i, index) => <MenuItem key={index} value={index}>{i.title}</MenuItem>)}
                            </Select>
                            <FormHelperText>Choose a story you want to edit</FormHelperText>
                        </FormControl>
                        <Grid container direction="row" justify="center" className={classes.buttons}>
                            <CustomButton variant="contained" onClick={handleEdit} className={classes.margin}>
                                Edit
                    </CustomButton>
                            <CustomButton variant="contained" onClick={closeEditStoryline} className={classes.margin}>
                                Cancel
                    </CustomButton>
                        </Grid>
                    </div>
                </Zoom>
                :
                <Zoom in={editStoryWindow.open}>
                    <div className={classes.editForm}>
                        <Grid container spacing={2} className={classes.timelineForm}>
                            <Grid item xs={12} sm={12} md={8}>
                                <TextField
                                    error={story.event === ''}
                                    id="outlined-multiline-static"
                                    label="Event"
                                    name="event"
                                    multiline
                                    value={story.event}
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
                                        error={story.title === ''}
                                        id="outlined-multiline-static"
                                        label="Title"
                                        name="title"
                                        multiline
                                        value={story.title}
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
                                        error={story.time === ''}
                                        id="outlined-multiline-static"
                                        label="Events Time"
                                        name="time"
                                        multiline
                                        value={story.time}
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
                                            error={story.effect === ''}
                                            value={story.effect}
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
                                            error={story.intensity === ''}
                                            value={story.intensity}
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
                        <Grid container direction="row" justify="center">
                            <CustomButton variant="contained" onClick={handleSave} className={classes.margin}>
                                Save
                    </CustomButton>
                            <CustomButton variant="contained" onClick={closeEditStoryline} className={classes.margin}>
                                Cancel
                    </CustomButton>
                        </Grid>
                    </div>
                </Zoom>
            }
        </>
    )
}

EditStoryline.propTypes = {
    navigation: PropTypes.object.isRequired,
    closeEditStoryline: PropTypes.func.isRequired,
    editStory: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    navigation: state.navigation
})

export default connect(mapStateToProps, { closeEditStoryline, editStory })(EditStoryline)