<template>
    <div class="patients-container__patients-list-item">
        <div class="patients-container__patients-list-item-fio">
            {{patientData.name}}
            {{patientData.surname}}
            {{patientData.second_name}}
        </div>
        <div class="patients-container__patients-list-item-passport">
            Серия и номер пасспорта: {{patientData.passport}}
        </div>
        <div class="patients-container__patients-list-item-age">
            <span>Возраст: {{patientData.age}}</span>
        </div>
        <div class="patients-container__patients-list-item-date">
            <span>Дата записи: {{new Date(patientData.recording_date).toLocaleString()}}</span>
        </div>
        <div class="patients-container__patients-list-item-btn-container">
            <button type="button" class="patients-container__patients-list-item-btn-delete" @click="$emit('deletePatient', patientData._id)">
                Удалить
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['patientData'],
        name: "Patient",
        computed: {
            date: () => new Date()
        }
    }
</script>

<style scoped>
    .patients-container__patients-list-item {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        background: white;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 0 10px #ccc;
    }
    .patients-container__patients-list-item-passport,
    .patients-container__patients-list-item-date,
    .patients-container__patients-list-item-age {
        display: flex;
        justify-content: start;
        font-size: 16px;
        margin-top: 10px;
    }
    .patients-container__patients-list-item-fio {
        font-size: 25px;
        font-weight: bold;
        display: flex;
        justify-content: center;
    }
    .patients-container__patients-list-item-btn-container {
        display: flex;
        justify-content: center;
    }
    .patients-container__patients-list-item-btn-delete {
        border: 1px solid #e64848;
        margin-top: 15px;
        color: #fff;
        background-color: #e64848;
        border-radius: 5px;
        font-size: 15px;
        padding: 9px;
    }
    .patients-container__patients-list-item-btn-delete:hover {
        cursor: pointer;
        color: #e64848;
        background-color: #fff;
    }
</style>