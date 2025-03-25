import type { GetProp, UploadFile, UploadProps } from 'antd'
import { getPresignedUrl } from '@/api'
import { message, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import axios from 'axios'
import { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
// interface Props {
//   onChange?: (fileList: UploadFile[]) => void
// }

function UploadImage() {
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    if (!newFileList || newFileList.length === 0) {
      return
    }
    const { status } = newFileList[0]
    if (status === 'done') {
      message.success(`${newFileList[0].name} 文件上传成功`)
    }
    else if (status === 'error') {
      message.error(`${newFileList[0].name} 文件上传失败`)
    }
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotationSlider>
      <Upload
        name="file"
        action={async (file) => {
          const res = await getPresignedUrl(file.name)
          return res.data
        }}
        customRequest={async (options) => {
          const { onSuccess, file, action } = options
          // console.log(options)

          const res = await axios.put(action, file, {})
          // console.log(res)

          onSuccess!(res.data)
        }}
        maxCount={1}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '上传图片'}
      </Upload>
    </ImgCrop>
  )
}

export default UploadImage
