import apiClient from './AxiosClient'
import type { Organizer } from '@/types'

export default {
  getOrganizers() {
    return apiClient.get('/organizers')
  },
  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },
  saveOrganizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
  },
  getOrganizerImage(image: string) {
    return apiClient
      .get<string>('/presignedUrl', {
        params: { fileName: image },
        responseType: 'text',
      })
      .then((response) => response.data)
  },
}
