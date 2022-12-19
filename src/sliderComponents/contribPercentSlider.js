import React from 'react'
import { Slider, Typography, Input, Grid } from '@material-ui/core'
import ValueLabelComponent from './valueLabelComponent'
import { useCookies } from 'react-cookie'

function ContribSlider(props) {

    const [value, setValue] = React.useState(Number(useCookies()[0].contribPercent || 20));

    const marks = [
        {
          value: 0,
          label: '0%',
        },
        {
          value: 5,
          label: '5%',
        },
        {
          value: 10,
          label: '10%',
        },
        {
          value: 15,
          label: '15%',
        },
        {
            value: 20,
            label: '20%',
          },
          {
            value: 25,
            label: '25%',
          }
    ];

    function valuetext(value) {
        return `${value}%`
    }

    const handleBlur = () => {
        if (value < 0) {
          setValue(0);
        } else if (value > 25) {
          setValue(25);
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
                    Percent to contribute
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Input 
                            value={value}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 5,
                                min: 0,
                                max: 25,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            defaultValue={15}
                            getAriaValueText={valuetext}
                            min={0}
                            max={25}
                            aria-labelledby="discrete-slider-always"
                            onChange={handleSliderChange}
                            value={typeof value === 'number' ? value : 0}
                            step={0.25}
                            marks={marks}
                            ValueLabelComponent={ValueLabelComponent}
                        />
                    </Grid>
                </Grid>
            </div>
    )

}

export default ContribSlider