<script setup>
import { computed, h, ref } from "vue";
import { getResult } from "./algorithm";
import { debounce } from "lodash-es";
import { Modal } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const num = ref();
const list = computed(() => getResult(num.value) || []);

const shareCustomCell = (_, rowIndex, column) => {
  if (rowIndex === target.value.row && column.dataIndex === target.value.col) {
    return {
      "data-active": true,
      style: {
        color: "#3875f6",
        backgroundColor: "#e9f4fe",
        fontWeight: "bold",
      },
    };
  }
};

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    customRender: ({ index }) =>
      h(
        "span",
        {
          style: {
            fontWeight: "bold",
          },
        },
        index + 1
      ),
  },
  {
    title: "A",
    dataIndex: "a",
    customCell: shareCustomCell,
  },
  {
    title: "B",
    dataIndex: "b",
    customCell: shareCustomCell,
  },
  {
    title: "C",
    dataIndex: "c",
    customCell: shareCustomCell,
  },
  {
    title: "D",
    dataIndex: "d",
    customCell: shareCustomCell,
  },
  {
    title: "E",
    dataIndex: "e",
    customCell: shareCustomCell,
  },
];

const scrollIntoView = debounce(() => {
  const el = document.querySelector('td[data-active="true"]');
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
}, 250);

const target = ref({
  row: 0,
  col: 0,
});

const onSearch = () => {
  list.value.forEach((row, idx) => {
    const colIndex = Object.values(row).findIndex((col) => col === +num.value);
    const key = Object.keys(row)[colIndex];
    if (~colIndex) {
      target.value = {
        row: idx,
        col: key,
      };

      Modal.info({
        title: "提示",
        content: `数字${num.value} 所在的实际位置：${
          idx + 1
        } 行 ${key.toUpperCase()} 列`,
        onOk() {
          scrollIntoView();
        },
      });
    }
  });
};
</script>

<template>
  <a-config-provider :locale="zhCN">
    <div class="container">
      <div class="head">
        <a-input-search
          v-model:value="num"
          enter-button="搜索"
          @search="onSearch"
          placeholder="输入任意数字，查找数字所在的行和列"
        />
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
  </a-config-provider>
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
