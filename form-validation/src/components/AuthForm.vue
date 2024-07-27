<template>
  <div>
    <h1>Registration Form</h1>
    <form @submit.prevent="submitForm">
      <div class="input-wrapper">
        <label for="name">Name <span class="required-mark">*</span></label>
        <input
          id="name"
          v-model="form.firstName"
          type="text"
          :class="{ 'input-error': errors.firstName }"
          @input="validateName"
          @blur="validateName"
        />
        <span v-if="errors.firstName" class="error-message">{{
          errors.firstName
        }}</span>
      </div>

      <div class="input-wrapper">
        <label for="email">Email <span class="required-mark">*</span></label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          :class="{ 'input-error': errors.email }"
          @input="validateEmail"
          @blur="validateEmail"
        />
        <span v-if="errors.email" class="error-message">{{
          errors.email
        }}</span>
      </div>

      <div class="input-wrapper">
        <label for="password"
          >Password <span class="required-mark">*</span></label
        >
        <input
          id="password"
          v-model="form.password"
          type="password"
          :class="{ 'input-error': errors.password }"
          @input="validatePassword"
          @blur="validatePassword"
        />
        <span v-if="errors.password" class="error-message">{{
          errors.password
        }}</span>
      </div>

      <div class="input-wrapper">
        <div>
          <input
            id="agreement"
            v-model="form.agreement"
            type="checkbox"
            @change="validateAgreements"
          />
          <label for="agreement"> I agree with private policy </label>
        </div>
        <span v-if="errors.agreement" class="error-message">{{
          errors.agreement
        }}</span>
      </div>

      <button :disabled="isErrors" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
/* 
  Решил сделать валидацию при потере фокуса так как пользователь сразу увидит что ошибся и исправит поле,
  При вводе так же нужна валидация, что бы пользователь понимал что поле прошло проверку (без потери фокуса),
  Валидация при подтверждении формы нужна для финальной проверки и на случай если пользователь сразу нажмёт на кнопку
*/
export default {
  data() {
    return {
      form: {
        firstName: '',
        email: '',
        password: '',
        agreement: false,
      },
      errors: {
        firstName: '',
        email: '',
        password: '',
        agreement: '',
      },
      usedEmails: ['test@gmail.com', 'user@gmail.com', 'user2@ukr.net'],
    }
  },
  computed: {
    isErrors() {
      return Object.values(this.errors).some((value) => value !== '')
    },
  },
  methods: {
    submitForm() {
      this.validateAll()
      if (this.isErrors) return

      console.log('Form submitted')
    },
    validateAll() {
      this.validateName()
      this.validateEmail()
      this.validatePassword()
      this.validateAgreements()
    },
    validateName() {
      const { firstName } = this.form
      if (!firstName) this.errors.firstName = 'First name is required.'
      else if (firstName.length < 3)
        this.errors.firstName = 'First name must be at least 3 characters.'
      else this.errors.firstName = ''
    },
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9_+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const { email } = this.form
      if (!email) {
        this.errors.email = 'Email is required.'
      } else if (!emailPattern.test(email)) {
        this.errors.email = 'Invalid email.'
      } else if (this.usedEmails.includes(email)) {
        this.errors.email = 'This email is already taken.'
      } else {
        this.errors.email = ''
      }
    },
    validatePassword() {
      const { password } = this.form
      const passwordExp = /^(?=.*[a-z])(?=.*[_-])[a-z0-9_-]+$/i

      if (!password) {
        this.errors.password = 'Password is required.'
      } else if (password.length < 5) {
        this.errors.password = 'Password must be at least 5 characters.'
      } else if (!passwordExp.test(password)) {
        this.errors.password = 'Invalid password. Password must includes _ or -'
      } else {
        this.errors.password = ''
      }
    },
    validateAgreements() {
      const { agreement } = this.form

      if (!agreement) {
        this.errors.agreement = 'Agreement is required.'
      } else {
        this.errors.agreement = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.submit-button {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #bdc3c7;
  }
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input {
    max-width: 300px;
    padding: 8px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .input-error {
    outline: none;
    border: 2px solid #e74c3c;
    caret-color: #e74c3c;
    color: #e74c3c;
  }

  .error-message,
  .required-mark {
    color: #e74c3c;
  }
}
</style>
