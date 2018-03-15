//index.js
//获取应用实例
const app = getApp()

Page({
	deleteTodoItem: function (event) {
    const deleteItemName = event.target.id
    const newTodoList = this.data.todoList.filter(function (item) {
      return item.name !== deleteItemName
    })

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
    this.setData({
      todoList: this.data.todoList.concat(todoItem),
      inputValue: ''
    })
  },

  completeTodoItem: function (event) {
    const completedItem = event.detail.value
    const newTodoList = this.data.todoList.map(function (item) {
      if (completedItem.includes(item.name)) return {...item, checked: true}
      return {...item, checked: false}
    })

    this.setData({
      todoList: newTodoList
    })
  },

  data: {
    inputValue: '',
    todoList: []
  },
  
})
