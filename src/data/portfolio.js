import data from './portfolio.json'

// SORT_ORDER: 'latest-first' | 'oldest-first'
const SORT_ORDER = 'latest-first'

// If projects don't have a 'date' field, we can fallback to their position in portfolio.json.
// 'bottom-is-newest': Items at the bottom of the JSON array are considered newer.
// 'top-is-newest': Items at the top of the JSON array are considered newer.
const FALLBACK_POSITION = 'bottom-is-newest'

function parseDate(project, index) {
    if (project.date) {
        return new Date(project.date).getTime()
    }
    // Convert index to a pseudo-timestamp.
    // If bottom is newest, higher index has a larger (newer) timestamp.
    return FALLBACK_POSITION === 'top-is-newest' ? index : -index
}

export const projects = [...data.projects].sort((a, b) => {
    const aVal = parseDate(a, data.projects.indexOf(a))
    const bVal = parseDate(b, data.projects.indexOf(b))

    if (SORT_ORDER === 'bottom-first') {
        return bVal - aVal
    } else {
        return aVal - bVal
    }
})

export const categories = data.categories

