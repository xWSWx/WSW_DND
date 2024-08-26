<script setup>
    import { ref, defineEmits } from 'vue';
    import { selectedServer } from '../selectedServer';
    import { DOTNET_SERVER, EXPRESS_SERVER } from '../config';
    // Define the events that this component will emit
    const emit = defineEmits(['server-selected']);

    const servers = ref([
        { name: 'ASP.NET Core Web API', address: 'https://localhost:7210', api: DOTNET_SERVER   },
        { name: 'Express.js Server'   , address: 'http://localhost:3000' , api: EXPRESS_SERVER }
        // Add more servers as needed
    ]);

    const localSelectedServer = ref(null);

    const confirmServer = () => {
        if (localSelectedServer.value) {
            emit('server-selected', localSelectedServer.value);             
            selectedServer.value = localSelectedServer.value.api; 
        } else {
            alert('Please select a server.');
        }
    };
</script>

<template>
    <div>
        <h2>Select a Server</h2>
        <div class="server-options">
            <label v-for="(server, index) in servers" :key="index" class="server-option">
                <input type="radio" v-model="localSelectedServer" :value="server"> {{ server.name }} ({{ server.api }})
            </label>
        </div>
        <button @click="confirmServer">Confirm Server</button>
    </div>
</template>

<style scoped>
    .server-options {
        display: flex;
        flex-direction: column;
    }

    .server-option {
        margin-bottom: 10px;
    }
</style>
