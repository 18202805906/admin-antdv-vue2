<template>
  <span>
    <a-switch :value="value" checked-children="开" un-checked-children="关" :default-checked="value === 'true'" @change="onChange" v-bind="$attrs" v-on="$listeners"/>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    }
  }
};
</script>
