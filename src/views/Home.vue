<template>
  <div class="flex flex-col content-center justify-center">
    <Shorten msg="Linky - Simple VueJS x Firebase URL shortener"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Shorten from '@/components/Shorten.vue'

export default {
  name: 'Home',
  components: {
    Shorten
  }
}
</script>
