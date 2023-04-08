import jojoRequest from '../request'

export function getCityAll() {
  return jojoRequest.get({
    url: '/city/all'
  })
}