<template>
    <Menu :active="'DiscoverView'"/>
    <div class="content">
        <AllSetsGallery />
    </div>
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