export function getRequestPriority(requestDate) {
  const date = new Date(requestDate)
  const now = new Date()
  const msDiff = now.getTime() - date.getTime()
  const daysAgo = Math.floor(msDiff / (1000 * 60 * 60 * 24))

  const priority = daysAgo >= 6
    ? { label: 'Alta', class: 'bg-red-100 text-red-700' }
    : daysAgo >= 3
      ? { label: 'Media', class: 'bg-yellow-100 text-yellow-700' }
      : { label: 'Baja', class: 'bg-gray-100 text-gray-600' }

  return { daysAgo, priority }
}
