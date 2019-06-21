<template>
  <div class="home-layout">
    <nav-bar />
    <router-view/>
  </div>
</template>

<script>
import { NavBar } from '@/components'

export default {
  name: 'HomeLayout',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>

</style>
