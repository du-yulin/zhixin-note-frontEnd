/**
 * @description 用户浏览笔记记录
 */
import { ref,reactive,computed } from 'vue'
import { defineStore } from 'pinia'

import { useUserStore } from './user'


const MaxHistoryLength = 10 // 最大储存用户记录数
const MaxUserHistoryLength = 10 // 单个用户浏览记录最大储存数

interface HistoryItem {
  id: Id
  title: string
}

interface AllHistory {
  [key:Id]: HistoryItem[]
}

export const useHistoryStore = defineStore('userHistory', () => {
  const userStore = useUserStore()
  const allHistory = reactive<AllHistory>({})

  // 获取用户浏览记录
  const userHistory = computed(() => {
    const userId = userStore.user?.id
    if (userId === undefined)  return []
    return allHistory[userId] || []
  })
  // 添加用户浏览记录
  const addUserHistory = ({ id, title }: HistoryItem) => {
    if (!userStore.user) return
    const userId = userStore.user.id
    // 判断用户在记录中是否存在，存在则判断是否超过单个用户浏览记录最大储存数，然后添加到第一个；
    // 没有则判断是否超过最大储存数，超过则删除第一个，然后添加；
    if (allHistory[userId]) {
      if (allHistory[userId].length >= MaxUserHistoryLength) {
        allHistory[userId].pop()
      }
      allHistory[userId].unshift({ id, title })
    } else {
      if (Object.keys(allHistory).length >= MaxHistoryLength) {
        const oldestUserId = Object.keys(allHistory)[0]
        delete allHistory[oldestUserId]
      }
      allHistory[userId] = [{ id, title }]
    }
  }
  return {
    allHistory,
    userHistory,
    addUserHistory
  }
  
},{persist:true})
