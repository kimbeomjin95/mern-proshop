import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: '하이플러스유통',
  description: '(주)종합물류, 하이플러스유통',
  keywords: '매점납품, 매점유통, 유통, 종합물류',
};

export default Meta;
