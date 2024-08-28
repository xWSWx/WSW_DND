<template>
    <v-card :color="cardColor" class="ma-3 pa-3">
        <v-row align="center">
            <v-col cols="auto">
                <v-avatar>
                    <v-icon size="36">mdi-face</v-icon>
                </v-avatar>
            </v-col>
            <v-col>
                <v-card-title :class="{ 'font-weight-bold': character.current }">
                    {{ character.name }}
                </v-card-title>
                <v-tooltip bottom>
                    <template v-slot:activator="{ attrs }">
                        <v-btn v-bind="attrs" icon @click="showDescription=!showDescription">
                            <v-icon :icon="showDescription ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                        </v-btn>
                    </template>
                    <span>{{ showDescription ? 'Hide Description' : 'Show Description' }}</span>
                </v-tooltip>
            </v-col>
        </v-row>
        <v-expand-transition>
            <v-card-text v-if="showDescription">
                {{ character.description }}
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { defineProps } from 'vue';
    import { useTheme } from 'vuetify';
    import { VCard, VRow, VCol, VAvatar, VIcon, VTooltip, VBtn, VCardTitle, VCardText, VExpandTransition } from 'vuetify/components'; // Import Vuetify components

    const props = defineProps({
        character: {
            type: Object,
            required: true,
        },
    });

    const showDescription = ref(false);

    // Access Vuetify's theme
    const { global } = useTheme();
    //const vuetify = useVuetify();
    const theme = computed(() => global.current.value);

    const cardColor = computed(() => {
        if (props.character.current) {
            return theme.value.colors.primary; // Color for current character
        } else {
            return theme.value.colors.surface; // Default card background color
        }
    });
</script>

<style scoped>
    .v-card {
        max-width: 400px;
    }
</style>
