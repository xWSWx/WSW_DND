<script setup>
    import { ref, watch } from 'vue';
    import ServerSelection from './components/ServerSelection.vue';
    import CharacterList from './components/CharacterList.vue'
    import ThemeSelector from './components/ThemeSelector.vue';
    import { useTheme } from 'vuetify';
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
</script>

<template>
    <v-app>
        <v-container>
            <ThemeSelector />         
            <ServerSelection @server-selected="handleServerSelected" />
            <CharacterList v-if="isServerSelected" />            
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
</style>
