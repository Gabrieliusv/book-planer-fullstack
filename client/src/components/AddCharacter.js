import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, TextField, Grid } from '@material-ui/core';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { addCharacter } from '../redux/actions/characterActions';
import { toggleAddCharacter } from '../redux/actions/navigationActions'
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function AddCharacter(props) {
    const { toggleAddCharacter, addCharacter } = props;
    const { addCharacterWindow } = props.navigation;
    const theme = useTheme();
    const [requiredField, setRequiredField] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [newChar, setNewChar] = useState({
        name: '',
        born: '',
        live: '',
        physicalD: '',
        characterD: '',
        philosophy: '',
        abilities: '',
        id: uuid(),
        story: [],
    });

    function onAllChange(event) {
        setNewChar({
            ...newChar,
            [event.target.name]: event.target.value
        })
    }

    function saveChar() {
        addCharacter(newChar);
        setNewChar({
            name: '',
            born: '',
            live: '',
            physicalD: '',
            characterD: '',
            philosophy: '',
            abilities: '',
            id: uuid(),
            story: [],
        });
        toggleAddCharacter();
        setRequiredField(false)
    }

    function requiredInput() {
        setRequiredField(true)
    }

    function closeAdd() {
        toggleAddCharacter();
        setRequiredField(false);
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={addCharacterWindow}
                onClose={toggleAddCharacter}
                maxWidth={'md'}
                aria-labelledby="new-character"
            >
                <DialogTitle id="new-character">{"New Character"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            {requiredField === true ?
                                <TextField
                                    error
                                    id="name-input"
                                    label="Name"
                                    name="name"
                                    multiline
                                    onChange={onAllChange}
                                    type="text"
                                    required={true}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /> :
                                <TextField
                                    id="name-input"
                                    label="Name"
                                    name="name"
                                    multiline
                                    onChange={onAllChange}
                                    type="text"
                                    required={true}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <TextField
                                id="born-input"
                                label="Born"
                                name="born"
                                multiline
                                onChange={onAllChange}
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <TextField
                                id="outlined-name"
                                label="Live"
                                name="live"
                                multiline
                                onChange={onAllChange}
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                id="outlined-multiline-static"
                                label="Physical Description"
                                name="physicalD"
                                multiline
                                onChange={onAllChange}
                                rows="8"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                id="outlined-multiline-static"
                                label="Character Description"
                                name="characterD"
                                multiline
                                onChange={onAllChange}
                                rows="8"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                id="outlined-multiline-static"
                                label="Philosophy"
                                name="philosophy"
                                multiline
                                onChange={onAllChange}
                                rows="8"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                id="outlined-multiline-static"
                                label="Abilities"
                                name="abilities"
                                multiline
                                onChange={onAllChange}
                                rows="8"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={newChar.name === "" ? requiredInput : saveChar} color="primary">
                        Save
          </Button>
                    <Button onClick={closeAdd} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AddCharacter.propTypes = {
    addCharacter: PropTypes.func.isRequired,
    toggleAddCharacter: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    navigation: state.navigation
})

export default connect(mapStateToProps, { addCharacter, toggleAddCharacter })(AddCharacter);