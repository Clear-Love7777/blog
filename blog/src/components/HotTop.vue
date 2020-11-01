<template>
  <div id="Rank">
    <div>
      <ul>
      <h2><svg class="homeicon">
                  <use xlink:href="#icon-huo1"></use>
                </svg>周热榜</h2>
        <li></li>
      </ul>
    </div>
    <div>
      <ul>
      <h2><svg class="homeicon">
                  <use xlink:href="#icon-huo2"></use>
                </svg>季热榜</h2>
           <li></li>
      </ul>
    </div>
    <div>
      <ul>
        <h2><svg class="homeicon">
                  <use xlink:href="#icon-huo3"></use>
                </svg>总榜</h2>
           <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
     data(){
         return{

         }
     },
     created(){

     },
     methods:{

     }
};
</script>

<style lang="less" scoped>
#Rank {
  display: flex;
  div {
    width: 20%;
    margin: 20px 20px;
  }
  svg{
      margin-top: 5px;
  }
}
</style>