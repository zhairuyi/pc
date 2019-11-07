<template>
  <el-select placeholder="请选择" :value="value" clearable @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style scoped lang='less'></style>
