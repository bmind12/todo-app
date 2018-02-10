function todoList(parent, args, context, info) {
    const { first, isDone, last } = args
    const where = ( typeof isDone !== 'undefined')
      ? { isDone }
      : {}

    return context.db.query.tasks({ first, last, where }, info)
}

module.exports = {
    todoList,
}