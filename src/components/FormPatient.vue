<template>
    <div class="form-patient-container">
        <div v-if="message.visible" class="form-patient-message" :class="messageClass">
            {{message.text}}
            <span class="form-patient-message-btn-hide" @click="hideMessage">&times;</span>
        </div>
        <form class="form-patient" @submit.prevent="addPatient">
            <div class="form-patient-title">Запись на прием</div>
            <div class="form-patient__input-list">
                <div class="form-patient__input-list-item">
                    <label for="surname">Фамилия</label>
                    <input
                            v-model.trim="form.surname.val"
                            @blur="check"
                            class="form-patient__input-list-item-input"
                            :class="form.surname.errorClass"
                            type="text"
                            id="surname"
                    >
                </div>
                <div class="form-patient__input-list-item">
                    <label for="name">Имя</label>
                    <input
                            v-model.trim="form.name.val"
                            @blur="check"
                            class="form-patient__input-list-item-input"
                            :class="form.name.errorClass"
                            type="text"
                            id="name">
                </div>
                <div class="form-patient__input-list-item">
                    <label for="secondName">Отчество</label>
                    <input
                            v-model.trim="form.secondName.val"
                            @blur="check"
                            class="form-patient__input-list-item-input"
                            :class="form.secondName.errorClass"
                            type="text"
                            id="secondName">
                </div>
                <div class="form-patient__input-list-item">
                    <label for="passport">Серия и номер пасспорта</label>
                    <input
                            v-model.trim="form.passport.val"
                            @blur="check"
                            class="form-patient__input-list-item-input"
                            :class="form.passport.errorClass"
                            type="text"
                            id="passport">
                </div>
                <div class="form-patient__input-list-item">
                    <label for="age">Возраст (полных лет)</label>
                    <input
                            v-model.trim="form.age.val"
                            @blur="check"
                            class="form-patient__input-list-item-input"
                            :class="form.age.errorClass"
                            type="text"
                            id="age">
                </div>
            </div>
            <div class="form-patient__btn-container">
                <button class="form-patient__btn" v-bind:disabled="submitBlocked" type="submit">Записаться</button>
                <button class="form-patient__btn" type="button" @click="resetForm">Очистить</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "FormPatient",
        data() {
            return {
                message: {
                    error: false,
                    visible: false,
                    text: ''
                },
                form: {
                    surname: {
                        val: '',
                        errorClass: ''
                    },
                    name: {
                        val: '',
                        errorClass: ''
                    },
                    secondName: {
                        val: '',
                        errorClass: ''
                    },
                    passport: {
                        val: '',
                        errorClass: ''
                    },
                    age: {
                        val: '',
                        errorClass: ''
                    }
                },
                submitBlocked: false
            }
        },
        computed: {
            messageClass() {
                return this.message.error?'form-patient-message_error' : ''
            }
        },
        methods: {
            showMessage(error, text) {
                this.message.error = error;
                this.message.visible = true
                this.message.text = text
            },
            hideMessage() {
                this.message.error = false;
                this.message.visible = false
                this.message.text = ''
            },
            validate() {
                let error = Object.keys(this.form).reduce( (err, key) => {
                    if (!this.form[key].val) {
                        this.form[key].errorClass = 'form-patient__input-list-item-input_error'
                        err = true
                    }
                    return err
                }, false)
                if (error) {
                    this.showMessage(error, 'Заполните недостающие поля')
                    return false
                }
                if (!+this.form.passport.val || this.form.passport.val.length !== 10) {
                    this.showMessage(true, 'Введите корректные данные паспорта (10 цифр)')
                    this.form.passport.errorClass = 'form-patient__input-list-item-input_error'
                    return false
                }
                if (!+this.form.age.val || +this.form.age.val < 0 || this.form.age.val.length > 3) {
                    this.showMessage(true, 'Введите корректный возраст')
                    this.form.age.errorClass = 'form-patient__input-list-item-input_error'
                    return false
                }
                return true
            },
            addPatient() {
                if (!this.submitBlocked && this.validate()) {
                    this.submitBlocked = true
                    axios.post('/api/patients', {
                        name: this.form.name.val,
                        surname: this.form.surname.val,
                        second_name: this.form.secondName.val,
                        recording_date: new Date().toISOString(),
                        passport: this.form.passport.val,
                        age: this.form.age.val
                    })
                        .then(response => {
                            this.clearForm()
                            this.showMessage(false,'Вы добавлены в базу!')
                        })
                        .catch(err => {
                            this.showMessage(true,'Что-то пошло не так')
                        })
                        .finally(() => this.submitBlocked = false)
                }

            },
            check(e) {
                if (!this.form[e.target.id].val) {
                    this.form[e.target.id].errorClass = 'form-patient__input-list-item-input_error'
                }
                else {
                    this.form[e.target.id].errorClass = ''
                }
            },
            clearForm() {
                Object.keys(this.form).forEach( key => {
                    this.form[key].val = this.form[key].errorClass = ''
                })
            },
            resetForm() {
                this.clearForm()
                this.hideMessage()
            }
        }
    }
</script>

<style scoped>
    .form-patient-container {
        padding-top: 50px;
    }
    .form-patient-message {
        background: #2bb24c;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        margin: 0 auto;
        width: 50%;
        color: #fff;
    }
    .form-patient-message-btn-hide:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
    .form-patient-message_error {
        background: #e64848;
    }
    .form-patient-title {
        margin-bottom: 30px;
        font-size: 25px;
    }
    .form-patient {
        display: flex;
        box-shadow: 0 0 10px #ccc;
        flex-direction: column;
        margin: 50px auto;
        width: 400px;
        background: white;
        border: 1px solid white;
        border-radius: 5px;
        padding: 20px 30px;
    }
    .form-patient__input-list {
        display: flex;
        flex-direction: column;
    }
    .form-patient__input-list-item {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-bottom: 10px;
    }
    .form-patient__input-list-item-input {
        margin-top: 5px;
        width: 100%;
        border: none;
        border-bottom: 2px solid black;
        padding: 5px 0;
    }

    .form-patient__input-list-item-input_error {
        border-color: #e64848;
    }
    .form-patient__input-list-item-input:focus {
        outline: none;
        border-color: #2bb24c;
    }
    .form-patient__btn-container {
        margin-top: 10px;
    }
    .form-patient__btn {
        padding: 10px;
        border: 1px solid;
        border-radius: 5px;
    }
    .form-patient__btn:hover {
        cursor: pointer;
    }
    .form-patient__btn:first-of-type {
        margin-right: 10px;
        color: #fff;
        background: #2bb24c;
        border-color: #2bb24c;
    }
    .form-patient__btn:first-of-type:hover {
        background: #fff;
        color: #2bb24c;
    }
    .form-patient__btn:last-of-type {
        background: #e64848;
        border-color: #e64848;
        color: #fff;
    }
    .form-patient__btn:last-of-type:hover {
        background: #fff;
        color: #e64848;
    }
</style>