import {v4 as uuidv4} from "uuid"
import { provideCreatedAt } from "./utils"

export const data = [
    {
        id: 1,
        name: "already_done",
        
    },
    {
        id: 2,
        name: "now_doing",
        
    },
    {
        id: 3,
        name: "do_inFuture",
        
    }
]

export const tasks = [
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:1,
        header: "header 1",
        body: "1st chart 1st body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:1,
        header: "header 2",
        body: "1st chart 2nd body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:1,
        header: "header 3",
        body: "1st chart 3rd body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:2,
        header: "header 4",
        body: "2nd chart 1st body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:2,
        header: "header 5",
        body: "2nd chart 2nd body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:2,
        header: "header 6",
        body: "2nd chart 3rd body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:3,
        header: "header 7",
        body: "3rd chart 1st body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:3,
        header: "header 8",
        body: "3rd chart 2nd body"
    },
    {
        id: uuidv4(),
        createdAt: provideCreatedAt(),
        chartId:3,
        header: "header 9",
        body: "3rd chart 3rd body"
    },
]