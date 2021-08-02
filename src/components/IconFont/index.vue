<template>
  <span class="icon-font anticon" :style="computedStyle">
    <svg aria-hidden="true" width="1em" height="1em" focusable="false" fill="currentColor">
      <use :xlink:href="'#' + type"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    type: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    computedStyle() {
      return {
        color: this.color,
        fontSize: this.fontSize
      };
    }
  }
};
</script>

<style scoped>
.icon-font {
  width: 1em;
  height: 1em;
  /* vertical-align: -0.15em; */
  overflow: hidden;
  box-sizing: border-box;
}
</style>
