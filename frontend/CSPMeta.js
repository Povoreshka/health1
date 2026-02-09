import { Helmet } from 'react-helmet-async';

function CSPMeta() {
  return (
    <Helmet>
      <meta
        httpEquiv="Content-Security-Policy"
        content={
          "default-src 'self'; " +
          "font-src 'self' https://fonts.gstatic.com data:; " +
          "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
          "img-src 'self' data: https:;"
        }
      />
    </Helmet>
  );
}

export default CSPMeta;