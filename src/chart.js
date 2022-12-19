import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Paper, Typography, Grid, hexToRgb } from '@material-ui/core'

let totalEarn = 0

function BarChart(props) {

    const addCommas = (num) =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let data = {
        labels: props.labels,
        datasets: [
            {
                backgroundColor: 'rgba(252, 88, 88, 0.5)',
                borderColor: 'rgb(252, 88, 88)',
                category: "No employer match",
                data: props.noMatchData.valArray.map(val => {
                    return Math.trunc(val)
                }),
                label: "No employer match",
            },
            {
                backgroundColor: 'rgba(66, 183, 255, 0.5)',
                borderColor: 'rgb(66, 183, 255)',
                category: "With employer match",
                data: props.matchData.valArray.map(val => {
                    return Math.trunc(val)
                }),
                label: "With employer match"
            }
        ]
    }

    const options = {
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                gridLines : {
                    display : false
                },
                tricks: {
                    
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    userCallback: function(value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }
                }
            }]
        }    
   }

    return (
        <Paper style={{marginTop: '5%', marginBottom: '5%', marginLeft: '10%', marginRight: '10%'}}>
            <Grid container>
                <Grid item xs={6} style={{padding: '25px', border: "2px" }}>
                    <Typography component="p" variant="h4">
                        ${addCommas(parseInt(props.matchData.totalEarn - props.noMatchData.totalEarn))}
                    </Typography>
                    <Typography color="textSecondary">
                        Actual contributions 
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{padding: '25px', border: "2px" }}>
                    <Typography component="p" variant="h4">
                        ${addCommas(parseInt(props.matchData.totalEarn))}
                    </Typography>
                    <Typography color="textSecondary">
                        Estimated balance at retirement
                    </Typography>
                </Grid>
            </Grid>
            
            <Bar
                data={data}
                options={options}
            />
        </Paper>
        
    )

}

export default BarChart