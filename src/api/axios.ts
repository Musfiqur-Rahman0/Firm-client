import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;


const handleResponse = (res: any) => res.data;
const handleError = (err: any) => {
  throw new Error(err?.response?.data?.message || "Request failed");
};

// Farms
export const farmApi = {
  list: (params?: string) =>
    API.get(`/farms${params ? "?" + params : ""}`)
      .then(handleResponse)
      .catch(handleError),

  get: (id: string) =>
    API.get(`/farms/${id}`)
      .then(handleResponse)
      .catch(handleError),

  book: (id: string, body: any) =>
    API.post(`/farms/${id}/book`, body)
      .then(handleResponse)
      .catch(handleError),

  create: (body: any) =>
    API.post(`/farms`, body)
      .then(handleResponse)
      .catch(handleError),
};

// // Marketplace
// export const marketApi = {
//   list: (params?: string) =>
//     API.get(`/produce${params ? "?" + params : ""}`)
//       .then(handleResponse)
//       .catch(handleError),

//   get: (id: string) =>
//     API.get(`/produce/${id}`)
//       .then(handleResponse)
//       .catch(handleError),

//   order: (id: string, body: any) =>
//     API.post(`/orders`, { produceId: id, ...body })
//       .then(handleResponse)
//       .catch(handleError),

//   myOrders: () =>
//     API.get(`/orders/my`)
//       .then(handleResponse)
//       .catch(handleError),

//   create: (body: any) =>
//     API.post(`/produce`, body)
//       .then(handleResponse)
//       .catch(handleError),
// };

// // Plant Tracking
// export const plantApi = {
//   list: () =>
//     API.get(`/plants`)
//       .then(handleResponse)
//       .catch(handleError),

//   get: (id: string) =>
//     API.get(`/plants/${id}`)
//       .then(handleResponse)
//       .catch(handleError),

//   create: (body: any) =>
//     API.post(`/plants`, body)
//       .then(handleResponse)
//       .catch(handleError),

//   update: (id: string, body: any) =>
//     API.patch(`/plants/${id}`, body)
//       .then(handleResponse)
//       .catch(handleError),

//   delete: (id: string) =>
//     API.delete(`/plants/${id}`)
//       .then(handleResponse)
//       .catch(handleError),
// };

// // Community
// export const communityApi = {
//   posts: (page = 1) =>
//     API.get(`/community/posts?page=${page}&limit=10`)
//       .then(handleResponse)
//       .catch(handleError),

//   createPost: (body: { postContent: string }) =>
//     API.post(`/community/posts`, body)
//       .then(handleResponse)
//       .catch(handleError),

//   deletePost: (id: string) =>
//     API.delete(`/community/posts/${id}`)
//       .then(handleResponse)
//       .catch(handleError),
// };

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