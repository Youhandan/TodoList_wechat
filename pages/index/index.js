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

  changeTodoItemStatus: function (event) {
    const completedItem = event.detail.value
    let newTodoList = []
    if (this.data.filter == 'active') {
      newTodoList = this.data.todoList.map(function (item) {
        if (completedItem.includes(item.name)) return {...item, checked: true}
        return item
      })
    } else {
      newTodoList = this.data.todoList.map(function (item) {
        if (completedItem.includes(item.name)) return {...item, checked: true}
        return {...item, checked: false}
      })
    }

    this.updateShowTodoList(newTodoList, this.data.filter)
    this.setData({
      todoList: newTodoList
    })
  },

  data: {
    inputValue: '',
    todoList: [
      {name: '123', value: '123', checked: false},
      {name: 'df', value: 'df', checked: false},
      {name: '153', value: '153', checked: false},
      {name: '1vf3', value: '1vf3', checked: false},
      {name: '1df23', value: '1df23', checked: false},
      {name: '1fdg23', value: '1fdg23', checked: false},
      {name: '1vzz23', value: '1vzz23', checked: false},
      {name: '1cvx23', value: '1cvx23', checked: false},
      {name: '12xcv3', value: '12xcv3', checked: false},
      {name: '12xcvg3', value: '12xcvg3', checked: false},
      {name: ' gggfx', value: 'gggfx', checked: false},
      {name: '1cvxz23', value: '1cvxz23', checked: false},
      {name: '1vfv23', value: '1vfv23', checked: false},
      {name: '1yui23', value: '1yui23', checked: false},
      {name: '1iii23', value: '1iii23', checked: false},
      {name: '1mmm23', value: '1mmm23', checked: false},
    ],
    showTodoList: [
      {name: '123', value: '123', checked: false},
      {name: 'df', value: 'df', checked: false},
      {name: '153', value: '153', checked: false},
      {name: '1vf3', value: '1vf3', checked: false},
      {name: '1df23', value: '1df23', checked: false},
      {name: '1fdg23', value: '1fdg23', checked: false},
      {name: '1vzz23', value: '1vzz23', checked: false},
      {name: '1cvx23', value: '1cvx23', checked: false},
      {name: '12xcv3', value: '12xcv3', checked: false},
      {name: '12xcvg3', value: '12xcvg3', checked: false},
      {name: ' gggfx', value: 'gggfx', checked: false},
      {name: '1cvxz23', value: '1cvxz23', checked: false},
      {name: '1vfv23', value: '1vfv23', checked: false},
      {name: '1yui23', value: '1yui23', checked: false},
      {name: '1iii23', value: '1iii23', checked: false},
      {name: '1mmm23', value: '1mmm23', checked: false},
    ],
    filter: 'all'
  },
})
