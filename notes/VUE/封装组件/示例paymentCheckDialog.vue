<template>
  <div>
    <el-dialog title="付款核对" :visible.sync="visble" width="30%">
      <el-form label-width="130px" class="demo-ruleForm" label-position="left">
        <el-form-item label="是否已收发票：" :required="true">
          <el-radio v-model="getInvoice" :label="false" :disabled="invoiceDisable">否</el-radio>
          <el-radio v-model="getInvoice" :label="true">是</el-radio>
        </el-form-item>
        <el-form-item label="是否付款：" :required="true">
          <el-radio v-model="alreadyPay" :label="false">否</el-radio>
          <el-radio v-model="alreadyPay" :label="true">是</el-radio>
        </el-form-item>
        <el-form-item label="付款时间：" :required="true" v-show="alreadyPay">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="paymentTime"
            type="date"
            placeholder="选择日期"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <p class="warn" v-show="visebleWarn && !paymentTime">请填写付款时间</p>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            placeholder="最多输入200字"
            v-model="comments"
            show-word-limit
            :maxlength="200"
            :autosize="{ minRows: 2, maxRows: 200}"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 发票不可选
      invoiceDisable: false,
      visebleWarn: false,
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },

  props: {
    visbleF: {
      required: true,
      type: Boolean
    },
    getInvoiceF: {
      default: false
    },
    alreadyPayF: {
      default: false
    },
    paymentTimeF: {},
    commentsF: {},
    comfirmF: {
      type: Function
    }
  },

  computed: {
    visble: {
      get() {
        return this.visbleF;
      },
      set(val) {
        this.$emit("update:visbleF", val);
      }
    },
    getInvoice: {
      get() {
        // 是否已收发票为是的时候，不能更改为否
        if (this.getInvoiceF) {
          this.invoiceDisable = true;
        }
        return this.getInvoiceF;
      },
      set(val) {
        this.$emit("update:getInvoiceF", val);
      }
    },
    alreadyPay: {
      get() {
        return this.alreadyPayF;
      },
      set(val) {
        this.$emit("update:alreadyPayF", val);
        if (!val) this.paymentTime = "";
      }
    },
    paymentTime: {
      get() {
        return this.paymentTimeF;
      },
      set(val) {
        this.$emit("update:paymentTimeF", val);
      }
    },
    comments: {
      get() {
        return this.commentsF;
      },
      set(val) {
        this.$emit("update:commentsF", val);
      }
    }
  },
  methods: {
    cancle() {
      this.visble = false;
      this.getInvoice = false;
      this.alreadyPay = false;
      this.comments = "";
      this.paymentTime = "";
      this.visebleWarn = false;
    },
    comfirm() {
      if (this.comfirmF) {
        if (this.alreadyPay && !this.paymentTime) {
          // console.log('请填写付款时间')
          // this.$message.error('请填写付款时间');
          this.visebleWarn = true;
          return;
        }
        this.visble = false;
        this.comfirmF();
      }
      this.getInvoice = false;
      this.alreadyPay = false;
      this.comments = "";
      this.paymentTime = "";
      this.visebleWarn = false;
    }
  }
};
</script>

<style lang='scss' scoped>
// 调用
// <payment-check
//   :visbleF.sync="checkPaymentDialogVisible"
//   :getInvoiceF.sync="checkPaymentFormData.getInvoice"
//   :alreadyPayF.sync="checkPaymentFormData.alreadyPay"
//   :paymentTimeF.sync="checkPaymentFormData.paymentTime"
//   :commentsF.sync="checkPaymentFormData.comments"
//   :comfirmF="comfirm"    // 点击确定之后的回调方法，可以不传递
// >
// </payment-check>

// 引入
// import paymentCheck from '@/components/paymentCheckDialog'
</style>


<style scoped>
.warn {
  color: red;
  font-size: 12px;
  line-height: 18px;
  padding-left: 5px;
}
</style>







