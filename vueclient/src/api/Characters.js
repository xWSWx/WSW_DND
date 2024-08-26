
import { computed, watch } from 'vue'
import { selectedServer } from '../selectedServer';
const ListRequestUrl = computed(() => `${window.location.origin}${selectedServer.value}/Characters`);
const ListRequestParms = {
    name: 'list',
    method: 'get',    
};
const ListRequest = computed(() => {
    return {
        input: ListRequestUrl.value,
        options: ListRequestParms
    };
});


watch(ListRequestUrl, async (newQuestion, oldQuestion) => {
    console.log("ListRequestUrl was:")
    console.log(oldQuestion)
    console.log("ListRequestUrl is:")
    console.log(newQuestion)
});

watch(ListRequest, async (newQuestion, oldQuestion) => {
    console.log("ListRequest was:")
    console.log(oldQuestion)
    console.log("ListRequest is:")
    console.log(newQuestion)
})
const CHARACTER_REQUESTS = computed(() => {
    return {
        ListRequest: new Request(ListRequest.value.input, ListRequest.value.options) //ListRequest.value,
    };

    //list: {
    //    url: '/api/Characters',
    //    options: {
    //        method: 'GET',
    //        headers: {
    //            'Content-Type': 'application/json',
    //        },
    //    },
    //},
    //create: (characterData) => ({
    //    url: '/api/Characters',
    //    options: {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify(characterData),
    //    },
    //}),
    //update: (id, updatedData) => ({
    //    url: `/api/Characters/${id}`,
    //    options: {
    //        method: 'PUT',
    //        headers: {
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify(updatedData),
    //    },
    //}),
    //delete: (id) => ({
    //    url: `/api/Characters/${id}`,
    //    options: {
    //        method: 'DELETE',
    //        headers: {
    //            'Content-Type': 'application/json',
    //        },
    //    },
    //}),
});

export default CHARACTER_REQUESTS;