import jojoRequest from '../request'

export function getHomeHotSuggests() {
  return jojoRequest.get({
    url: '/home/hotSuggests'
  })
}

export function getCategories() {
  return jojoRequest.get({
    url: '/home/categories'
  })
}