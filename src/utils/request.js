import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(err => {
      const {
        response: { status, statusText }
      } = err;
      notification.error({
        // message: status,
        // 取消eslint的报错
        // eslint-disable-next-line no-unused-vars
        message: h => (
          // 要对提示信息进行样式上的修饰可以使用jsx，需要安装配置
          // npm i --save-dev @vue/babel-helper-vue-jsx-merge-props
          // npm i --save-dev @vue/babel-preset-jsx
          <div>
            请求错误 <span style="color: red">{status}</span>
          </div>
        ),
        description: statusText
      });
      return Promise.reject(err);
    });
}
export default request;
