<template>
  <el-form ref="dynamicValidateForm"
           :model="dynamicValidateForm"
           label-width="100px"
           class="demo-dynamic">
    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'域名' + index"
      :prop="'domains.' + index + '.value'"
      :rules="domain.rules"
    >
      <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="addDomain">新增域名</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      <el-button @click="switchData()">改变数据</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          key: Date.now(),
          value: '',
          rules: {
            required: true, message: '域名不能为空', trigger: 'blur'
          }
        }]
      }
    };
  },
  methods: {
    switchData() {
      this.dynamicValidateForm.domains[0].rules = {};
    },
    // 提交
    submitForm(formName) {
      const value = [
        {
          key: Date.now(),
          value: '',
          rules: {
          // required: true, message: '域名不能为空', trigger: 'blur'
          }
        },
        {
          key: Date.now() + 1,
          value: '',
          rules: {
            required: true, message: '域名不能为空', trigger: 'blur'
          }
        }
      ];
      // this.$set(this.dynamicValidateForm, 'domains', value);
      // this.dynamicValidateForm.domains[0].rules = {}; // 不校验第一项
      this.switchData();
      console.log(this.dynamicValidateForm.domains);
      Promise.resolve().then(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      });
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // 将每一项的rules改回初始值
    },

    // 移除
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },

    // 增加
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
        rules: {
          required: true, message: '域名不能为空', trigger: 'blur'
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
