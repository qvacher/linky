<template>
  <div class="bg-gray-900 pb-8 lg:pb-0 lg:h-96 px-4 lg:px-0">
    <h1 class="text-3xl text-center font-bold text-white my-8">{{ msg }}</h1>
    <div class="form-card rounded-lg bg-gray-800 w-full items-center lg:w-1/2 mx-auto p-4 lg:py-8 lg:pl-8 relative flex flex-col lg:flex-row hover:shadow-md border border-purple-600">
      <img src="@/assets/space-man.png" class="w-1/2 mb-4 lg:mb-0 lg:absolute lg:-top-8 lg:-right-16" alt="">
      <form class="flex flex-col w-full lg:w-1/2 items-center lg:items-start" @submit.prevent="shorten()">
        <input class="focus:border-purple-600 focus:ring-1 focus:ring-purple-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-lg pl-4 py-2 mb-4" type="url" pattern="https://.*" v-model="url" aria-label="URL" placeholder="https://my-amazing-url.com" required/>
        <input class="focus:border-purple-600 focus:ring-1 focus:ring-purple-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-lg pl-4 py-2 mb-4" type="text" v-model="alias" aria-label="Alias" placeholder="Alias" required />
        <button class="w-1/2 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-sm hover:shadow-md  text-white font-bold p-2" type="submit">
          Shorten
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </button>    
      </form>
    </div>
  </div>
  <div class="rounded-xl bg-white lg:-mt-8 py-2 px-4 lg:py-4 mx-auto mb-10 grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 lg:gap-0">
    <h1 class="text-lg text-gray-900" v-if="linkys.length == 0">It seems you haven't shorten anything yet 😢. Try shorten your first link 👆</h1>
    <Linky v-else v-for="linky in linkys" :key="linky.code" :linky="linky"/>
  </div>
</template>

<script>
import db from '../firebase/firebaseInit';
import shortid from 'shortid';

import Linky from '@/components/Linky.vue'

export default {
  name: 'Shorten',
  components: {
    Linky
  },
  props: {
    msg: String
  },
  data() {
    return {
      url: '',
      alias: '',
      linkys: []
    }
  },
  mounted() {
    this.refreshList();
  },
  methods: {
    async shorten(){
      let code = shortid.generate().toUpperCase();
      await db.collection('urls').add({
        alias: this.alias,
        url: this.url,
        code: code
      }).then((result) => {
        // Reset form
        this.resetForm();
        // Refresh link list
        this.refreshList();
      }).catch((error) => {
        console.log(error);
      });
    },
    resetForm() {
      this.url = '';
      this.alias = '';
    },
    async refreshList(){
      this.linkys = [];
      await db.collection('urls').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          this.linkys.push(doc.data());
        })
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>
  .form-card {
    box-shadow: rgba(124, 38, 237, .7) 0px 3px 10px 0px;
  }
</style>