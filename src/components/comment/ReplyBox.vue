<template>
  <a-form layout="inline" :form="form" @submit="handleSubmit">
    <div>
      <a-form-item class="textarea" :wrapperCol="{span: 24}"
                   :validate-status="showError('content') ? 'error' : ''"
                   :help="showError('content') || ''">
        <a-textarea class="textarea"
                    v-decorator="['content',{ rules: [{ required: true, message: '输入内容不能为空!'}] }]"
                    :rows="4" placeholder="说点什么吧"/>
      </a-form-item>
    </div>
    <div class="input-area flex-direction-md">
      <a-form-item class="margin-right15-sm input" :validate-status="showError('name') ? 'error' : ''"
                   :help="showError('name') || ''">
        <a-input v-decorator="['name',{ rules: [{ required: true, message: '请输入昵称!'}] }]"
                 placeholder="昵称">
          <a-icon class="icon" slot="prefix" type="user"/>
        </a-input>
      </a-form-item>
      <a-form-item class="margin-right15-sm input" :validate-status="showError('email') ? 'error' : ''"
                   :help="showError('email') || ''">
        <a-input
            v-decorator="['email',{ rules: [{ required: true, message: '请输入邮箱!' },{ type: 'email', message: '邮箱格式有误!' }] }]"
            type="email"
            placeholder="邮箱">
          <a-icon class="icon" slot="prefix" type="mail"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click.prevent="handleSubmit"
                  :disabled="hasErrors(form.getFieldsError())">
          提交
        </a-button>
      </a-form-item>
    </div>
  </a-form>
</template>

<script>
export default {
  props: {
    type: {
      default: 1
    },
    parentId: {
      default: null
    },
    essayId: {
      default: null
    }
  },
  data() {
    return {
      comment: {
        type: this.type,
        parentId: this.parentId,
        essayId: this.essayId,
        name: "",
        email: "",
        content: ""
      },
      form: this.$form.createForm(this, {name: 'reply'}),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields(() => true);
    });
  },
  methods: {
    hasErrors(fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    },
    showError(field) {
      const {getFieldError, isFieldTouched} = this.form;
      return isFieldTouched(field) && getFieldError(field);
    },
    saveComment(comment) {
      const _this = this;
      this.$api.saveComment(comment).then((res) => {
        this.$message.success(res.message)
        _this.$emit("refreshList", null);
      }, () => {
        this.$message.success("保存失败！")
      })
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.type = this.type;
          values.parentId = this.parentId;
          values.essayId = this.essayId;
          this.saveComment(values);
        }
      });
    }
  },
};
</script>
<style lang="less" scoped>
.icon {
  color: @mark-color;
}

.textarea {
  width: 100%;
}

.input-area {
  display: flex;

  .input {
    width: 100%;
  }
}

.avatar {
  margin: 10px;
  cursor: pointer;
  transition: all .5s;

  &.avatar-selected {
    border: .5px solid @theme-color;
    box-shadow: 0 0 2px 1px @theme-color;
  }
}
</style>