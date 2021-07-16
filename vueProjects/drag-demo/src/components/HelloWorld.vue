<template>
  <div class="demo-warp">
    <el-form ref="dynamicValidateForm"
             :model="dynamicValidateForm"
             label-width="100px"
             label-position="top"
             class="demo-dynamic">
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'域名' + index"
        :prop="'domains.' + index + '.value'"
        :rules="domain.rules"
      >
        <el-select v-model="value"
                   class="el-select"
                   placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="domain.value"
                  class="el-input"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        <el-button @click="switchData()">改变数据</el-button>
      </el-form-item>
    </el-form>
  </div>
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
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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
  .demo-warp {
    width: 500px;
  }

  .el-input {
      width: 20%;
    }

  .el-select {
      width: 20%;
  }
</style>
