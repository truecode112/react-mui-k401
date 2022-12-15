import React from 'react'
import { Slider, Typography, Input, Grid } from '@material-ui/core'
import ValueLabelComponent from './valueLabelComponent'
import { useCookies } from 'react-cookie'

function EmployerMatchCapSlider(props) {

    const [value, setValue] = React.useState(Number(useCookies()[0].employerMatchCap || 6));

    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 2.5,
            label: '2.5%',
        },
        {
            value: 5,
            label: '5%',
        },
        {
            value: 7.5,
            label: '7.5%',
        },
        {
            value: 10,
            label: '10%',
        }
    ];

    function valuetext(value) {
        return `${value}%`
    }

    const handleBlur = () => {
        if (value < 0) {
          setValue(0);
        } else if (value > 10) {
          setValue(10);
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
                                max: 10,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            min={0}
                            max={10}
                            defaultValue={6}
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

export default EmployerMatchCapSlider