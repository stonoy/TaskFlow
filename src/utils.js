export const provideId = Math.floor(Math.random()*Math.random()*(new Date().getTime()))

export const findTasksByChartId = (chartId, tasks) => tasks.filter(task => task.chartId == chartId)

function parent(n){

    return () => {
        n += 100
        return n
    }
}

export const provideCreatedAt = parent(100)

function debounce( duration){
    let b

    return (cb) => {
        clearTimeout(b)
        b = setTimeout(cb, duration)
    }
}

export const call = debounce(1000)