<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import Checkbox from 'primevue/checkbox'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const description = ref('')
const price = ref<number>()
const phone = ref('')
const used = ref(false)
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <h1 class="text-4xl font-semibold text-surface-900 dark:text-surface-0 tracking-tight">
      Створити оголошення
    </h1>

    <Card>
      <template #content>
        <form class="flex flex-col gap-6" @submit.prevent>
          <div class="flex flex-col gap-2">
            <label for="title" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              Назва
            </label>
            <InputText
              id="title"
              v-model="title"
              placeholder="Введіть назву оголошення"
              class="w-full"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="description" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              Опис
            </label>
            <Textarea
              id="description"
              v-model="description"
              rows="5"
              placeholder="Детальний опис товару"
              class="w-full"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col gap-2">
              <label for="price" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Ціна (₴)
              </label>
              <InputNumber
                id="price"
                v-model="price"
                :min="0"
                placeholder="0.00"
                class="w-full"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="phone" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Телефон
              </label>
              <InputText
                id="phone"
                v-model="phone"
                placeholder="+380..."
                class="w-full"
              />
            </div>
          </div>

          <div class="flex items-center gap-2">
            <Checkbox
              v-model="used"
              input-id="used"
              binary
            />
            <label for="used" class="text-sm font-medium text-surface-700 dark:text-surface-300 cursor-pointer">
              Товар був у використанні
            </label>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-surface-700 dark:text-surface-300">
              Фотографії
            </label>
            <FileUpload
              mode="basic"
              accept="image/*"
              :max-file-size="5000000"
              choose-label="Вибрати фото"
              class="w-full"
            />
          </div>

          <div class="flex gap-4 justify-end pt-4">
            <Button
              label="Скасувати"
              severity="secondary"
              text
              @click="router.back()"
            />
            <Button
              type="submit"
              label="Опублікувати"
              icon="pi pi-check"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>
