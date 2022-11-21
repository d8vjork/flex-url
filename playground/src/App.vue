<script setup lang="ts">
import { useToggle } from '@vueuse/shared';
import { ref } from 'vue';
import { FilterableList } from '@flex-url/vue';

const location = ref(window.location.toString())

function refresh(url: string) {
  location.value = url
}

const [useOrFilters, toggleOrFilters] = useToggle()
const [useAfter, toggleUseAfter] = useToggle()
</script>

<template>
  <div class="max-w-4xl mx-auto py-16">
    <input type="text" :value="location" class="w-full focus:outline-none border py-1 px-2 text-zinc-600 mb-3" readonly>

    <FilterableList @update="refresh" :usingOr="useOrFilters">
      <template #default="{ filter, filters }">
        <h1 class="text-2xl font-medium mb-8">Filter by:</h1>
    
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row justify-between">
            <span class="font-semibold">
              Status:
            </span>
            
            <div class="flex items-center space-x-4">
              <button type="button" @click="() => toggleOrFilters()" class="flex items-center bg-zinc-200 rounded-full divide-x">
                <span
                  class="border px-2 py-0.5 text-sm rounded-l-full"
                  :class="[useOrFilters ? 'bg-slate-200' : 'bg-slate-700 text-white']">
                  and
                </span>
                <span
                  class="border px-2 py-0.5 text-sm rounded-r-full"
                  :class="[useOrFilters ? 'bg-slate-700 text-white' : 'bg-slate-200']">
                  or
                </span>
              </button>

              <button
                type="button"
                @click="() => filter('status').toggle('Active')"
                class="border px-2 py-1"
                :class="[filters.includes('status', 'Active') ? 'bg-slate-700 text-white' : 'bg-slate-200']">
                Active
              </button>

              <button
                type="button"
                @click="() => filter('status').toggle('Unpublished')"
                class="border px-2 py-1"
                :class="[filters.includes('status', 'Unpublished') ? 'bg-slate-700 text-white' : 'bg-slate-200']">
                Unpublished
              </button>
              
              <button
                type="button"
                @click="() => filter('status').toggle('Published')"
                class="border px-2 py-1"
                :class="[filters.includes('status', 'Published') ? 'bg-slate-700 text-white' : 'bg-slate-200']">
                Published
              </button>
            </div>
          </div>

          <div class="flex flex-row justify-between">
            <span class="font-semibold">
              Created at:
            </span>
            
            <div class="flex items-center space-x-4">
              <button type="button" @click="() => toggleUseAfter()" class="flex items-center bg-zinc-200 rounded-full divide-x">
                <span
                  class="border px-2 py-0.5 text-sm rounded-l-full"
                  :class="[useAfter ? 'bg-slate-200' : 'bg-slate-700 text-white']">
                  before
                </span>
                <span
                  class="border px-2 py-0.5 text-sm rounded-r-full"
                  :class="[useAfter ? 'bg-slate-700 text-white' : 'bg-slate-200']">
                  after
                </span>
              </button>
  
              <input type="date"
                name="created_at"
                id="created_at"
                @change="(e) => filter('created_at').add(e.target.value, [useAfter ? 'after' : 'before'])"
                class="border p-1">
            </div>
          </div>
        </div>
      </template>
    </FilterableList>
  </div>
</template>
