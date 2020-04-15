import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import menus from "./config/menu/index";

//引入elementUi
import {
  Button,
  Message,
  Input,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  Form,
  FormItem,
  Select,
  Option,
  Upload,
  Pagination,
  DatePicker,
  PageHeader,
  Dialog,
  MessageBox,
  Card
} from "element-ui";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(PageHeader);
Vue.use(Dialog);
Vue.use(Card);

let notChildren = menus.filter(val => !val["children"]);
let commonChildren = menus.filter(val => val["children"]);
let hasChildren = [];
commonChildren.map(item => {
  hasChildren = [...hasChildren, ...item["children"]];
});

Vue.prototype.$mainRouter = [...hasChildren, ...notChildren];
Vue.prototype.$menus = menus;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
