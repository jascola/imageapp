<template>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  created(){
    this.fn();
  },
  methods:{
      fn:function () {
          this.axios.post('http://localhost:8089/proxy/test/test.html').then(res=>{
            console.log(res.data)
          });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
