<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: info.payAccount,
              rules: [{ required: true, message: '请输入付款账号' }]
            }
          ]"
          placeholder="请输入付款账号"
        />
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!-- 自定义表单控件 -->
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: info.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: checkNum
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">
          下一步
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiverAccount from "@/components/ReceiverAccount";
export default {
  components: {
    ReceiverAccount
  },
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      buttonItemLayout: {
        wrapperCol: { span: 14, offset: 4 }
      }
    };
  },
  computed: {
    info() {
      // 注意加上模块名
      return this.$store.state.form.info;
    }
  },
  methods: {
    // 收款账号校验
    checkNum(rule, value, callback) {
      if (value && value.number) {
        callback();
      } else {
        callback(false);
      }
    },
    handleSubmit() {
      const { form, $store, $router } = this;

      form.validateFields((err, values) => {
        // console.log(values);
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });
          $router.push("/form/step-form/confirm");
        }
        // console.log(err);
      });
    }
  }
};
</script>
