import React, { FC, useState } from 'react';
import { Upload, message } from 'antd';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ApiUrl from '../../../api/api-url';
import config from '../../../config';

const ArticleCoverUploader: FC = () => {
  const [coverLoading, setCoverLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onBeforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG文件类型!');
    }

    return isJpgOrPng;
  };

  const onUploadChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setCoverLoading(true);
      return
    }

    if (info.file.status === 'done' && info.file.originFileObj) {
      const { data } = JSON.parse(info.file.xhr.response);
      setCoverLoading(false);
      setImageUrl(data.url);
    }
  };

  const uploadButton = (
    <section>
      {coverLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <section className="ant-upload-text">上传封面图</section>
    </section>
  );

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="cover-uploader"
      showUploadList={false}
      action={config.apiUrl + ApiUrl.Upload}
      beforeUpload={onBeforeUpload}
      onChange={onUploadChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}
export default ArticleCoverUploader;