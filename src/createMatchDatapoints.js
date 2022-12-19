export default function({contribPercent, annualSalary, annualRaise, currentAge, retirementAge, currentBalance, annualRateOfReturn, employerMatch, employerMatchCap, employerSetType}) {

    let data = []

    let valArray = []

    let totalEarn = 0

    for (let i = 0; i < retirementAge - currentAge; i++) {

        let effectiveRaiseForYear = (1 + (annualRaise/100)) ** i

        let yearlySalary = (annualSalary * effectiveRaiseForYear)

        let employeeContribition = yearlySalary * (contribPercent/100)

        if (employeeContribition > 19500) {
            employeeContribition = 19500
        }

        let startingBalance = i === 0 ? currentBalance : valArray[i-1]

        let realEmployerMatch = employeeContribition * (employerMatch/100); //contribPercent > employerMatchCap ? employerMatchCap : contribPercent

        let employerContribution = annualSalary * (employerMatchCap/100)

        let endOfYearTotalBeforeInterest = startingBalance + employeeContribition
        
        if( employerSetType == 1 ){
            // console.log("employerContribution", employerContribution)
            endOfYearTotalBeforeInterest += employerContribution
        }
        else {
            // console.log("realEmployerMatch", realEmployerMatch)
            endOfYearTotalBeforeInterest += realEmployerMatch
        }

        let endOfYearTotalAfterInterest = endOfYearTotalBeforeInterest * (1 + (annualRateOfReturn/100))
        
        console.log(endOfYearTotalBeforeInterest)

        valArray.push(endOfYearTotalAfterInterest)

        totalEarn = endOfYearTotalAfterInterest

    }
    data["totalEarn"] = totalEarn
    data["valArray"] = valArray

    return data

}