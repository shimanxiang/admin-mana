<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style lang="less">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: "Microsoft YaHei";
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 15px !important;
}
.el-button--text {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
::-webkit-scrollbar {
  display: none;
}
.el-button {
  padding: 11px 20px;
}
.el-upload--picture-card {
  width: 100px !important;
  height: 100px !important;
  line-height: 98px !important;
}
.el-textarea__inner {
  font-family: inherit;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 100px !important;
  height: 100px !important;
}
.tableData {
  .el-table {
    color: #222;
  }
  .el-table thead {
    color: #222 !important;
    font-weight: bold;
  }
  .el-table th {
    background-color: #ecf5ff !important;
  }
  .el-table td,
  .el-table th {
    padding: 8px 0;
  }
  .el-table__expanded-cell[class*="cell"] {
    padding: 20px 50px;
  }
}
.categorys {
  .el-table td,
  .el-table th {
    padding: 15px 0;
  }
}
.edit-product {
  .el-form-item__content {
    width: 100%;
  }
}
</style>
