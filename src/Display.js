import React from 'react'
// import { compose } from 'redux'
import { Paper, Slider, Grid, Typography, Divider, Select, MenuItem, InputLabel } from '@material-ui/core'
import { Line } from 'react-chartjs-2'
import ContribSlider from './sliderComponents/contribPercentSlider'
import SalarySlider from './sliderComponents/annualSalarySlider'
import AnnualSalaryIncreaseSlider from './sliderComponents/annualSalaryIncreaseSlider'
import CurrentAgeSlider from './sliderComponents/startAgeSlider'
import RetirementAgeSlider from './sliderComponents/retirementAgeSlider'
import CurrentBalanceSlider from './sliderComponents/currentBalanceSlider'
import RateOfReturnSlider from './sliderComponents/rateOfReturnSlider'
import EmployerMatchSlider from './sliderComponents/employerMatchSlider'
import EmployerMatchCapSlider from './sliderComponents/employerMatchCapSlider'
import BarChart from './chart'
import createNoMatchDatapoints from './createNoMatchDatapoints'
import createMatchDatapoints from './createMatchDatapoints'
import createLabels from './createLabels'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Display extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        
        const { cookies } = this.props;

        this.classes = props.classes
        
        console.log( "cookies", cookies)

        this.state = {
            contribPercent: Number(cookies.get('contribPercent') || 20),
            annualSalary: Number(cookies.get('annualSalary') || 100000),
            annualRaise: Number(cookies.get('annualRaise') || 5),
            currentAge: Number(cookies.get('currentAge') || 27),
            retirementAge: Number(cookies.get('retirementAge') || 55),
            currentBalance: Number(cookies.get('currentBalance') || 10000),
            annualRateOfReturn: Number(cookies.get('annualRateOfReturn') || 7),
            riskTolerance: Number(cookies.get('riskTolerance') || 1),
            employerMatch: Number(cookies.get('employerMatch') || 25),
            employerMatchCap: Number(cookies.get('employerMatchCap') || 6),
            employerSetType: Number(cookies.get('employerSetType') || 0),
        }

        cookies.set('contribPercent', this.state.contribPercent)
        cookies.set('annualSalary', this.state.annualSalary)
        cookies.set('annualRaise', this.state.annualRaise)
        cookies.set('currentAge', this.state.currentAge)
        cookies.set('retirementAge', this.state.retirementAge)
        cookies.set('annualRateOfReturn', this.state.annualRateOfReturn)
        cookies.set('employerMatch', this.state.employerMatch)
        cookies.set('employerMatchCap', this.state.employerMatchCap)

        this.handleContribSliderChange = this.handleContribSliderChange.bind(this)
        this.handleAnnualSalarySliderChange = this.handleAnnualSalarySliderChange.bind(this)
        this.handleAnnualRaiseSliderChange = this.handleAnnualRaiseSliderChange.bind(this)
        this.handleCurrentAgeSlider = this.handleCurrentAgeSlider.bind(this)
        this.handleRetirementAgeSlider = this.handleRetirementAgeSlider.bind(this)
        this.handleCurrentBalanceSlider = this.handleCurrentBalanceSlider.bind(this)
        this.handleRateOfReturnSlider = this.handleRateOfReturnSlider.bind(this)
        this.handleEmployerMatchSlider = this.handleEmployerMatchSlider.bind(this)
        this.handleEmployerMatchCapSlider = this.handleEmployerMatchCapSlider.bind(this)
        this.handleChangeEmployer = this.handleChangeEmployer.bind(this)
    }

    handleContribSliderChange(val) {
        const { cookies } = this.props;
        this.setState({...this.state, contribPercent: val})
        cookies.set('contribPercent', val)
    }

    handleAnnualSalarySliderChange(val) {
        const { cookies } = this.props;
        this.setState({...this.state, annualSalary: val})
        cookies.set('annualSalary', val)
    }

    handleAnnualRaiseSliderChange(val) {
        const { cookies } = this.props;
        this.setState({...this.state, annualRaise: val})
        cookies.set('annualRaise', val)
    }

    handleCurrentAgeSlider(val) {
        const { cookies } = this.props;
        this.setState({...this.state, currentAge: val})
        cookies.set('currentAge', val)
    }

    handleRetirementAgeSlider(val) {
        const { cookies } = this.props;
        this.setState({...this.state, retirementAge: val})
        cookies.set('retirementAge', val)
    }

    handleCurrentBalanceSlider(val) {
        const { cookies } = this.props;
        this.setState({...this.state, currentBalance: val})
        cookies.set('currentBalance', val)
        console.log(val)
    }

    handleRateOfReturnSlider(val) {
        const { cookies } = this.props;
        this.setState({...this.state, annualRateOfReturn: val})
        cookies.set('annualRateOfReturn', val)
    }

    handleEmployerMatchSlider(val) {
        const { cookies } = this.props;
        this.setState({...this.state, employerMatch: val})
        cookies.set('employerMatch', val)
    }

    handleEmployerMatchCapSlider(val) {
        const { cookies } = this.props;
        this.setState({...this.state, employerMatchCap: val})
        cookies.set('employerMatchCap', val)
    }

    handleChangeEmployer(val) {
        console.log("employerSetType", val.target.value)

        this.setState({...this.state, employerSetType: val.target.value})
    }

    render() {

        // createNoMatchDatapoints(this.state)

        return (
                <Paper style={{marginTop: '5%', marginBottom: '5%', marginLeft: '10%', marginRight: '10%'}}>
                    <Grid container>
                        <Grid item xs={5} style={{padding: '25px'}}>
                            <Typography variant="h5" gutterBottom>
                                401(k) Employee Savings Plan
                            </Typography>
                            <ContribSlider slide={this.handleContribSliderChange}/>
                            <SalarySlider slide={this.handleAnnualSalarySliderChange}/>
                            <AnnualSalaryIncreaseSlider slide={this.handleAnnualRaiseSliderChange}/>
                            <CurrentAgeSlider slide={this.handleCurrentAgeSlider}/>
                            <RetirementAgeSlider slide={this.handleRetirementAgeSlider}/>
                            <CurrentBalanceSlider slide={this.handleCurrentBalanceSlider}/>
                            <RateOfReturnSlider slide={this.handleRateOfReturnSlider}/>
                            <Divider style={{marginTop: '20px', marginBottom:'20px'}}/>
                            <Typography variant="h5" gutterBottom>
                                Employer
                            </Typography>

                            <Select 
                                value={this.state.employerSetType} 
                                onChange={this.handleChangeEmployer}>

                                <MenuItem value={0}>Match</MenuItem>
                                <MenuItem value={1}>Contribution</MenuItem>                                
                            </Select>
                            {
                                this.state.employerSetType == 0 ? 
                                    <EmployerMatchSlider slide={this.handleEmployerMatchSlider}/>
                                :
                                    <EmployerMatchCapSlider slide={this.handleEmployerMatchCapSlider}/>
                            }
                        </Grid>
                        <Grid item xs={7}>
                            <BarChart matchData={createMatchDatapoints(this.state)} noMatchData={createNoMatchDatapoints(this.state)} labels={createLabels(this.state)}/>
                        </Grid>
                    </Grid>
                </Paper>
        )
    }


}

export default withCookies(Display)