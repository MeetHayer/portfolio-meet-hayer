import { useState } from 'react'
import data from '@/data/personal.json'

const groups = [
  { id: 'all', label: 'All' },
  { id: 'finance', label: 'Finance' },
  { id: 'cs', label: 'Computer Science' },
] as const

export default function CoursesBelt() {
  const [filter, setFilter] = useState<(typeof groups)[number]['id']>('all')
  const finance = data.education.coursework.finance.map((name) => ({ name, category: 'finance' as const }))
  const cs = data.education.coursework.cs.map((name) => ({ name, category: 'cs' as const }))
  const courses = [...finance, ...cs].filter((c) => filter === 'all' || c.category === filter)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setFilter(group.id)}
            className={`px-3 py-1 text-sm border ${
              filter === group.id
                ? 'bg-forest-500 text-paper border-forest-500'
                : 'border-ink/15 dark:border-white/15 hover:border-forest-500'
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
        {courses.map((course) => (
          <li key={course.name} className="border-b border-ink/10 dark:border-white/10 py-2 text-sm">
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
