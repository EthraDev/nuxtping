<script setup lang="ts">
import type {PokemonsResponse} from "~/models/pokemon.model";
import type {Type} from "~/models/type.model";
const page = ref(1)
const pageSize = ref(10)

const { find } = useStrapi()

const $filters = ref<string[]>([])
const search = ref('')

const addFilter = (filter: string) => {
  console.log(filter)
    if (!filter) return
    if($filters.value.length != 0) $filters.value.pop()
    $filters.value.push(filter)
    console.log($filters.value)
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
        // filters: {
        //   type: {
        //     name: {
        //       $in: $filters.value
        //     }
        //   }
        // }
    }).then(res => res.data)
},
  {
    watch: [page, filters],
  }
)

const { data: types} = await useAsyncData('type', async() => {
    return await find<Type>('types', {
        populate: '*'
    }).then(res => res.data)
})

const pokemonFiltered = computed(()=>{
  if($filters.value.length == 0 && !search.value) return data.value
  if($filters.value == null) return data.value

  const filterRe = 
    $filters.value.length !=0 ? new RegExp($filters.value[0], "i") : new RegExp(search.value)
  
  console.log(filterRe)
  const newData = Array.from(data.value)

  return newData.filter((pokemon) => {
    if($filters.value.length !=0) return pokemon.types.some((item) => item.name.match(filterRe))
    return [pokemon.name].some((item) => item.match(filterRe))
  })
})


// Just try something to push
</script>

<template>
    <template v-if="pending">
        <span>Loading...</span>
    </template> 
    <template v-else>
      <input v-model="search" type="text" placeholder="Search"/>
      <div v-for="type in types" :key="type.id">
        <button @click="addFilter(`${type.name}`)">
          {{ type.name }}
          </button>
      </div>
      
      <div v-for="pokemon in pokemonFiltered" :key="pokemon.slug">
        <a :href="`/pokemons/${pokemon.slug}`" :key="pokemon.id">{{ pokemon.name }}</a>
      </div>
      
    <UPagination v-if="pokemons?.meta"
      v-model="page"
      :page-count="pokemons?.meta.pagination.pageCount"
      :total="pokemons?.meta.pagination.total"
    />
    </template>
    <template>
      
    </template>

</template>

<style scoped></style>