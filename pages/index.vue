<script setup lang="ts">
import type {PokemonsResponse} from "~/models/pokemon.model";
import type {Type} from "~/models/type.model";
const page = ref(1)
const pageSize = ref(2)

const { find } = useStrapi()

const $filters = ref<string[]>([])

const addFilter = (filter: string) => {
    if (!filter.value) return
    $filters.value.push(filter.value)
    page.value = 1
}

const removeFilter = (filter: string) => {
    const index = $filters.value.indexOf(filter)
    if (index !== -1) {
        $filters.value.splice(index, 1)
        page.value = 1
    }
}

const filters = computed({
    get: () => $filters.value,
    set: (value: string[]) => {
        $filters.value = value
        page.value = 1
    }
})

const { data, pending, error } = await useAsyncData('pokemons', async() => {
    return await find<PokemonsResponse>('pokemons', {
        populate: '*',
        pagination: {
          page: page.value,
          pageSize: pageSize.value
        },
        filters: {
          type: {
            name: {
              $in: $filters.value
            }
          }
        }
    }).then(res => res.data)
},
  {
    watch: [page, filters],
  }
)

const { data: types } = await useAsyncData('prout', async() => {
    return await find<Type>('prout').then(res => res.data)
})

</script>

<template>
    <template v-if="pending">
        <span>Loading...</span>
    </template>
    <template v-else>
      <div v-for="pokemon in data" :key="pokemon.slug">
        <a :href="`/pokemons/${pokemon.slug}`" :key="pokemon.id">{{ pokemon.name }}</a>
      </div>
    <UPagination v-if="pokemons?.meta"
      v-model="page"
      :page-count="pokemons?.meta.pagination.pageCount"
      :total="pokemons?.meta.pagination.total"
    />
    </template>
    <p>{{ data }}</p>
    <template>
      <div v-for="prout in types" :key="prout.id">
        <button>{{ prout.name }}</button>
      </div>
    </template>
</template>

<style scoped></style>