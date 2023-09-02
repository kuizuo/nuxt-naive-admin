<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import { useThemeVars } from 'naive-ui'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['close'])

const themeVars = useThemeVars()
const { isMobile } = useDevice()

const {
  handleSearch,
  searchResult,
  keyword,
  activeIndex,
  handleEnter,
  handleMouseenter,
} = usemenu_search(emit)

const getIsNotData = computed(
  () => !keyword || unref(searchResult).length === 0,
)

function handleClose() {
  searchResult.value = []
  emit('close')
}
</script>

<template>
  <Transition name="zoom-fade" mode="out-in">
    <div
      v-if="show" class="search-modal" :class="[
        {
          'search-modal--mobile': isMobile,
        },
      ]" @click.stop
    >
      <div v-on-click-outside="handleClose" class="modal-container">
        <div class="input__wrapper">
          <NInput
            class="input"
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <Icon size="24px" color="gray" name="ant-design:search-outlined" />
            </template>
          </NInput>
          <span class="w-12 text-center text-gray-400 text-lg inline-block md:hidden" @click="handleClose">
            {{ '取消' }}
          </span>
        </div>

        <div v-show="getIsNotData" class="flex justify-center items-center w-full h-[100px] text-sm text-gray-400 ">
          {{ '暂无搜索结果' }}
        </div>

        <ul
          v-show="!getIsNotData"
          class="list"
        >
          <li
            v-for="(item, index) in searchResult"
            :key="item.path"
            :data-index="index"
            class="list__item" :class="[
              {
                [`list__item--active`]: activeIndex === index,
              },
            ]"
            @mouseenter="handleMouseenter"
            @click="handleEnter"
          >
            <div class="w-[30px]">
              <Icon :name="item.icon || 'mdi:form-select'" size="20px" />
            </div>
            <div class="flex-1">
              {{ item.name }}
            </div>
            <div class="w-[30px] list__item-enter">
              <Icon name="ant-design:enter-outlined" size="20px" />
            </div>
          </li>
        </ul>

        <div class="search-footer hidden md:flex">
          <Icon class="item" name="ant-design:enter-outlined" />
          <span>{{ '确认' }}</span>
          <Icon class="item" name="ion:arrow-up-outline" />
          <Icon class="item" name="ion:arrow-down-outline" />
          <span>{{ '切换' }}</span>
          <Icon class="item" name="mdi:keyboard-esc" />
          <span>{{ '关闭' }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  background-color: rgb(0 0 0 / 25%);
  justify-content: center;

  &--mobile {
    padding: 0;

    > div {
      width: 100%;
    }

    .input {
      width: calc(100% - 38px);
    }

    .modal-container {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }

    .list {
      height: calc(100% - 80px);
      max-height: unset;

      &__item {
        &-enter {
          opacity: 0% !important;
        }
      }
    }
  }

  .modal-container {
    position: relative;
    width: 632px;
    margin: 0 auto auto;
    background-color: v-bind('themeVars.cardColor');
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
    flex-direction: column;
  }

  .input__wrapper {
    display: flex;
    padding: 14px 14px 0;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }

  .input {
    width: 100%;
    height: 48px;
    font-size: 1.5em;
    color: #1c1e21;
    border-radius: 6px;

    span[role='img'] {
      color: #999;
    }
  }

  .list {
    max-height: 472px;
    padding: 0 14px;
    padding-bottom: 20px;
    margin: 0 auto;
    margin-top: 14px;
    overflow: auto;

    &__item {
      position: relative;
      display: flex;
      height: 56px;
      padding-bottom: 4px;
      padding-left: 14px;
      margin-top: 8px;
      font-size: 14px;
      color: #000000d9;
      cursor: pointer;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #d4d9e1;
      align-items: center;

      > div:first-child,
      > div:last-child {
        display: flex;
        align-items: center;
      }

      &--active {
        color: #fff;
        background-color: v-bind('themeVars.primaryColorHover');

        .list__item-enter {
          opacity: 100%;
        }
      }

      &-enter {
        opacity: 0%;
      }
    }
  }
}

:deep(.n-input__input) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-footer {
  position: relative;
  height: 44px;
  padding: 0 16px;
  font-size: 12px;
  color: #666;
  background-color: v-bind('themeVars.cardColor');
  border-top: 1px solid v-bind('themeVars.borderColor');
  border-radius: 0 0 16px 16px;
  align-items: center;
  flex-shrink: 0;

  .item {
    display: flex;
    width: 20px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 0.4em;
    background-color: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px rgb(30 35 90 / 40%);
    align-items: center;
    justify-content: center;

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(6) {
      margin-left: 14px;
    }
  }
}

.zoom-out-enter-active,.zoom-out-leave-active {
    transition: opacity .1 ease-in-out,transform .15s ease-out
}

.zoom-out-enter-from,.zoom-out-leave-to {
    transform: scale(0);
    opacity: 0
}

.zoom-fade-enter-active,.zoom-fade-leave-active {
    transition: transform .2s,opacity .3s ease-out
}

.zoom-fade-enter-from {
    transform: scale(.92);
    opacity: 0
}

.zoom-fade-leave-to {
    transform: scale(1.06);
    opacity: 0
}
</style>
