function addTask(parent, args, context, info) {
    const { name } = args

    return context.db.mutation.createTask({ data: { name } }, info)
}

function deleteTask(parent, args, context, info) {
    const { id } = args
    const where = { id }

    return context.db.mutation.deleteTask({ where }, info)
}

function editTask(parent, args, context, info) {
    const { id, name } = args
    const where = { id }
    const data = { name }

    return context.db.mutation.updateTask({ data, where }, info)
}

function toggleDone(parent, args, context, info) {
    const { id, isDone } = args
    const where = { id }
    const data = { isDone }

    return context.db.mutation.updateTask({ data, where }, info)
}

module.exports = {
    addTask,
    deleteTask,
    editTask,
    toggleDone
}