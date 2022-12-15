import React from 'react'
import { Slider, Typography, Input, Grid } from '@material-ui/core'
import ValueLabelComponent from './valueLabelComponent'
import { useCookies } from 'react-cookie'

function CurrentAgeSlider(props) {
    
    const [value, setValue] = React.useState(Number(useCookies()[0].currentAge || 27));

    const marks = [
        {
            value: 21,
            label: '21',
        },
        {
            value: 30,
            label: '30',
        },
        {
            value: 40,
            label: '40',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 60,
            label: '60',
        },
        {
            value: 70,
            label: '70',
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
        if (value < 21) {
          setValue(21);
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
                    Current age
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
                                min: 21,
                                max: 80,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            min={21}
                            max={80}
                            defaultValue={26}
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

export default CurrentAgeSlider