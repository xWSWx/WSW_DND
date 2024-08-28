<template>
    <div>
        <v-menu v-model="isDropdownVisible" offset-y close-on-content-click>
            <!-- Activator for the dropdown -->
            <template #activator="{ props, on }">
                <v-btn icon v-bind="props" @click="on">
                    <v-icon icon="mdi-lightbulb-outline"/>
                </v-btn>
            </template>

            <!-- Dropdown content -->
            <v-list>
                <v-list-item v-for="theme in themes"
                             :key="theme"
                             @click="selectTheme(theme)">
                    <v-list-item-title>{{ theme }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useTheme } from 'vuetify';

    const isDropdownVisible = ref(false);
    const { global } = useTheme();

    const themes = ['light', 'dark', 'WSWTheme', 'WSWLight', 'WSWdark'];

    const selectTheme = (theme) => {
        global.name.value = theme;
        isDropdownVisible.value = false; // Close the dropdown after selection
    };
</script>

<style scoped>
    /* Add any necessary custom styles here */
</style>
