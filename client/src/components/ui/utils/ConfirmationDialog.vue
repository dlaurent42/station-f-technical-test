<template>
  <mu-dialog
    :title="title"
    width="400px"
    class="dialog-title"
    :open.sync="opened"
    v-if="show"
  >
    <div class="dialog-text">
      {{ text }}
    </div>
    <mu-button
      class="dialog-action"
      slot="actions"
      flat
      @click="onClose"
    >
      Cancel
    </mu-button>
    <mu-button
      class="dialog-action"
      slot="actions"
      color="#222"
      @click="onSubmit"
    >
      Confirm
    </mu-button>
  </mu-dialog>
</template>

<script>
export default {
  data: () => ({
    opened: true,
  }),
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Confirmation',
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClose() {
      this.opened = true;
      this.$emit('close');
    },
    onSubmit() {
      this.onClose();
      this.$emit('submit');
    },
  },
  watch: {
    opened(value) {
      if (!value) this.onClose();
    },
  },
};
</script>

<style lang="scss">
.dialog-text {
  padding: 24px;
}

.dialog-action {
  margin: 0 10px;
}

</style>
