<template>
  <div>
    <div class="title"><h2>热读榜</h2>
   <table>
                    <tr v-for="(item,index) in topViews" :key="index">
                        <td style="width:20px">{{index + 1}}</td>
                        <td @click="changePath(item)">{{item.title}}</td>
                        <td style="width:150px" align="center">{{item.date | dateFormat}}</td>
                        <td style="width:70px" align="right">{{item.readcount}}<span>浏览</span></td>
                    </tr>
                </table>
    </div>
    <div class="title"><h2>热评榜</h2>
     <table>
                    <tr v-for="(item,index) in topComments" :key="index">
                        <td style="width:20px">{{index + 1}}</td>
                        <td @click="changePath(item)">{{item.content}}</td>
                        <td style="width:150px" align="center">{{item.date | dateFormat}}</td>
                        <td style="width:70px" align="right">{{item.count}}<span>赞</span></td>
                    </tr>
                </table>
    
    </div>
    <div class="title"><h2>点赞榜</h2>
       <table>
                    <tr v-for="(item,index) in topThumbs" :key="index">
                        <td style="width:20px">{{index + 1}}</td>
                        <td @click="changePath(item)">{{item.title}}</td>
                        <td style="width:150px" align="center">{{item.date | dateFormat}}</td>
                        <td style="width:70px" align="right">{{item.count}}<span>赞</span></td>
                    </tr>
                </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
            topViews:[],
            topThumbs:[],
            topComments:[],
    };
  },
  created(){
        this.getTopViews();
        this.getTopThumbs();
        this.getComments()
  },
  methods:{
      async getTopViews(){
          const{data:res} = await this.$http.get('topViews')
          if(res.code !==200) return this.$message({message:`${res.tips}`,type:'error',duration:1000,offset:5})
             this.topViews = res.data
      },
      async getTopThumbs(){
          const{data:res} = await this.$http.get('topThumbs')
          if(res.code !==200) return this.$message({message:`${res.tips}`,type:'error',duration:1000,offset:5})
             this.topThumbs = res.data
      },
      async getComments(){
          const{data:res} = await this.$http.get('topComments')
          if(res.code !==200) return this.$message({message:`${res.tips}`,type:'error',duration:1000,offset:5})
             this.topComments = res.data
      },
  }
};
</script>

<style lang="less" scoped>
@no: 15;
.title {
  font-size: 20rem / @no;
  display: inline-grid;
  width: 30%;
  margin-right: 20rem / @no;
  color: darkcyan;
  height: 400rem / @no;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10rem / @no;
  box-shadow: 0 2rem / @no 10rem / @no 0 rgba(0, 0, 0, 0.12);
  h2{
      margin:  10px 10px -10px;
  }
  table{
      font-size:16rem /@no;
      td{
         padding-bottom: 25rem /@no;
      }
  }
}
</style>