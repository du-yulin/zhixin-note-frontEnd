/**
 * @description: 工具函数
 */
import { customRef, ref, shallowRef } from "vue"


/**
 * @description 防抖函数
 * @param fn 
 * @param delay 
 * @returns 
 */
export const debounce = (fn: Function, delay: number) => {
  let timer: any = null
  return (...args: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


/**
 * @description 防抖ref
 */
export const debouncedRef = (value: any, delay: number) => {
  let timer: any = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: any) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        },delay)
      }
    }
  })
}


/**
 * @description: 返回异步函数执行状态、异常、值
 */
export const useLoading = <T extends (...args: any[]) => Promise<R>, R>(fn: T, ...args: Parameters<T>) => {
  const isLoading = ref(true)
  const error = ref<any>(null)
  const result = shallowRef<R | null>(null)
  fn(...args).then((res) => {
    result.value = res
  }).catch((err) => {
    error.value = err
  }).finally(() => {
    isLoading.value = false
  })

  return { isLoading, error, result }
}
