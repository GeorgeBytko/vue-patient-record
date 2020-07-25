<template>
    <FormPatient />
</template>

<script>
    import FormPatient from "../components/FormPatient";
    export default {
        metaInfo: {
            title: 'Запись пациента'
        },
        name: 'Home',
        components: {
            FormPatient
        }
    }
</script>
