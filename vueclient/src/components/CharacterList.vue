<script setup>
    import { ref, watch, onMounted } from 'vue';
    import CHARACTER_REQUESTS from '../api/Characters';
    import { selectedServer } from '../selectedServer';
    import CharacterItem from './CharacterItem.vue';
    import Character from '@/models/Character'; // Import the Character model

    const items = ref([]);
    const currentItemId = ref(null);

    const fetchCharacters = () => {
        fetch(CHARACTER_REQUESTS.value.ListRequest)
            .then(response => response.json())
            .then(data => {                
                items.value = data.map(characterData => new Character(characterData));
                
                const currentItem = items.value.find(item => item.current);
                if (currentItem) {
                    currentItemId.value = currentItem.id;
                }
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    };    

    watch(selectedServer, fetchCharacters);    
    onMounted(fetchCharacters);
</script>
           
<template>
    <div>
        <h2>Character List</h2>
        <ul>
            <CharacterItem v-for="item in items" :key="item.id" :character="item" />
        </ul>
    </div>
</template>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }
</style>

