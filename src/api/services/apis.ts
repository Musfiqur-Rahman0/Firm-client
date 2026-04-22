// Farms

import API from "../axios";

const handleResponse = (res: any) => res.data;
const handleError = (err: any) => {
  throw new Error(err?.response?.data?.message || "Request failed");
};

export const rentalspaceApi = {
  list: (params?: string) =>
    API.get(`/rentals${params ? "?" + params : ""}`)
      .then(handleResponse)
      .catch(handleError),

  get: (id: string) =>
    API.get(`/rentals/${id}`).then(handleResponse).catch(handleError),

  book: (id: string, body: any) =>
    API.post(`/rentals/${id}/book`, body)
      .then(handleResponse)
      .catch(handleError),

  create: (body: any) =>
    API.post(`/rentals`, body).then(handleResponse).catch(handleError),
};

// // Marketplace
export const marketApi = {
  list: (params?: string) =>
    API.get(`/produce${params ? "?" + params : ""}`)
      .then(handleResponse)
      .catch(handleError),

  get: (id: string) =>
    API.get(`/produce/${id}`).then(handleResponse).catch(handleError),

  order: (id: string, body: any) =>
    API.post(`/orders`, { produceId: id, ...body })
      .then(handleResponse)
      .catch(handleError),

  myOrders: () => API.get(`/orders/my`).then(handleResponse).catch(handleError),

  create: (body: any) =>
    API.post(`/produce`, body).then(handleResponse).catch(handleError),
};

// Plant Tracking
export const plantApi = {
  list: () => API.get(`/plants`).then(handleResponse).catch(handleError),

  get: (id: string) =>
    API.get(`/plants/${id}`).then(handleResponse).catch(handleError),

  create: (body: any) =>
    API.post(`/plants`, body).then(handleResponse).catch(handleError),

  update: (id: string, body: any) =>
    API.patch(`/plants/${id}`, body).then(handleResponse).catch(handleError),

  delete: (id: string) =>
    API.delete(`/plants/${id}`).then(handleResponse).catch(handleError),
};

// // Community
export const communityApi = {
  posts: (page = 1) =>
    API.get(`/forum/posts?page=${page}&limit=10`)
      .then(handleResponse)
      .catch(handleError),

  createPost: (body: { title: string; postContent: string; tags: string[] }) =>
    API.post(`/forum/posts`, body).then(handleResponse).catch(handleError),

  deletePost: (id: string) =>
    API.delete(`/forum/posts/${id}`).then(handleResponse).catch(handleError),
};

export const vendorApi = {
  createProfile: (body: {
    farmName: string;
    farmLocation: string;
    farmDescription: string;
  }) => API.post(`/vendors`, body).then(handleResponse).catch(handleError),

  profiles: () => API.get(`/vendors`).then(handleResponse).catch(handleError),

  getProfile: (id: string) =>
    API.get(`/vendors/${id}`).then(handleResponse).catch(handleError),

  deleteProfile: (id: string) =>
    API.delete(`/vendors/${id}`).then(handleResponse).catch(handleError),

  updateProfile: (id: string, body: any) =>
    API.patch(`/vendors/${id}`, body).then(handleResponse).catch(handleError),
};

// // Dashboard
// export const dashboardApi = {
//   stats: () =>
//     API.get(`/dashboard/stats`)
//       .then(handleResponse)
//       .catch(handleError),

//   activity: () =>
//     API.get(`/dashboard/activity`)
//       .then(handleResponse)
//       .catch(handleError),
// };
