<template>
    <div>
        <v-app-bar
        color="#6200EA"
        dense
        dark
    >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Page title</v-toolbar-title>

        <v-spacer></v-spacer>


        {{mutations0()}}



    </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            bottom
            temporary
        >
            <v-list
                nav
                dense
            >
                <v-list-item-group

                    active-class="deep-purple--text text--accent-4"
                >
                    <v-list-item to="/agregar">
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/estadoglobal">
                        <v-list-item-title>About</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title>Fizz</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title>Buzz</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

    <nuxt />
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref, useAsync, useContext, useFetch, useMeta, reactive} from '@nuxtjs/composition-api'

const index = defineComponent({
    setup(props, {root}) {

       const drawer= ref(false) ;
        const group = ref(null) ;

        const mutations0 =()=> {
            return root.$store.state.counter;
        }



        return{
            mutations0,
            drawer,
            group,

        }

    }
})
export default index
</script>
