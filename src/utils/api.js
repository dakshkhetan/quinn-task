import axios from "axios";
// import data from "./response.json";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// TODO:
const buildPayload = (continuationToken) => {
  const startDate = null;

  const token = startDate
    ? {
        // sorton: "calendardatetime, createdontimestamp",
        // token: "04-11-2021 13:36:34.254000|04-11-2021 13:38:25.578781"
        sorton: "calendardatetime"
      }
    : null;

  // console.log({ token });

  return {
    requestobjects: [
      {
        posts: {
          operationtype: "read",
          id: {
            return: true
          },
          userid: {
            searchvalues: ["adbef521-7cf6-4344-af48-a9480df46549"],
            return: true
          },
          iscalendarentry: {
            searchvalues: ["true"],
            return: true
          },
          media: {
            return: true
          },
          rating: {
            return: true
          },
          text: {
            return: true
          },
          privacy: {
            searchvalues: [18],
            return: true
          },
          typeofday: {
            return: true
          },
          calendardatetime: {
            return: true,
            sort: "descending"
          },
          maxitemcount: "20",
          continuationtoken: token
        }
      }
    ]
  };
};

export const fetchPosts = async (continuationToken = null) => {
  try {
    const payload = buildPayload(continuationToken);
    const response = await api.post("/graph", payload);
    return response.data;

    // return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
