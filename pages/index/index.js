//index.js
//获取应用实例
const app = getApp()

Page({

  updateShowTodoList: function (todoList, filter) {
    switch (filter) {
      case 'all': {
        this.setData({
          showTodoList: todoList
        })
        break
      }
      case 'active': {
        this.setData({
          showTodoList: todoList.filter(function (item) {
            return item.checked == false
          })
        })
        break
      }
      case 'completed': {
        this.setData({
          showTodoList: todoList.filter(function (item) {
            return item.checked == true
          })
        })
      }
    }
  },

	filterTodoItems: function (event) {
    const tapFilterBtn = event.target.id
    if (tapFilterBtn == this.data.filter) return

    this.updateShowTodoList(this.data.todoList, tapFilterBtn)
    this.setData({
      filter: tapFilterBtn
    })
	},

	deleteTodoItem: function (event) {
    const deleteItemName = event.target.id
    const newTodoList = this.data.todoList.filter(function (item) {
      return item.name !== deleteItemName
    })

    this.updateShowTodoList(newTodoList, this.data.filter)
    this.setData({
      todoList: newTodoList
    })
  },

  bindKeyInput: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
  },

  addTodoItem: function (event) {
    const todoItem = {
      name: this.data.inputValue,
      value: this.data.inputValue,
      checked: false
    }
    const newTodoList = this.data.todoList.concat(todoItem)

    this.updateShowTodoList(newTodoList, this.data.filter)
    this.setData({
      todoList: newTodoList,
      inputValue: ''
    })
  },

  completeTodoItem: function (event) {
    const completedItem = event.detail.value
    const newTodoList = this.data.todoList.map(function (item) {
      if (completedItem.includes(item.name)) return {...item, checked: true}
      return {...item, checked: false}
    })

    this.updateShowTodoList(newTodoList, this.data.filter)
    this.setData({
      todoList: newTodoList
    })
  },

  data: {
    inputValue: '',
    todoList: [],
    showTodoList: [],
    filter: 'all'
  },
})
