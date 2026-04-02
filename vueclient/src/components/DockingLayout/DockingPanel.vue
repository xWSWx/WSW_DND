<template>
    <div class="docking-panel">
        <div class="panel-header">
            <div class="tabs">
                <button v-for="(tab, index) in tabs"
                        :key="index"
                        :class="{ active: activeTab === index }"
                        @click="switchTab(index)">
                    {{ tab.name }}
                </button>
                <button class="add-tab-btn" @click="addTab">+</button>
            </div>
            <button class="close-btn" @click="$emit('close')">✖</button>
        </div>

        <div class="panel-content"
             @dragover.prevent
             @drop="handleDrop">
            <!-- Render content for active tab -->
            <slot v-if="tabs[activeTab]"></slot>
        </div>

        <!-- Drop zones for docking -->
        <div class="drop-zone left"
             @dragover.prevent
             @drop="handleDrop('left')"></div>
        <div class="drop-zone right"
             @dragover.prevent
             @drop="handleDrop('right')"></div>
        <div class="drop-zone top"
             @dragover.prevent
             @drop="handleDrop('top')"></div>
        <div class="drop-zone bottom"
             @dragover.prevent
             @drop="handleDrop('bottom')"></div>
        <div class="drop-zone center"
             @dragover.prevent
             @drop="handleDrop('center')"></div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        initialTabs: {
            type: Array,
            default: () => [{ name: 'Tab 1' }],
        },
    });

    const tabs = ref([...props.initialTabs]);
    const activeTab = ref(0);

    const addTab = () => {
        tabs.value.push({ name: `Tab ${tabs.value.length + 1}` });
        activeTab.value = tabs.value.length - 1;
    };

    const switchTab = (index) => {
        activeTab.value = index;
    };

    const handleDrop = (zone) => {
        console.log(`Dropped in ${zone} zone`);
        // Implement logic to move content between zones or add tabs
    };
</script>

<style scoped>
    .docking-panel {
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        margin: 4px;
        background: #fff;
        position: relative;
    }

    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #333;
        color: #fff;
        padding: 5px;
    }

    .tabs {
        display: flex;
    }

        .tabs button {
            background: none;
            border: none;
            color: #fff;
            padding: 5px 10px;
            cursor: pointer;
        }

            .tabs button.active {
                border-bottom: 2px solid #fff;
            }

    .add-tab-btn {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        padding: 5px 10px;
    }

    .close-btn {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
    }

    .panel-content {
        flex: 1;
        padding: 10px;
        overflow: auto;
    }

    .drop-zone {
        position: absolute;
        border: 2px dashed #888;
        pointer-events: none;
        opacity: 0;
    }

        .drop-zone.left {
            left: 0;
            top: 0;
            bottom: 0;
            width: 25%;
        }

        .drop-zone.right {
            right: 0;
            top: 0;
            bottom: 0;
            width: 25%;
        }

        .drop-zone.top {
            top: 0;
            left: 0;
            right: 0;
            height: 25%;
        }

        .drop-zone.bottom {
            bottom: 0;
            left: 0;
            right: 0;
            height: 25%;
        }

        .drop-zone.center {
            left: 25%;
            right: 25%;
            top: 25%;
            bottom: 25%;
        }

    .docking-panel:hover .drop-zone {
        opacity: 1;
        pointer-events: auto;
    }
</style>
