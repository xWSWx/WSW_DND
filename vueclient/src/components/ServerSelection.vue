<template>
    <v-menu v-model="isDropdownVisible" offset-y close-on-content-click>
        <!-- Activator for the dropdown -->


        <template #activator="{ props, on }">
            <v-btn text v-bind="props" @click="on">
                <v-icon icon="mdi-server" class="mr-2" />
                {{ localSelectedServer.name }} <!-- Display the selected server name -->
            </v-btn>
        </template>

        <!-- Dropdown content -->
        <v-list>
            <v-list-item v-for="(server, index) in servers"
                         :key="index"
                         @click="confirmServer(server)"
                         ripple
                         class="align-center">

                <!-- я так и не понял, почему не получалось горизонтально... пришлось добавлять вот таким образом -->
                <template v-slot:prepend>
                    <v-list-item-action>
                        <v-icon v-if="localSelectedServer.name === server.name"
                                icon="mdi-check"
                                class="mr-2" />
                        <v-icon v-if="localSelectedServer.name !== server.name"
                                class="mr-2" />
                    </v-list-item-action>
                </template>
                <v-list-item-title>{{ server.name }}</v-list-item-title>                
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import { selectedServer } from '../selectedServer';
    import { DOTNET_SERVER, EXPRESS_SERVER } from '../config';

    // Define the events that this component will emit
    const emit = defineEmits(['server-selected']);

    const servers = ref([
        { name: 'ASP.NET Core Web API', address: 'https://localhost:7210', api: DOTNET_SERVER },
        { name: 'Express.js Server', address: 'http://localhost:3000', api: EXPRESS_SERVER }
        // Add more servers as needed
    ]);

    const localSelectedServer = ref(servers.value[0]); // Set the first server as the default
    const isDropdownVisible = ref(false);

    const confirmServer = (server) => {
        localSelectedServer.value = server;
        emit('server-selected', server);
        selectedServer.value = server.api;
        isDropdownVisible.value = false; // Close the dropdown after selection
    };
</script>

<style scoped>
    /* Scoped styles to adjust the layout */
    .d-flex {
        display: flex;
    }

    .align-center {
        align-items: center;
    }

    .mr-2 {
        margin-right: 8px; /* Adjust margin as needed */
    }
</style>
