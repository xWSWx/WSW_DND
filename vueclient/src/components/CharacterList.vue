<script setup>
    import { ref, watch, onMounted } from 'vue';
    import CHARACTER_REQUESTS from '../api/Characters';
    import { selectedServer } from '../selectedServer';
    import Character from './CharacterItem.vue';

    const normalizeCharacter = (character) => {
        return {
            id: character.id || character.Id,
            name: character.name || character.Name,
            description: character.description || character.Description,
            initiative: character.initiative || character.Initiative,
            current: character.current || character.Current
        };
    };


    const items = ref([]);
    const currentItemId = ref(null);

    const fetchCharacters = async () =>     
    {
        fetch(CHARACTER_REQUESTS.value.ListRequest) 
        .then(response => response.json())
        .then(data =>                 
        {
            items.value = data.map(normalizeCharacter);
            const currentItem = data.find(item => item.current);
            if (currentItem)                     
            {
                currentItemId.value = currentItem.id; 
            }
        });
    };

    watch(selectedServer, fetchCharacters);    
    onMounted(fetchCharacters);
</script>
           
<template>
    <div>
        <!--<h2>Character List for {{ server.name }} ( {{server.address}} )</h2>-->
        <h2>Character List for </h2>
        <ul>
            <Character v-for="item in items"
                       :key="item.id"
                       :character="item" />
        </ul>
    </div>
</template>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }
</style>

