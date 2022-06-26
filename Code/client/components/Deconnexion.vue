<template>
  
</template>

<script>
module.exports = {
  name: 'Deconnexion',
  data() {
    return {
     
    }
  },
  methods: {
   
  },
  mounted() {
    this.$emit('deconnexion')
    this.$router.push('/');
  }
}</script>
</script>

<style>

</style>