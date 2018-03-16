//index.js
//获取应用实例
const app = getApp()

Page({
  touchE: function (event) {
    if (event.changedTouches.length == 1) {
      //手指移动结束后水平位置
      const endX = event.changedTouches[0].clientX
      //触摸开始与结束，手指移动的距离
      const disX = this.data.startX - endX
      var delBtnWidth = this.data.delBtnWidth
      //如果距离小于删除按钮的1/2，不显示删除按钮
      const txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px"
      //获取手指触摸的是哪一项
      const index = event.target.dataset.index
      const list = this.data.showTodoList
      list[index].txtStyle = txtStyle
      //更新列表的状态
      this.setData({
        showTodoList: list
      })
    }
  },

  touchM: function (event) {
    if (event.touches.length == 1) {
      this.initDataTxtStyle()
      const moveX = event.touches[0].clientX
      const disX = this.data.startX - moveX
      let txtStyle = ""
      if (disX <= 0) {
        txtStyle = "left: 0px"
      } else if(disX > 0) {
        txtStyle = "left:-" + disX + "px";
        if (disX >= this.data.delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + this.data.delBtnWidth + "px";
        }
      }

      var index = event.target.dataset.index;
      var list = this.data.showTodoList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        showTodoList: list
      });
    }
  },

  touchS: function (event) {
    if (event.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: event.touches[0].clientX
      })
    }
  },

  initDataTxtStyle: function () {
    var list = this.data.showTodoList
    for (var i = 0; i < list.length; i++) {
      list[i].txtStyle = ""
    }
    this.setData({ showTodoList: list })
  },

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
    delBtnWidth: 180,//删除按钮宽度单位（rpx）
    todoList: [
      {name: '123', value: '123', checked: false, txtStyle: ''},
      {name: 'df', value: 'df', checked: false, txtStyle: ''},
    ],
    showTodoList: [
      {name: '123', value: '123', checked: false, txtStyle: ''},
      {name: 'df', value: 'df', checked: false, txtStyle: ''},
    ],
    filter: 'all'
  },
})
