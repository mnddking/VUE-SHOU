<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment()">发表评论</mt-button>

        <div class="cmt-list">
        <div class="cmt-item" v-for="(item, i) in container" :key="item.id">
            <div class="cmt-title">
            第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.name}}&nbsp;&nbsp;发表时间：{{ item.time | dateFormat }}
            </div>
            <div class="cmt-body">
                 {{ item.text === 'undefined' ? '此用户很懒，嘛都没说': item.text }}
            </div>
        </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                container: [], 
                msg: " " 
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments() {
            // 获取评论
            this.$axios
                .get("/container")
                .then(result => {
                    this.container=result.data
                    console.log(result)
                }).catch(error=>{
                    console.log(error)
                });
            },
            postComment(){
                if (this.msg.trim().length === 0) {
                console.log("评论为空")
                }else{
                    let cmt = {
                        name: "匿名用户",
                        time: Date.now(),
                        text: this.msg.trim()
                    } 
                    this.$axios
                    .post("/container", cmt)
                    .then(result=>{    //在编写的时候，这里使用过function，导致this指向了undefined
                        this.container.unshift(cmt);
                        this.msg="";
                    })
                }       
            }
        }
    }
</script>

<style  lang="scss">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}

</style>