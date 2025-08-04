import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

describe('AppHeader.vue', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders site title', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.text()).toContain('OurJobsBoard')
  })

  it('toggles dark mode on click', async () => {
    const wrapper = mount(AppHeader)

    const button = wrapper.get('button')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
