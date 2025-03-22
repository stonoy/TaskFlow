import {createSlice} from "@reduxjs/toolkit"
import { data, tasks } from "../data"
import {v4 as uuidv4} from "uuid"
import { provideCreatedAt } from "../utils"

const initialState = {
    charts : [],
    tasks: [],
    draggingTask: null,
}

const todoSlice = createSlice({
    name : "todo",
    initialState: JSON.parse(localStorage.getItem("state")) || initialState,
    reducers: {
        addChart : (state, {payload}) => {
            state.charts = [...state.charts, {id: uuidv4(), name: payload}]
            todoSlice.caseReducers.saveStateToStorage(state)
        },
        addTask: (state, {payload}) => {
            const {headerText,bodyText,id} = payload

            const newTask = {
                id: uuidv4(),
                createdAt: provideCreatedAt(),
                chartId:id,
                header: headerText,
                body: bodyText
            }

            

            state.tasks = [...state.tasks, newTask]
            todoSlice.caseReducers.saveStateToStorage(state)
        },
        editTask: (state, {payload}) => {
            const {headerText,bodyText,id} = payload

            // console.log(headerText,bodyText,id)

            const newTasks  = state.tasks.map(task => {
                if (task.id == id){
                    return {...task, header: headerText,
                        body: bodyText}
                } else {
                    return task
                }
            })

            

            state.tasks = newTasks
            todoSlice.caseReducers.saveStateToStorage(state)
        },
        deleteTask: (state, {payload}) => {
            state.tasks = state.tasks.filter(task => task.id != payload.id)
            todoSlice.caseReducers.saveStateToStorage(state)
        },
        handleDraggingTask : (state, {payload: {type, id}}) => {
            // console.dir(y)
            if (type == "start"){
                state.draggingTask = state.tasks.find(task => task.id == id)
            } 
            // else {
            //     state.draggingTask = null
                
            // }

            todoSlice.caseReducers.saveStateToStorage(state)
        },
        relocate: (state, {payload: {taskId, chartId}}) => {
            

            const theNextTask = state.tasks.find(task => task.id == taskId)

            state.tasks = state.tasks.map(task => {
                if (task.id == state.draggingTask.id){
                    return {...task, chartId, createdAt: theNextTask ? theNextTask.createdAt-1 : provideCreatedAt()}
                } else {
                    return task
                }
            })

            todoSlice.caseReducers.saveStateToStorage(state)
        },
        changeChartName: (state, {payload: {id,name}}) => {
            state.charts = state.charts.map(chart => {
                if (chart.id == id){
                    return {...chart, name}
                } else {
                    return chart
                }
            })

            todoSlice.caseReducers.saveStateToStorage(state)
        },
        deleteChart: (state, {payload:{id}}) => {
            state.charts = state.charts.filter(chart => chart.id != id)
            todoSlice.caseReducers.saveStateToStorage(state)
        },
        saveStateToStorage: (state) => {
            localStorage.setItem("state", JSON.stringify(state))
        }
    }
})

export const {addChart, addTask, deleteTask, editTask, handleDraggingTask, relocate, changeChartName, deleteChart} = todoSlice.actions

export default todoSlice.reducer