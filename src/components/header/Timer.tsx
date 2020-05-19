import React from "react"

const Timer = (): React.ReactElement => {

    const [time, setTime] = React.useState(0)

    function startTimer(): void {
        setInterval(()=> setTime(prev => prev + 1),1000)
    } 

    React.useEffect(()=>{
        startTimer()
    },[])

    return(
        <p>
            {new Date(time * 1000).toISOString().substr(11, 8)}
        </p>
    )
}

export default Timer