import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { closeEditCharacter } from '../redux/actions/navigationActions';
import { editCharacter } from '../redux/actions/characterActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function EditCharacter(props) {
    const theme = useTheme();
    const { closeEditCharacter, editCharacter } = props;
    const { editCharacterWindow } = props.navigation;
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [requiredField, setRequiredField] = useState(false);
    const [newChar, setNewChar] = useState('loading');

    useEffect(() => {
        setNewChar(editCharacterWindow.character);

    }, [editCharacterWindow.character])

    function onAllChange(event) {
        setNewChar({
            ...newChar,
            [event.target.name]: event.target.value
        })
    }

    function saveChar() {
        editCharacter(newChar, editCharacterWindow.index)
        closeEditCharacter();
        setRequiredField(false);
    }

    function requiredInput() {
        setRequiredField(true)
    }

    function closeEdit() {
        closeEditCharacter();
        setRequiredField(false);
    }

    return (
        <>
            {newChar === 'loading' ? null :
                <Dialog
                    fullScreen={fullScreen}
                    open={editCharacterWindow.open}
                    onClose={closeEdit}
                    maxWidth={'md'}
                    aria-labelledby="edit-character"
                >
                    <DialogTitle id="edit-character">{"Edit Character"}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                {requiredField === true ?
                                    <TextField
                                        error
                                        id="name-input"
                                        label="Name"
                                        name="name"
                                        value={newChar.name}
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
                                        value={newChar.name}
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
                                    />}
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <TextField
                                    id="born-input"
                                    label="Born"
                                    name="born"
                                    multiline
                                    value={newChar.born}
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
                                    value={newChar.live}
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
                                    value={newChar.physicalD}
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
                                    value={newChar.characterD}
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
                                    value={newChar.philosophy}
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
                                    value={newChar.abilities}
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
                        <Button onClick={closeEdit} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}

EditCharacter.propTypes = {
    closeEditCharacter: PropTypes.func.isRequired,
    editCharacter: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    navigation: state.navigation
})

export default connect(mapStateToProps, { closeEditCharacter, editCharacter })(EditCharacter);