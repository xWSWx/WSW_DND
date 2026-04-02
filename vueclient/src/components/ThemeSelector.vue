<template>
    
        <!--<v-menu v-model="isDropdownVisible" offset-y close-on-content-click>
         Activator for the dropdown 
            <template #activator="{ menuProps, on }">
            <v-btn icon v-bind="menuProps" @click="on">
                <v-icon icon="mdi-lightbulb-outline"/>
            </v-btn>
            </template>
            Dropdown content 
            <v-list>
                <v-list-item v-for="theme in themes"
                         :key="theme"
                         @click="selectTheme(theme)">
                    <v-list-item-title>{{ theme }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>-->
        <v-menu>
            <template #activator="{ props: menuProps }">
                <v-tooltip :class="{ 'v-tooltip-hidden': isToolTipsDisabled  } ">
                    <template #activator="{ props: tooltipProps }">
                        <v-btn icon v-bind="{ ...tooltipProps, ...menuProps  }">
                            <v-icon icon="mdi-lightbulb-outline" />
                        </v-btn>
                    </template>
                    <div >
                        Selected Theme: {{global.name}}
                    </div>
                </v-tooltip>
            </template>

            <v-list>
                <v-list-item v-for="theme in themes"
                             :key="theme"
                             @click="selectTheme(theme)">
                    <template v-slot:prepend>
                        <v-list-item-action>
                            <v-icon v-if="theme === global.name.value"
                                    icon="mdi-check"
                                    class="mr-2" />
                            <v-icon v-if="theme !== global.name.value"
                                    class="mr-2" />
                        </v-list-item-action>
                    </template>
                    <v-list-item-title>{{ theme }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    
</template>

<script setup>
    import { ref } from 'vue';
    import { useTheme } from 'vuetify';
    const isTooltipsEngineEnabled = ref(false);
    const isDropdownVisible = ref(false);
    const { global } = useTheme();
    const isToolTipsDisabled = ref(true)
    const themes = ['light', 'dark', 'WSWTheme', 'WSWLight', 'WSWdark'];

    const selectTheme = (theme) => {
        global.name.value = theme;
        isDropdownVisible.value = false; // Close the dropdown after selection
    };
</script>

<style scoped>
    .hidden-element {
        display: none;
    }
    .v-tooltip-hidden {
        display:none;
    }
    /* Add any necessary custom styles here */
</style>
