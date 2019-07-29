<template>
    <div id="page-index">
        这是{{page}}页面
        <h1></h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 'index'
        };
    }
};

</script>

<style lang='scss'>
#page-index {
    h1 {
        background: url('../assets/img/logo.png');
        width: 240px;
        height: 72px;
    }
}
</style>