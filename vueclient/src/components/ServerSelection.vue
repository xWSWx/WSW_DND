<script setup>
    import { ref, defineEmits } from 'vue';
    import { selectedServer } from '../selectedServer';
    import { DOTNET_SERVER, EXPRESS_SERVER } from '../config';
    import { VBtn, VRadioGroup, VRadio } from 'vuetify/components';

    // Define the events that this component will emit
    const emit = defineEmits(['server-selected']);

    const servers = ref([
        { name: 'ASP.NET Core Web API', address: 'https://localhost:7210', api: DOTNET_SERVER },
        { name: 'Express.js Server', address: 'http://localhost:3000', api: EXPRESS_SERVER }
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
    <v-container>
        <v-card class="pa-5" outlined>
            <v-card-title>Select a Server</v-card-title>
            <v-card-text>
                <v-radio-group v-model="localSelectedServer" :mandatory="false">
                    <v-radio v-for="(server, index) in servers"
                             :key="index"
                             :label="server.name + ' (' + server.api + ')'"
                             :value="server" />
                </v-radio-group>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="confirmServer">Confirm Server</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<style scoped>
    .v-radio {
        margin-bottom: 10px;
    }
</style>
