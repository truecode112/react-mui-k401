import React from 'react'
import { Slider, Typography, Input, Grid } from '@material-ui/core'
import ValueLabelComponent from './valueLabelComponent'
import { useCookies } from 'react-cookie'

function RetirementAgeSlider(props) {

    const [value, setValue] = React.useState(Number(useCookies()[0].retirementAge || 55));

    const marks = [
        {
            value: 55,
            label: '55',
        },
        {
            value: 60,
            label: '60',
        },
        {
            value: 65,
            label: '65',
        },
        {
            value: 70,
            label: '70',
        },
        {
            value: 75,
            label: '75',
        },
        {
            value: 80,
            label: '80',
        },

    ];

    function valuetext(value) {
        return `${value}`
    }

    const handleBlur = () => {
        if (value < 55) {
          setValue(55);
        } else if (value > 80) {
          setValue(80);
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
                <Typography gutterBottom>
                    Retirement age
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Input 
                            value={value}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 3,
                                min: 55,
                                max: 80,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            min={55}
                            max={80}
                            defaultValue={62}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
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

export default RetirementAgeSlider