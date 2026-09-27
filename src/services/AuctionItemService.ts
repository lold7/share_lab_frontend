import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AUCTION_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getAuctionItems(perPage: number, page: number) {
    return apiClient.get('/auction-items?_limit=' + perPage + '&_page=' + page)
  },
  getAuctionItemsByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get(
      '/auction-items?keyword=' + keyword + '&_limit=' + perPage + '&_page=' + page,
    )
  },
}
