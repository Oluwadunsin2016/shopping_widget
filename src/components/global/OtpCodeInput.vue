<template>
  <form ref="parent" class="d-flex" @input="handleInput">
    <input
      v-for="i in length" :key="i"
      type="text" maxlength="1" @focus="handleFocus" @keydown="handleKeydown" @paste="handlePaste"
      class="input" :disabled="disabled"
    />
  </form>
</template>

<script>
export default {
  name: "OtpCodeInput",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 6
    }
  },
  methods: {
    focusLast() {
      const el = [...this.$refs.parent.children].find(child => !child.value);
      if (el) el.focus();
    },
    handleFocus(e) {
      if (!e.target.value) this.focusLast();
    },
    handleKeydown(e) {
      if (e.target.value) return;
      if (e.code.toLowerCase() === 'backspace') {
        const el = [...this.$refs.parent.children].reverse().find(child => child.value);
        if (!el) return;
        el.value = '';
        el.focus();
      }
    },
    handleInput(e) {
      const input = e.target;
      if (input.nextElementSibling && input.value) input.nextElementSibling.focus();
      if (!input.nextElementSibling && input.value) this.handleDone();
    },
    handlePaste(e) {
      const paste = e.clipboardData.getData('text');
      const inputs = this.$refs.parent.querySelectorAll('input');
      inputs.forEach((input, i) => {
        input.value = paste[i] || '';
      });
      setTimeout(() => this.focusLast(), 10);
      if (paste.length === this.length) this.handleDone();
    },
    handleDone() {
      const value = [...this.$refs.parent.children].reduce((acc, child) => acc + child.value, '');
      this.$emit('done', value);
    }
  },
}
</script>

<style lang="scss" scoped>
.input {
  padding: 1rem 0.5rem;
  background-color: #E5E7EB;
  --bg-opacity: 0.6;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  width: 3.5rem;
  border-radius: 0.5rem;
  outline: 0;
  display: flex;

  & + & {
    margin-left: 0.5rem;
    @media (min-width: 1024px) {
      margin-left: 0.875rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 1.5rem 1rem;
    width: 4rem;
  }

  &:disabled {
    opacity: .6;
    pointer-events: none;
  }
}
</style>
