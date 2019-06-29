<template>
  <div class="nav-bar-container">
    <b-container class="text-left">
      <h3>Phone Detail Scraper</h3>
      <div>
        <router-link :to="{ name: 'Home' }" class="mr-3">Pro WhitePages API</router-link>
        <router-link :to="{ name: 'Home' }">Opencnam API</router-link>
      </div>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
