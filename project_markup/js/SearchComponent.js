Vue.component('searchform', {
    props: ['value'],
    template: `
        <input type="text" class="search-field"
        :value="value"
        @input="$emit('input', $event.target.value)">
    `
})