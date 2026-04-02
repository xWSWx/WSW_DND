<template>
    <div class="splitter"
         :class="orientation"
         @mousedown="startDrag"></div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const props = defineProps({
        orientation: { type: String, required: true }, // 'horizontal' or 'vertical'
    });

    const isDragging = ref(false);

    function startDrag(event) {
        isDragging.value = true;
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', stopDrag);
    }

    function handleDrag(event) {
        if (!isDragging.value) return;
        const delta = props.orientation === 'vertical' ? event.movementX : event.movementY;
        emit('resize', delta);
    }

    function stopDrag() {
        isDragging.value = false;
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', stopDrag);
    }
</script>

<style scoped>
    .splitter {
        background: #ccc;
        cursor: col-resize;
        position: relative;
    }

        .splitter.vertical {
            width: 5px;
        }

        .splitter.horizontal {
            height: 5px;
            cursor: row-resize;
        }
</style>
