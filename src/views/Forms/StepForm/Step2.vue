<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        >{{ info.payAccount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: info.payAccount,
              rules: [{ required: true, message: '请输入密码' }]
            }
          ]"
          type="password"
          placeholder="请输入付款密码"
        />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
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
      // console.log(this.$store.state.form.info);
      return this.$store.state.form.info;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $store, info } = this;

      form.validateFields((err, values) => {
        if (!err) {
          // 执行actions中的方法要使用dispatch
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...info, ...values }
          });
        }
      });
    }
  }
};
</script>
