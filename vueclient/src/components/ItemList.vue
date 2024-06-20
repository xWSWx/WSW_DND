<script setup>
    import { ref, watch, onMounted } from 'vue';
    const props = defineProps({
        server: {
            type: Object,
            required: true
        }
    });
    const items = ref([]);
    const currentItemId = ref(null);
    const fetchItems = async () =>     
    {
        fetch(props.server.address+'/api/items') // Replace with your Express server URL
        .then(response => response.json())
        .then(data =>                 
        {
            items.value = data;
            const currentItem = data.find(item => item.current);
            if (currentItem)                     
            {
                currentItemId.value = currentItem.id; // Initialize with the current item ID
            }
        });
    };

    const nextItem = async () =>     
    {
        fetch(props.server.address+'/api/items/next', {method: 'POST'})
        .then(response => response.json())
        .then(id =>             
        {
            currentItemId.value = id;
            items.value.forEach(item => {
                item.current = item.id === id;
            });
        });
    };

    watch(() => props.server, fetchItems);
    onMounted(fetchItems);
</script>
           
<template>
    <div>
        <h2>Item List for {{ server.name }} ( {{server.address}} )</h2>
        <ul>
            <li v-for="item in items" :key="item.id">
                <span :style="{ fontWeight: item.current ? 'bold' : 'normal' }">{{ item.name }}</span>
            </li>
        </ul>
        <button @click="nextItem">Next</button>
    </div>
</template>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 5px 0;
    }
</style>

