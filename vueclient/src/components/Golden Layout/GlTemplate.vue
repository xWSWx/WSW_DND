<!--Глобально, это шаблончик элемента с слотом внутри для рендеринга -->
<!--Плюс, несколько вспомогательных функций -->

<template>
	<div ref="GlTemplate" style="position: absolute; overflow: hidden">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const GlTemplate = ref<null | HTMLElement>(null); //реактивная ссылка на элемент DOM дерева. Инициализирована null, а когда onMounted должна стать HTMLElement

//чтобы получать строки а-ля "100px".. вынести бы из этого файла.
const numberToPixels = (value: number): string => {
	return value.toString(10) + "px";
};

const setPosAndSize = (
	left: number,
	top: number,
	width: number,
	height: number
): void => {
	if (GlTemplate.value) {
		const el = GlTemplate.value as HTMLElement;
		el.style.left = numberToPixels(left);
		el.style.top = numberToPixels(top);
		el.style.width = numberToPixels(width);
		el.style.height = numberToPixels(height);
	}
};

const setVisibility = (visible: boolean): void => {
	if (GlTemplate.value) {
		const el = GlTemplate.value as HTMLElement;
		if (visible) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
};

const setZIndex = (value: string): void => {
	if (GlTemplate.value) {
		const el = GlTemplate.value as HTMLElement;
		el.style.zIndex = value;
	}
};

defineExpose({
	setPosAndSize,
	setVisibility,
	setZIndex,
});
</script>
