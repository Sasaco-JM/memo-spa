<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMemoStore } from '@/stores/memo.js'

const route = useRoute()
const memosStore = useMemoStore()
memosStore.editingId =
  route.params.id !== undefined && route.params.id !== ''
    ? parseInt(route.params.id, 10)
    : undefined
const content = ref(memosStore.getMemoContent(memosStore.editingId))

const updateMemo = () => {
  memosStore.updateMemo(memosStore.editingId, content)
}
const removeMemo = () => {
  memosStore.removeMemo(memosStore.editingId)
}

watch(
  () => route.params.id,
  (paramId) => {
    memosStore.editingId =
      paramId !== undefined && paramId !== '' ? parseInt(paramId, 10) : undefined
    if (memosStore.editingId) {
      content.value = memosStore.getMemoContent(memosStore.editingId)
    }
  }
)
</script>

<template>
  <h1>Edit Field</h1>
  <main>
    <textarea v-model="content"></textarea>
    <button @click="updateMemo" class="update">編集</button>
    <button @click="removeMemo" class="delete">削除</button>
  </main>
</template>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
}
</style>
