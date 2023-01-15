<template>
    <Menu :active="'DiscoverView'"/>
    <AllSetsGallery />
</template>

<script>
import Menu from '../components/Menu.vue'
import AllSetsGallery from '../components/AllSetsGallery.vue'
export default {
    name: 'AllSetsView',
    components: {
        AllSetsGallery,
        Menu
    }
}
</script>