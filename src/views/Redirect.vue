<script>
import db from '../firebase/firebaseInit';

export default {
  name: 'Redirect',
  props: {
  },
  mounted(){
    db.collection('urls').where('code', '==', this.$route.params.code).onSnapshot((linky) => {
      if(linky.empty){
        this.$router.push({name: '404'});
      } else {
        window.location.replace(linky.docs[0].data().url);
      }
    })
  }
}
</script>