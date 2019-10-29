<template>
  <div class="contain">
    <img src="../../assets/welcome.jpg" alt class="wel" />
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => {
      console.log(res.data)
    }).catch(() => {
      console.log('error')
    })
  }

}
</script>

<style>
.wel {
  display: block;
  margin: 0 auto;
}
</style>
