<template>
    <div>


        <v-btn @click="addTodo">incrementar</v-btn>
    </div>

</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, useAsync, useContext, useFetch, useMeta, reactive} from '@nuxtjs/composition-api'

const index = defineComponent({
    setup(props, {root}) {



      const addTodo= ()=> {
            console.log(root.$store)
             root.$store.commit('increment')

        }

return{

  addTodo
}

    }
})
export default index
</script>

<style scoped>

</style>
