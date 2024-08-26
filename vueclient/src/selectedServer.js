import { ref, watch } from 'vue';
import { DOTNET_SERVER } from './config';


export const selectedServer = ref(DOTNET_SERVER); // Default to DotNet Server
watch(selectedServer, (newVal) => {
    console.log('New selectedServer value:', newVal);
});