<script setup>
    import { ref, watch, toRaw } from 'vue';
    import ServerSelection from './components/ServerSelection.vue';
    import CharacterList from './components/CharacterList.vue'
    import ThemeSelector from './components/ThemeSelector.vue';
    import GlTemplate from "./components/Golden Layout/GlTemplate.vue";
    import { GoldenLayout } from './components/Golden Layout/index';
    import { predefinedLayouts }from './components/Golden Layout/emptyGoldenLayoutConfig.ts'
    import { LayoutConfig } from "golden-layout";
    import Welcome from "./components/Welcome.vue";
    import { useTheme } from 'vuetify';
    import DockingLayout from './components/DockingLayout/DockingLayout.vue';
    import DockingPanel from './components/DockingLayout/DockingPanel.vue';

    import Component1 from './components/Component1.vue';
    import Component2 from './components/Component2.vue';
    import Component3 from './components/Component3.vue';
    import Component4 from './components/Component4.vue';
    import Component5 from './components/Component5.vue';

    import DynamicTabs from './components/DockingWSW/DynamicTabs.vue';
    const { global } = useTheme();
    const selectedTheme = ref('light');

    const changeTheme = (theme) => {
        console.log(global.name.value);
        global.name.value = theme;
        console.log(global.current.value.colors);
    };
    
    const isServerSelected = ref(false);
    const handleServerSelected = (server) => {
        isServerSelected.value = true;
    };
    watch(selectedTheme, (newTheme) => {
        changeTheme(newTheme);
    });


    const components = [
        { component: Component1, HeaderString: Component1.HeaderString },
        { component: Component2, HeaderString: Component2.HeaderString },
        { component: Component3, HeaderString: Component3.HeaderString },
        { component: Component4, HeaderString: Component4.HeaderString },
        { component: Component5, HeaderString: Component5.HeaderString },
    ];

    const dynamicTabs = ref(null);

    const registerTab = (componentData) => {
        dynamicTabs.value?.registerTab({
            id: Date.now(), // Unique ID
            title: componentData.HeaderString,
            component: componentData.component,
        });
    };
</script>

<template>
    <v-app>
        <v-container>
            <v-btn @click="toggleStyle">
                Toggle Style
            </v-btn>
            <ThemeSelector />
            <ServerSelection @server-selected="handleServerSelected" />
            <CharacterList v-if="isServerSelected" />

            <div>
                <div class="buttons">
                    <button v-for="(component, index) in components" :key="index" @click="registerTab(component)">
                        Add {{ component.HeaderString }}
                    </button>
                </div>

                <DynamicTabs ref="dynamicTabs" />
            </div>
            
        </v-container>
    </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
    .buttons {
        margin-bottom: 20px;
    }

    button {
        margin-right: 10px;
        padding: 8px 12px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

        button:hover {
            background-color: #0056b3;
        }
</style>
