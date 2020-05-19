import React from "react"
import TimerButton from "./TimerButton"
import TimerText from "./TimerText"

interface Props {
    isPaused: boolean;
    setIsPaused: Function;
}

interface Timer extends React.FunctionComponent{
    timer: number;
}

const Timer = ({isPaused, setIsPaused}: Props): React.ReactElement => {

    const [time, setTime] = React.useState(0)

    function startTimer(): void {
        Timer.timer = setInterval(()=> setTime(prev => prev + 1),1000)
    } 

    function stopTimer(): void {
        clearInterval(Timer.timer)
    }

    React.useEffect(()=>{
        if (isPaused) {
            stopTimer()
        } else {
            startTimer()
        }
        return((): void => {
            stopTimer()
        })
    },[isPaused])

    return(
        <div>
            <TimerText>
                {new Date(time * 1000).toISOString().substr(11, 8)}
            </TimerText>
            <TimerButton onClick={(): void => {
                    setIsPaused(!isPaused)
                    console.log(isPaused)}}>
                {isPaused ? "R" : "P"}
            </TimerButton>
        </div>
    )
}

Timer.timer = 0

export default Timer