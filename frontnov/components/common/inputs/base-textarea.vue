<template>
    <label :for="$attrs['for']">
        <span style="font-weight: 600;">{{ label }}</span>
        <div class="inputWrapper" :style="`height: ${height} !important`">
            <slot name="img"></slot>
            <textarea :id="$attrs['for']" :name="name" :class="{ 'has-icon': hasIcon, error: v?.$error }" :type="type"
                :placeholder="placeholder" :value="modelValue" :readonly="readonly" :maxlength="80000"
                :disabled="disabled" :required="required" @input="onInput" ></textarea>
        </div>
        <span v-if="v && v?.$error" class="error">{{
                v.$errors[0]?.$message
        }}</span>
    </label>
</template>
<script setup>
const props = defineProps({
    placeholder: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "text",
    },
    hasIcon: {
        type: Boolean,
        default: false,
    },
    value: {
        type: [String, Number, Boolean, null],
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    max: {
        type: Number,
        default: 255,
    },
    readonly: {
        type: Boolean,
        default: false,
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
        default: null,
    },
    modelValue: {
        type: [String, Number, Boolean, null],
        default: "",
    },
    isTextArea: {
        type: Boolean,
        default: false,
    },
    height: {
        type: String,
        default: "5rem",
    },
})
const emit = defineEmits(["update:modelValue"]);
const onInput = (e) => {
    if (props.v) {
        props.v.$touch();
    }
    emit("update:modelValue", e.target.value);
};
</script>
<style scoped>
.inputWrapper {
    height: 2.5rem;
    padding: 0 0.2rem;
    position: relative;
    width: 100%;
    display: block;
    overflow: auto;
}

.inputWrapper textarea {
    padding: 0 0.5rem;
    resize: none;
}

.inputWrapper>textarea {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.inputWrapper>textarea.has-icon {
    padding-left: 40px;
}

.inputWrapper :deep(img) {
    position: relative;
    width: 24px;
    height: auto;
    z-index: 2;
    left: 0.25rem;
}

label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.error {
    color: red;
    margin-top: 0.25rem;
}

input.error {
    border: 1px solid red;
}
</style>
  