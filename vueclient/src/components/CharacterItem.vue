<template>
    <li :style="{ fontWeight: character.current ? 'bold' : 'normal' }">
        Name: {{ character.name }}
        Description: {{character.description}}
    </li>
</template>

<script setup>
    const props = defineProps({
        character: {
            type: Object,
            required: true,
        },
    });
</script>

<style scoped>
    li {
        margin: 5px 0;
    }
</style>
