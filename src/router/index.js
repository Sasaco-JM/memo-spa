import { createRouter, createWebHistory } from 'vue-router'
import MemoList from '@/views/MemoList.vue'
import MemoEdit from '@/components/MemoEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MemoList',
      component: MemoList,
      children: [
        {
          path: '/memo/edit/:id',
          name: 'MemoEdit',
          components: { edit: MemoEdit }
        }
      ]
    }
  ]
})

export default router
