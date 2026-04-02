<template>
    <div class="resizable-pane" :style="paneStyle">
        <div class="pane-header">
            {{ pane.component }}
            <button @click="$emit('close')">?</button>
        </div>
        <div class="pane-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        pane: Object,
    });

    const paneStyle = computed(() => ({
        flex: `0 0 ${props.pane.size}px`,
        minWidth: '100px',
    }));
</script>

<style scoped>
    .resizable-pane {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        background: #f9f9f9;
    }

    .pane-header {
        background: #333;
        color: white;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pane-content {
        flex: 1;
        overflow: auto;
    }
</style>
