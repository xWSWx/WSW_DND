<script setup>
    import { ref } from 'vue';
    import ServerSelection from './components/ServerSelection.vue';
    import ItemList from './components/ItemList.vue';
    import CharacterList from './components/CharacterList.vue'

    const isServerSelected = ref(false);

    const handleServerSelected = (server) => {
        //console.log("serevr in 'App.vue':");
        //console.log(server);
        //selectedServer.value = server;
        isServerSelected.value = true;
    };
</script>

<template>
    <div id="app">
        <!--<ServerSelection v-if="!isServerSelected" @server-selected="handleServerSelected" />-->
        <ServerSelection @server-selected="handleServerSelected" />
        <!--<ItemList v-if="isServerSelected" />-->
        <CharacterList v-if="isServerSelected" />
    </div>
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
