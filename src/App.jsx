import { useDispatch, useSelector } from "react-redux"
import { Chart } from "./componenets/Chart"
import { useRef } from "react"
import { addChart } from "./feature/todoSlice"



const App = () => {
  const {charts} = useSelector(state => state.todo)
  const chartRef = useRef(null)
  const dispatch = useDispatch()

  

  return <main className="p-4">
    <div className="flex justify-end items-center p-4">
      <div >
      <input ref={chartRef} type="text" placeholder="write your chart" className='border-2 p-1 border-slate-400 rounded-md'/>
      <button onClick={() => {
        dispatch(addChart(chartRef.current.value))
        chartRef.current.value = ""
      }} className="mt-4 ml-auto py-1.5 px-4 bg-slate-500 text-white rounded-md">Add</button>
      </div>
    </div>
    {
      charts.length == 0 ?
      <section className="w-full h-[80vh] flex justify-center items-center">
      <h1 className="text-3xl font-bold text-green-400">Start with a new chart...</h1>
    </section>
    :
    <section className="flex gap-4 justify-evenly items-center">
    {
      charts.map(chart => <Chart key={chart.id} {...chart}  />)
    }
  </section>
    }
    
  </main>
}

export default App