<template>
  <div class="index">
    <TabHeader v-on:collapse="collapse"></TabHeader>
    <div class="content">
      <TabSlider :isCollapse="isCollapse"></TabSlider>
      <div class="content_box">
        <TabCard></TabCard>
        <div class="tabRouter">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabHeader from "@/components/tabHeader.vue";
import TabSlider from "@/components/tabSlider.vue";
import TabCard from "@/components/TabCard.vue";
export default {
  name: "index",
  components: {
    TabHeader,
    TabSlider,
    TabCard
  },
  data() {
    return {
      isCollapse: false,
      editableTabs: []
    };
  },
  mounted() {
    let obj = {
      path: this.$route.path,
      name: this.$mainRouter.find(val => val["path"] == this.$route.path).name,
      meta: this.$route.meta.requireAuth
    };
    this.$store.commit("setTabs", obj);
  },
  methods: {
    collapse(event) {
      this.isCollapse = event;
    }
  }
};
</script>

<style lang="less">
.index {
  position: fixed;
  width: 100%;
  height: 100%;
}
.content {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
}
.content_box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.content_box::-webkit-scrollbar {
  width: 0;
}
.tabCard {
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 1;
}
.tabRouter {
  position: absolute;
  width: 96%;
  top: 60px;
  left: 50%;
  margin-left: -48%;
  margin-bottom: 100px;
}
</style>
