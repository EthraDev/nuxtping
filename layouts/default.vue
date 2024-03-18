<template>
    <main role="main">
        <TheHeader />
        <slot />
        <footer>
            <p>© 2021</p>
        </footer>
    </main>
</template>

<script setup lang="ts">
import TheHeader from '@/components/layouts/TheHeader.vue'
</script>