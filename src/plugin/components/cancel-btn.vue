<template>
    <button v-if="enabled" :class="['dg-btn', 'dg-btn--cancel', {'dg-pull-right': options.reverse}, customClasses('cancelButton')]"
            @click.prevent="$emit('click')" ref="btn">
        <slot></slot>
    </button>
</template>

<script>
    import CustomClassMixin from '../js/mixins/class-mixin.js'

    export default {
        props: ['enabled', 'options', 'focus', 'loading'],
        mounted(){
            this.focus && this.$refs.btn.focus()
        },
        mixins: [CustomClassMixin]
    }
</script>