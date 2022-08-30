import { Response, Request } from 'express'
import { ITodo } from '../../types/todo.type'
import Todo from './../../models/todo.model'

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).send({
            todo: todos,
            statusCode: 200,
            message: 'successfully',

        })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>

        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        }) 

        const newTodo: ITodo = await todo.save()
        // const allTodos: ITodo[] = await Todo.find()

        res.status(201).send({ 
            todo: newTodo,
            statusCode: 201,
            message: 'Todo added',
        })
    } catch (error) {
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        // const allTodos: ITodo[] = await Todo.find()
        res.status(200).send({
            todo: updateTodo,
            // todos: allTodos,
            statusCode: 200,
            message: 'Todo updated',


        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).send({
            todo: deletedTodo,
            todos:allTodos,
            statusCode: 200,
            message: 'Todo deleted'

        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }