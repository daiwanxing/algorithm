<script setup>
import { computed, h, ref } from "vue";
import { getResultv2 } from "./algorithm";
import { debounce } from "lodash-es";
import { Modal } from "ant-design-vue";

const num = ref();
const list = computed(() => getResultv2(num.value) || []);

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    customRender: ({ index }) => h("span",{
      style: {
        fontWeight: "bold",
      }
    }, index + 1),
  },
  {
    title: "A",
    dataIndex: "a",
  },
  {
    title: "B",
    dataIndex: "b",
  },
  {
    title: "C",
    dataIndex: "c",
  },
  {
    title: "D",
    dataIndex: "d",
  },
  {
    title: "E",
    dataIndex: "e",
  },
];

const scrollIntoView = debounce(() => {
  const el = document.querySelector('td[data-active="true"]');
  if (el) {
    el.scrollIntoView({
      block: "end",
    });
  }
}, 100);

const onSearch = () => {
  console.log(list.value);

  list.value.forEach((row, idx) => {
    const colIndex = Object.values(row).findIndex((col) => col === +num.value);
    const key = Object.keys(row)[colIndex];
    if (~colIndex) {
      Modal.info({
        title: '提示',
        content: `数字${num.value} 所在的实际位置：${idx + 1} 行 ${key.toUpperCase()} 列`
      })
    }
  })
}
</script>

<template>
  <div class="container">
    <div class="head">
      <a-input-search v-model:value="num" enter-button="搜索" @search="onSearch" placeholder="输入任意数字，查找数字所在的行和列" />
    </div>
    <div clas="body">
      <a-table
        size="small"
        :columns="columns"
        :data-source="list"
        :pagination="false"
        :scroll="{ y: 500 }"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  .head {
    margin: 0 auto;
    padding: 20px;
    max-width: 350px;
  }

  .body {
    padding: 10px;
  }
}
</style>
