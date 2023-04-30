import { createRouter, createWebHistory } from 'vue-router'
import MemoList from '@/views/MemoList.vue'
import MemoEdit from '@/views/MemoEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MemoList',
      component: MemoList,
      children: [
        {
          path: '/memo/:id/edit',
          name: 'MemoEdit',
          components: { edit: MemoEdit }
        }
      ]
    }
  ]
})

export default router
