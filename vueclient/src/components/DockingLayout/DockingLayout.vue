<template>
    <div class="docking-layout">
        <slot></slot>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .docking-layout {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        position: relative;
        background: #f5f5f5;
    }
</style>
