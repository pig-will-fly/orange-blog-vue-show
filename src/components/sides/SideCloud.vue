<template>
  <aside class="cloud">
    <h4 class="title">标题云</h4>
    <div ref="cloud">
      <p v-for="(item,index) in tags" :key="index" ref="tag" v-text="item.title"></p>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideCloud",
  data() {
    return {
      option: {
        color: null,
        radius: 130,
        maxFontSize: 20,
        cos: Math.cos(Math.PI / 1000),
        sin: Math.sin(Math.PI / 1000)
      },
      tagList: [],
      tags: [],
    }
  },
  created() {
    this.getEssayTitleCloud();
  },
  mounted() {
    this.initTags()
  },
  methods: {
    getEssayTitleCloud() {
      this.$api.getEssayTitleCloud().then((res) => {
        this.tags = res.data;
      })
    },
    initTags() {
      for (let i = 0, n = this.tags.length; i < n; i++) {
        let theta = Math.acos((2 * (i + 1) - 1) / n - 1);
        let phi = theta * Math.sqrt(n * Math.PI);
        if (this.option.color) {
          this.$refs.tag[i].style.color = this.option.color
        } else {
          // 随机颜色
          this.$refs.tag[i].style.color =
              'rgb(' +
              Math.round(255 * Math.random()) +
              ',' +
              Math.round(255 * Math.random()) +
              ',' +
              Math.round(255 * Math.random()) +
              ')'
        }
        let tag = {
          x: this.option.radius * Math.sin(theta) * Math.cos(phi),
          y: this.option.radius * Math.sin(theta) * Math.sin(phi),
          z: this.option.radius * Math.cos(theta),
          el: this.$refs.tag[i]
        }
        this.tagList.push(tag);
      }
      const _self = this
      this.timer = setInterval(() => {
        for (let i = 0, n = _self.tagList.length; i < n; i++) {
          _self.rotateX(_self.tagList[i])
          _self.rotateY(_self.tagList[i])
          _self.setPosition(
              _self.tagList[i],
              _self.option.radius,
              _self.option.maxFontSize
          )
        }
      }, 20)
    },
    setPosition(tag, radius, maxFontSize) {
      // 设置每个标签的位置、透明度、字体大小
      if (this.$refs.cloud) {
        tag.el.style.transform = 'translate('
            + (tag.x + this.$refs.cloud.offsetWidth / 2 - tag.el.offsetWidth / 2) + 'px,'
            + (tag.y + this.$refs.cloud.offsetHeight / 2 - tag.el.offsetHeight / 2) + 'px)';
        tag.el.style.opacity = String(tag.z / radius / 2 + 0.7);
        tag.el.style.fontSize = (tag.z / radius / 2 + 0.5) * maxFontSize + 'px';
      }
    },
    rotateX(tag) {
      const {y, z} = tag;
      tag.y = y * this.option.cos - z * this.option.sin;
      tag.z = y * this.option.sin + z * this.option.cos;
    },
    rotateY(tag) {
      const {x, z} = tag
      tag.x = z * this.option.sin + x * this.option.cos;
      tag.z = z * this.option.cos - x * this.option.sin;
    }
  },
  watch: {
    tags() {
      this.$nextTick(() => {
        this.initTags()
      })
    }
  },
  beforeDestroy() {
    // 切换组件清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.cloud {
  width: 100%;
  margin-top: 20px;
  background: @content-color;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .title {
    position: relative;
    font-size: 18px;
    padding-left: 20px;
    margin-bottom: 15px;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &::before {
      position: absolute;
      content: "";
      width: 4px;
      height: 15px;
      line-height: 15px;
      background: @theme-color;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-radius: 30px;
    }
  }

  div {
    height: 260px;
    width: 260px;
    position: relative;
    margin: 0 auto;
    text-align: center;
  }

  p {
    display: inline-block;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>