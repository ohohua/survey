import type { GetProp, UploadFile, UploadProps } from 'antd'
import { PREFIX } from '@/api'
import { message, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
// import { nanoid } from 'nanoid'
import { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface Props {
  value?: string
  onChange?: (url: string) => void
  aspect?: number
}

function UploadImage(props: Props) {
  const { value = '', onChange: parentOnChange, aspect = 1 / 1 } = props

  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (value) {
      setFileList([{ uid: '-1', name: value.split('_')[1] || 'image.png', status: 'done', url: value }])
    }
  }, [value])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)

    if (!newFileList || newFileList.length === 0) {
      if (parentOnChange) {
        parentOnChange('')
      }
      return
    }
    const { status, response } = newFileList[0]
    if (status === 'done' && response.code === 200) {
      message.success(`${newFileList[0].name} 文件上传成功`)

      // 传递给父组件
      if (parentOnChange) {
        parentOnChange(response.data)
      }
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
    <ImgCrop rotationSlider aspect={aspect}>
      <Upload
        name="file"
        action={`${import.meta.env.VITE_SERVICE_BASE_URL}${PREFIX}/minio/upload`}
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
