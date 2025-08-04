import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JobCard from '@/components/JobCard.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('JobCard.vue', () => {
  const mockJob = {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    category: 'Development',
    description: 'Skilled Vue.js developer to build modern SPAs.',
    postedAt: '2025-05-10',
    detail: 'Build modern SPAs with Vue 3.',
    requirements: ['Vue 3', 'Tailwind', 'REST API'],
    employmentType: 'Full-time',
    experienceLevel: 'Mid',
    salaryRange: '$60,000 - $85,000'
  }

  it('renders job title, company, and location', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain('Frontend Developer')
    expect(wrapper.text()).toContain('TechCorp')
    expect(wrapper.text()).toContain('Remote')
  })

  it('formats and displays the posted date', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain('Posted on:')
    expect(wrapper.text()).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
  })

  it('links to the correct job detail page', () => {
    const wrapper = mount(JobCard, {
      props: { job: mockJob },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props().to).toBe('/jobs/1')
  })
})
