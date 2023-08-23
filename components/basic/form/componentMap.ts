import type { Component } from 'vue'
import {
  NAutoComplete,
  NCascader,
  NCheckbox,
  NCheckboxGroup,
  NColorPicker,
  NDatePicker,
  NDivider,
  NDynamicInput,
  NDynamicTags,
  NInput,
  NInputGroup,
  NInputNumber,
  NMention,
  NRadio,
  NRadioButton,
  NRadioGroup,
  NRate,
  NSelect,
  NSlider,
  NSwitch,
  NTimePicker,
  NTreeSelect,
  NUpload,
} from 'naive-ui'
import type { ComponentType } from './types/index'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('NInput', NInput)
componentMap.set('NInputGroup', NInputGroup)
componentMap.set('NInputNumber', NInputNumber)
componentMap.set('NAutoComplete', NAutoComplete)
componentMap.set('NMention', NMention)
componentMap.set('NColorPicker', NColorPicker)

componentMap.set('NSelect', NSelect)
componentMap.set('NTreeSelect', NTreeSelect)
componentMap.set('NSwitch', NSwitch)
componentMap.set('NRadio', NRadio)
componentMap.set('NRadioButton', NRadioButton)
componentMap.set('NRadioGroup', NRadioGroup)
componentMap.set('NCheckbox', NCheckbox)
componentMap.set('NCheckboxGroup', NCheckboxGroup)
componentMap.set('NCascader', NCascader)
componentMap.set('NSlider', NSlider)
componentMap.set('NRate', NRate)

componentMap.set('NDatePicker', NDatePicker)
componentMap.set('NTimePicker', NTimePicker)

componentMap.set('NUpload', NUpload)
componentMap.set('NDynamicInput', NDynamicInput)
componentMap.set('NDynamicTags', NDynamicTags)
componentMap.set('NDivider', NDivider)

export { componentMap }
