<script setup lang="ts">
const { find } = useStrapi()
const { data, pending, error } = await useAsyncData('pokemons', async() => {
    return await find('pokemons')
    // return await find<PokemonsResponse>('pokemons', {
        // populate: '*'
    // })
})

</script>

<template>
    <h1>Hello world</h1>
    <About />
</template>

<style scoped></style>