<script setup lang="ts">
import type {Pokemon} from '~/models/pokemon.model'

const { findOne } = useStrapi4()
const route = useRoute()

const { data: pokemon, pending } = useAsyncData('pokemon', () =>
    findOne<{ data: Pokemon[] }>(`pokemons/${route.params.slug}`, {
        populate: '*'
    })
)
</script>


<template>
    <pre>{{ pokemon }}</pre>
</template>