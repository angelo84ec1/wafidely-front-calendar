<template>
  <div>
    <label :for="$attrs['for']">
      <span style="font-weight: 600">{{ label }}</span>
      <select
        class="custom-select"
        :id="$attrs['for']"
        :class="{ error: v?.$error }"
        :name="name"
        :required="required"
        :disabled="disabled"
        @change="onChange"
        :value="modelValue"
      >
        <option v-for="(option, idx) in options" :key="idx" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </label>
    <span v-if="v && v?.$error" class="error">{{ v.$errors[0]?.$message }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  options: {
    type: [Array, Object],
    default: () => [],
  },
  value: {
    type: [String, Number, Boolean, null],
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  v: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Number, Boolean, null],
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const onChange = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error {
  color: red;
  margin-top: 0.25rem;
}

select.error {
  border: 1px solid red !important;
}
</style>
