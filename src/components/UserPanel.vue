<template>
    <h1>{{ this.user.name }}</h1>

</template>

<script>
export default {
    props: {
        user: Object
    },
}
</script>