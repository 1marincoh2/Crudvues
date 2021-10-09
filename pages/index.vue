<template>
  <main>
    <ul>
      <li
        v-for="page in ['Composition API']"
        :key="page"
      >
        <nuxt-link :to="`/${page.toLowerCase().split(' ').join('-')}`">
          With {{ page }}
            <v-btn depressed>
                Normal
            </v-btn>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
</script>
