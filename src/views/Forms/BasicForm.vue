<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <!-- 校验有两种方式：自定义校验（利用双向数据绑定），动态校验（不使用双向绑定，将数据的校验交给form代理，校验完成后进行数据同步） -->
      <!-- 自定义校验：validate-status，hasFeedback，help，可以不需要使用 Form.create 和 getFieldDecorator，自己定义校验的时机和内容 -->
      <!-- <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :validate-status="fieldAStatus"
        :help="fieldAHelp"
      > -->
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!-- 自定义校验 -->
        <!-- <a-input v-model="fieldA" placeholder="input placeholder" /> -->
        <!-- 自动校验：将数据代理给form，不能使用双向绑定 -->
        <a-input
          v-decorator="[
            'fieldA',
            {
              initialValue: '',
              rules: [{ required: true, message: '此项为必填项' }]
            }
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'fieldB',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '此项为必填项'
                },
                { min: 6, message: '必须多于5个字符' }
              ]
            }
          ]"
          placeholder="input placeholder"
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
    // 自动校验
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      // 自定义校验
      fieldA: "",
      fieldB: ""
      // fieldAStatus: "",
      // fieldAHelp: ""
    };
  },
  watch: {
    // 自定义校验
    // fieldA(newVal) {
    //   if (newVal.length <= 5) {
    //     this.fieldAStatus = "error";
    //     this.fieldAHelp = "必须多于5个字符";
    //   } else {
    //     this.fieldAStatus = "";
    //     this.fieldAHelp = "";
    //   }
    // }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      // 自定义校验
      // if (this.fieldA.length <= 5) {
      //   this.fieldAStatus = "error";
      //   this.fieldAHelp = "必须多于5个字符";
      // } else {
      //   console.log({ fieldA: this.fieldA });
      // }
      // 动态校验
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // 将校验完成的数据进行同步
          Object.assign(this, values);
        }
      });
    }
  }
};
</script>
