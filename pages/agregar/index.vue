<template>

    <v-container  >
        <v-btn @click="addTodo()">disminuir</v-btn>
        <v-col>
            <v-card  :color="state.user.id === 0 ? '#2196F3' : '#4DD0E1 ' "
            >



            <v-card-title class="headline">
                {{ state.user.id === 0 ? 'Agregando nuevo usuario' : 'Editando usuario' }}
            </v-card-title>
            <v-card-text>
                <v-form lazy-validation>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="state.user.username"

                                outlined
                                dense
                                label="Username"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="state.user.email"
                                outlined
                                dense
                                label="Email"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="state.user.password"
                                :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[camporequerido, min]"
                                :type="show4 ? 'text' : 'password'"
                                hint="At least 8 characters"
                                class="input-group--focused"
                                counter
                                outlined
                                dense
                                label="Password"
                                @click:append="show4 = !show4"
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions >


                <v-spacer/>
                <v-btn color="#E60023" style="margin: 10px"
                       dark
                       elevation="2" @click="cancelar()">
                    cancelar
                </v-btn>

                <v-btn
                    v-if="state.user.id === 0"
                    color="#00BCD4"
                    dark
                    v-on:click="guardar()"
                >Guardar
                </v-btn>
                <v-btn
                    color="#3D00B5"
                    dark
                    v-else
                    v-on:click="actualizar()"
                >Actualizar
                </v-btn>
            </v-card-actions>


        </v-card>


        <v-card
            max-width="auto"
            class="mx-auto"
            style="margin-top: 20px"

        >


            <v-row class="mb-6" cols="3" dense>
                <v-col cols="12" sm="4" v-for="user in state.users" :key="user.id">
                    <v-card
                        :color="state.user.id === 0 ? '#FF0095' : '#900C3E' "
                        dark
                        class="mx-auto"
                        max-width="400"
                    >
                        <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"

                        >
                            <v-card-title   class="text-h5">
                                Numero id {{ user.id }}



                            </v-card-title>
                        </v-img>

                        <v-card-title class="text-h5">

                            usuario: {{ user.username }}

                        </v-card-title>
                        <v-card-title> Correo Electronico:{{ user.email }}</v-card-title>
                        <v-card-title> Contraseña:{{ user.password }}</v-card-title>


                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon color="#00FF00" @click="editar(user)">
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                            <v-btn color="#151515" icon @click="eliminar(user)">
                                <v-icon>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-col>


            </v-row>

        </v-card>

        </v-col>
    </v-container>
</template
>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, useAsync, useContext, useFetch, useMeta, reactive} from '@nuxtjs/composition-api'
import axios, {AxiosInstance} from 'axios'
import {userService} from '~/common/crud.service'
import {UserModel} from '~/type/user.model'

interface State {
    users: UserModel[];
    user: UserModel;
}

const index = defineComponent({
    components: {},
    setup (props, {root}) {
        const state = reactive<State>({
            users: [],
            user: {
                id: 0,
                username: '',
                email: '',
                password: ''
            } as UserModel
        })

        const items = [
            {
                color: '#1F7087',
                src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',

            },
            {
                color: '#952175',
                src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',

            },
        ]
        const addTodo= ()=> {
            console.log(root.$store)
            root.$store.commit('decrement')

        }


        const Estadosform = ref(null);
        const camporequerido = [(v: string) => !!v || "Required"];
        const min = [(v: string) => v.length >= 8 || 'Min 8 characters'];


        const show4 = ref(false)


        // eslint-disable-next-line require-await
        onMounted(async () => {
            getUsuarios()
        })

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,require-await
        const getUsuarios = async () => {
            // el try ejecuta algo y si falla ejecuta el catch
            try {
                // creamos un nuevo objeto de la clase

                // eslint-disable-next-line new-cap
                const serviceUse = new userService()
                // // accedemos al metodo de que tiene declarado
                const response = await serviceUse.userGet()
                console.log(response.data)
                state.users = response.data


                // axios.get('http://localhost:4000/system/users').then((result) => {
                //   console.log(result.data)
                // })
            } catch (e) {
                // aqui s  state.users= datae atrapa el error
            }
        }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const guardar = async () => {

            // @ts-ignore

            try {
                // creamos un nuevo objeto de la clase
                // eslint-disable-next-line new-cap
                const serviceUser = new userService()
                const service = await serviceUser.userPost(state.user)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.users.unshift(service)


            } catch (response) {
                // aqui se atrapa el error
                console.log('error', response)
            }

            cancelar()
            console.log('estoy agregando')

        }


        const actualizar = async () => {


            try {
                // creamos un nuevo objeto de la clase
                const serviceuser = new userService();
                // accedemos al metodo de que tiene declarado
                const serviceUpdate = await serviceuser.userPatch(state.user);
                const findIndex1 = state.users.findIndex((indice) => indice.id === state.user.id);
                ;
                if (findIndex1 > -1) {
                    // @ts-ignore
                    state.users.splice(findIndex1, 1, serviceUpdate);

                }

                cancelar();
            } catch (response) {
                // aqui se atrapa el error
                console.log('error', response)
            }

            console.log('estoy actualizando')
        }

        const eliminar = async (data: UserModel) => {
            try {
                // creamos un nuevo objeto de la clase
                const serviceuser = new userService();
                // accedemos al metodo de que tiene declarado
                const serviceUpdate = await serviceuser.userDelete(data);
                const findIndex1 = state.users.findIndex((indice) => indice.id === data.id);
                if (findIndex1 > -1) {
                    // @ts-ignore
                    state.users.splice(findIndex1, 1);

                }
                console.log('estoy eliminando la posicion ' + findIndex1)
            } catch (response) {
                // aqui se atrapa el error
                console.log('error', response)
            }

        }


        const cancelar = () => {
            state.user = {
                id: 0,
                username: '',
                email: '',
                password: ''
            } as UserModel
            console.log('estoy cancelando')
        }
        const editar = (user: UserModel) => {
            state.user = user


        }
        return {
            state,
            cancelar,
            guardar,
            editar,
            actualizar,
            eliminar,
            show4,
            camporequerido,
            min,
            Estadosform,
            items,
            addTodo


        }
    }
})
export default index

</script>
<style>
.v-responsive__sizer {
    transition: padding-bottom 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
    flex: 0;
}
</style>
