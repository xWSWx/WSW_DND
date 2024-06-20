

<script>
    export default {
        data() {
            return {
                servers: [
                    { name: 'ASP.NET Core Web API', address: 'https://localhost:7210' },
                    { name: 'Express.js Server', address: 'http://localhost:3000' }
                    // Add more servers as needed
                ],
                selectedServer: null
            };
        },
        methods: {
            confirmServer() {
                if (this.selectedServer) {
                    this.$emit('server-selected', this.selectedServer); // Emit event to parent component
                } else {
                    alert('Please select a server.');
                }
            }
        }
    };
</script>

<template>
    <div>
        <h2>Select a Server</h2>
        <div class="server-options">
            <label v-for="(server, index) in servers" :key="index" class="server-option"> 
                <input type="radio" v-model="selectedServer" :value="server"> {{ server.name }}
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
