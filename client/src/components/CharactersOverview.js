import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { openCharacter } from '../redux/actions/navigationActions';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    chartHeight: {
        height: '35vh'
    }
}))

function CharactersOverview(props) {
    const { openCharacter } = props;
    const { charactersInfo } = props.characters;

    const classes = useStyles();

    const CustomButton = withStyles(theme => ({
        root: {
            marginTop: theme.spacing(1),
            color: theme.palette.getContrastText('#88B4E3'),
            backgroundColor: '#88B4E3',
            '&:hover': {
                backgroundColor: '#6595DA',
            },
        },
    }))(Button);

    const storylineChart = (storyline) => {
        const chartOptions = {
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        let label = 'Event: ' + data.datasets[tooltipItem.datasetIndex].effect[tooltipItem.index].toLowerCase() + ', Intencity: ' + tooltipItem.value || '';
                        return label
                    },
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 10
                    }
                }]
            }
        }

        const data = {
            labels: [],
            datasets: [
                {
                    label: 'Storyline intensity',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: '#9EC1CF',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: [],
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 10,
                    pointHoverRadius: 12,
                    pointHoverBackgroundColor: [],
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    effect: [],
                }
            ]
        };

        const info = (i) => {
            data.labels.push(i.title);
            data.datasets[0].data.push(i.intensity);
            data.datasets[0].pointBorderColor.push(i.color);
            data.datasets[0].pointHoverBackgroundColor.push(i.color);
            data.datasets[0].effect.push(i.effect)
        };

        storyline.map(i => info(i));

        return <Grid item xs={12} className={classes.chartHeight}>
            <Line data={data} options={chartOptions} />
        </Grid >
    }

    return (
        <>
            {charactersInfo.length > 0 ?
                <Grid container spacing={8}>
                    {charactersInfo.map((i) =>
                        <Grid item xs={12} key={i.id} align="center">
                            <Typography variant="h6"> {i.name} </Typography>
                            {i.story.length === 0 ?
                                <CustomButton variant="contained" onClick={() => openCharacter(i.id)}>Create Storyline</CustomButton>
                                :
                                storylineChart(i.story)
                            }
                        </Grid>
                    )}
                </Grid>
                : charactersInfo.length === 0 ?
                    <Typography variant="h6" align="center">
                        Start planing your book by creating its characters, and story lines!
                    </Typography>
                    : null
            }
        </>
    )
}

CharactersOverview.propTypes = {
    openCharacter: PropTypes.func.isRequired,
    characters: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    characters: state.characters,
})

export default connect(mapStateToProps, { openCharacter })(CharactersOverview);