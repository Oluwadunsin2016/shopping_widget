// WidgetComponent.vue
<template>
  <div class="widget">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <!-- Add more of your e-commerce widget features here -->
  </div>
</template>

<script>
export default {
  name: "WidgetComponent",
  props: {
    title: {
      type: String,
      default: "Widget Title",
    },
    description: {
      type: String,
      default: "Widget description goes here.",
    },
  },
};
</script>

<style scoped>
.widget {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}
</style>
