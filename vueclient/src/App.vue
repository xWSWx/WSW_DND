<script setup>
    import { ref } from 'vue';
    import ServerSelection from './components/ServerSelection.vue';
    import ItemList from './components/ItemList.vue';

    const selectedServer = ref(null);

    const handleServerSelected = (server) => {
        selectedServer.value = server;
    };
</script>

<template>
    <div id="app">
        <ServerSelection v-if="!selectedServer" @server-selected="handleServerSelected" />
        <ItemList v-if="selectedServer" :server="selectedServer" />
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
