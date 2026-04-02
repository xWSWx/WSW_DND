<template>
    <div class="dynamic-tabs">
        <!-- Header Section -->
        <div class="tabs-header" ref="headerContainer">
            <div v-for="(tab, index) in tabs"
                 :key="tab.id"
                 class="tab-header-item"
                 :class="{ 
                        active: index === activeTabIndex, 
                        dragging: draggedTab === tab 
                 }"
                 :style="{
             transform: draggedIndex === index ? `translateX(20px)` : '',
             opacity: draggedIndex === index ? 0.5 : 1
           }"
                 draggable="true"
                 @dragstart="onDragStart(index)"
                 @dragover="onDragOver($event, index)"
                 @dragend="onDragEnd"
                 @click="onTabClick(index)">
                {{ tab.title }}
            </div>
        </div>

        <!-- Content Section -->
        <div class="tabs-content">
            <div v-if="tabs.length > 0" class="tab-content-item">
                <component :is="tabs[activeTabIndex]?.component" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';    

    // Tabs state
    const tabs = ref([]);
    const activeTabIndex = ref(0);

    // Drag-and-drop state
    const draggedIndex = ref(null);
    const draggedTab = ref(null);

    // Register a new tab
    const registerTab = (tab) => {
        const existingTabIndex = tabs.value.findIndex((t) => t.title === tab.title);
        if (existingTabIndex !== -1) {
            activeTabIndex.value = existingTabIndex;
        } else {
            tabs.value.unshift(tab);
            activeTabIndex.value = 0;
        }
    };

    // Handle tab click
    const onTabClick = (index) => {
        // Prevent click interference during drag-and-drop
        if (draggedIndex.value === null) {
            activeTabIndex.value = index;
        }
    };

    // Handle drag start
    const onDragStart = (index) => {
        draggedIndex.value = index;
        draggedTab.value = tabs.value[draggedIndex.value];
    };

    // Handle drag over
    const onDragOver = (event, index) => {
        event.preventDefault();

        //dragOver на себя - игнорируем
        if (draggedIndex.value === index)
            return;
        
        const targetElement = event.target.closest('.tab-header-item'); // Target the dragged-over element
        if (!targetElement)
            return;
        
        console.log("target element:" + targetElement.title)
        // Calculate mouse position relative to the target element
        const targetRect = targetElement.getBoundingClientRect();
        const mouseX = event.clientX;
        // Determine insertion index based on mouse position
        const insertIndex = mouseX > targetRect.left + targetRect.width / 2 ? index + 1 : index;

        if (insertIndex == draggedIndex.value )
            return;

        console.log("insertIndex is:" + insertIndex);
                                
        tabs.value.splice(draggedIndex.value, 1);
        tabs.value.splice(insertIndex, 0, draggedTab.value); // Insert at new position
        draggedIndex.value = insertIndex; // Update drag index

    };

    // Handle drag end
    const onDragEnd = () => {
        draggedIndex.value = null;
        draggedTab.value = null;
    };

    // Expose the registerTab method to parent components
    defineExpose({
        registerTab,
    });
</script>

<style scoped>
    .dynamic-tabs {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .tabs-header {
        display: flex;
        overflow-x: auto;
        border-bottom: 1px solid #ccc;
    }

    .tab-header-item {
        padding: 10px 15px;
        cursor: pointer;
        white-space: nowrap;
        background-color: #f5f5f5;
        border-radius: 4px;
        transition: transform 0.2s ease, opacity 0.2s ease, padding 0.5s ease;
    }

        .tab-header-item.active {
            font-weight: bold;
            border-bottom: 2px solid #007bff;
        }

        .tab-header-item.dragging {
            opacity: 0.5;
            padding: 10px 35px 10px 35px;
            transform: translateX(20px);
        }

    /* Add border to content area and make it scrollable */
    .tabs-content {
        border: 2px solid #007bff; /* Blue border */
        padding: 10px;
        border-radius: 4px;
        margin-top: 10px;
        background-color: #f9f9f9;
        /* Make content scrollable */
        max-height: 400px; /* Set a max height for the content */
        overflow: auto; /* Enable scroll when content overflows */
    }

        /* Optional: Style for the scrollbars */
        .tabs-content::-webkit-scrollbar {
            width: 8px;
        }

        .tabs-content::-webkit-scrollbar-thumb {
            background-color: #007bff;
            border-radius: 4px;
        }

        .tabs-content::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
</style>
