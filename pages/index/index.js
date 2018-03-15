//index.js
//获取应用实例
const app = getApp()

Page({
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

  data: {
    inputValue: '',
    todoList: []
  },
  
})
