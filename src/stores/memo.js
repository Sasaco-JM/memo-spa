import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useMemoStore = defineStore('memos', () => {
  const router = useRouter()
  const STORAGE_KEY = 'memo-spa-vue'
  const editingId = ref('')

  const memoStorage = {
    fetch() {
      const memos_data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      memos_data.forEach(function (memo, index) {
        memo.id = index
      })
      memoStorage.uid = memos_data.length
      return memos_data
    },
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memos.value))
    }
  }

  const memos = ref(memoStorage.fetch())

  const getTitle = (memo) => {
    return memo.content.split('\n')[0]
  }

  const getMemoContent = (id) => {
    const targetMemo = memos.value.find((memo) => memo.id === id)
    return targetMemo.content
  }

  const addMemo = () => {
    const id = memoStorage.uid++
    const content = '新しいメモ'

    memos.value.push({
      id: id,
      content: content
    })
    memoStorage.save()
    router.push({ name: 'MemoEdit', params: { id: id } })
  }

  const updateMemo = (id, content) => {
    const targetMemo = memos.value.find((memo) => memo.id === id)
    targetMemo.content = content
    memoStorage.save()
    router.push({ name: 'MemoList' })
  }

  const removeMemo = (id) => {
    memos.value = memos.value.filter((memo) => memo.id !== id)
    memoStorage.save()
    router.push({ name: 'MemoList' })
  }

  return {
    memoStorage,
    memos,
    editingId,
    getTitle,
    getMemoContent,
    addMemo,
    updateMemo,
    removeMemo
  }
})
