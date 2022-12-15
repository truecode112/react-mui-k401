import React from 'react'
import { Slider, Typography, Input, Grid } from '@material-ui/core'
import ValueLabelComponent from './valueLabelComponent'
import { useCookies } from 'react-cookie'

function EmployerMatchSlider(props) {

    const [value, setValue] = React.useState(Number(useCookies()[0].employerMatch || 25));

    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 25,
            label: '25%',
        },
        {
            value: 50,
            label: '50%',
        },
        {
            value: 75,
            label: '75%',
        },
        {
            value: 100,
            label: '100%',
        }
    ];

    const handleBlur = () => {
        if (value < 0) {
          setValue(0);
        } else if (value > 100) {
          setValue(100);
        }
    };

    const handleSliderChange = (event, newValue) => {
        props.slide(newValue)
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Input 
                            value={value}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            defaultValue={25}
                            valueLabelFormat={(x) => x}
                            onChange={handleSliderChange}
                            value={typeof value === 'number' ? value : 0}
                            step={1}
                            marks={marks}
                            ValueLabelComponent={ValueLabelComponent}
                        />
                    </Grid>
                </Grid>
            </div>
    )

}

export default EmployerMatchSlider