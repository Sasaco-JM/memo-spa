<script setup>
import { useMemoStore } from '@/stores/memo.js'

const memosStore = useMemoStore()

const getTitle = (memo) => {
  return memosStore.getTitle(memo)
}
const addMemo = () => {
  memosStore.addMemo()
}
</script>

<template>
  <main>
    <div class="list_field">
      <h1>Memo List</h1>
      <ul>
        <li v-for="memo in memosStore.memos" :key="memo.id">
          <span v-if="memo.id === memosStore.editingId">{{ getTitle(memo) }}</span>
          <span v-else>
            <RouterLink :to="{ name: 'MemoEdit', params: { id: memo.id } }">
              {{ getTitle(memo) }}
            </RouterLink>
          </span>
        </li>
      </ul>
      <button @click="addMemo">+</button>
    </div>
    <div class="edit_field">
      <RouterView name="edit" />
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 10px;
  width: 100%;
  display: flex;
}
.list_field {
  margin: 10px;
}
.edit_field {
  margin: 10px;
}
</style>
