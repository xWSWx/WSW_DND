<template>
	<!--Это Dummy шаблон. Он просто должен быть, хоть какой нибудь. Почему не div? хз.. может, меньше "весит"?-->
	<i style="display: none;">Slots extraction</i>
</template>

<script setup lang="ts">
	import { getCurrentInstance, type Slots } from "vue";
	//defineExpose - это определение внешней ссылочки. 
	//В данном случае, берётся объект slots из инстанса компонента (но не совсем компонента, а его "внутрянки, которая записана в vue")
	//и всё это в явной типизации - "<Slots>"
	defineExpose({
		slots: <Slots>getCurrentInstance()?.slots
	});
</script>
