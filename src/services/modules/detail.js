import jojoRequest from '../request'

export function getDetailInfos(houseId) {
  return jojoRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}