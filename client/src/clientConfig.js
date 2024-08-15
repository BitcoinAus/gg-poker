const config = {
  isProduction: process.env.NODE_ENV === 'production',
  contentfulSpaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  socketURI:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_SERVER_URI
      : `http://localhost:7777/`,
};

export default config;