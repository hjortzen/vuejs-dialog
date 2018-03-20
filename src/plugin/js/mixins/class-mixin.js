export default {
    methods: {
        customClasses(optionKey) {
            if (optionKey !== undefined && this.options.customClasses !== undefined &&
                this.options.customClasses[optionKey] !== undefined) {

                return this.options.customClasses[optionKey]
            }
        }
    }
}