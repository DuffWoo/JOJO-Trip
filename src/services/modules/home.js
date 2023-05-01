import jojoRequest from '../request'

export function getHomeHotSuggests() {
  return jojoRequest.get({
    url: '/home/hotSuggests'
  })
}

export function getHomeCategories() {
  return jojoRequest.get({
    url: '/home/categories'
  })
}

export function getHomeHouseList(currentPage) {
  return jojoRequest.get({
    url: '/home/houselist',
    params: {
      page: currentPage
    }
  })
}