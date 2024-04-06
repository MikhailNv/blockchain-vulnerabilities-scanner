import { BlobReader, ZipReader } from "@zip.js/zip.js";
import {FC} from 'react'
import { useState } from 'react';
import { serverAction, getYearRangeNvdCve, sss, pinStringToIPFS } from "./ServerAction";
import { sendTweet } from "../scripts/send-tweets"
import { InboxOutlined, LoadingOutlined  } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

import { Select, Space, Input, Spin } from 'antd';
import type { SelectProps } from 'antd';

const { Dragger } = Upload;

const FileUploader: FC = () => {
    const [options, setOptions] = useState<SelectProps['options']>([]);
    const [fileState, setFileState] = useState<boolean>(false);
    const [onScanning, setOnScanning] = useState<boolean>(true);
    const [years, setYears] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>('')
    const [choosenYears, setChoosenYears] = useState<string[]>([]);
    const [file, setFile] = useState<File>();

    async function startScanning(choosenYears: string[], e: File) {
        setOnScanning(false)
        
        const file = e;
        const zipReader = new ZipReader(new BlobReader(file));
        const entries = await zipReader.getEntries();
        const packages_name = entries.map((entry) => entry.filename.split("/").pop()!);

        const cves: string = await serverAction(packages_name, choosenYears);
        
        const cid: string = await pinStringToIPFS(cves);
        
        const tweet = await sendTweet(topic, cid)
    
        setOnScanning(true)
        message.success('Сканирование завершено успешно');
        return entries.map((entry) => entry.filename);
    }

    const handleChange = (value: string[]) => {
        setChoosenYears(value);
        if (value.length > 0)
        {
            setYears(true);
        }
        else
        {
            setYears(false);
        }
    };


    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        beforeUpload: async (file) => {
            setFile(file);
            const options: SelectProps['options'] = [];
            const res = await getYearRangeNvdCve();
            for (var year of res) {
                options.push({
                    label: year,
                    value: year,
                });
            }
            setOptions(options);
            setFileState(true);
            return false;
        },
        onChange(info) {
          const { status } = info.file;
          console.log(status);
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        onRemove(e) {
            setOptions([]);
            setFileState(false);
        }
    };
    return (
    <div className="relative flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative">
        <div className=" w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                    Загрузка файлов
                </h2>
                <p className="mt-2 text-sm text-gray-400">Введите название дистрибутива</p>
            </div>
            {/* <form className="mt-8 space-y-3" action="#" method="POST">
                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                        <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Alt Linux" />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                            <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                </div>
                                <p className="pointer-none text-gray-500 "><span className="text-sm">Перенесите</span> файл сюда <br /> или выберите файл на вашем компьютере</p>
                            </div>
                            <input type="file" className="hidden" onChange={getFileNamesFromZip}/>
                        </label>
                    </div>
                </div>
                        <p className="text-sm text-gray-300">
                            <span>Тип файлов: doc,pdf,types of images</span>
                        </p>
                <div>
                    <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                    Загрузка
                    </button>
                </div>
            </form> */}
            <div className="mt-8 space-y-3">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить</p>
                    <p className="ant-upload-hint">
                    Поддержка одиночной или массовой загрузки. Строго запрещено загружать данные компании или другие
                    запрещенные файлы.
                    </p>
                </Dragger>
            </div>
            {fileState ?
                <>
                    <div className="mt-8 space-y-3">
                        <Input placeholder="Введите название загруженного ПО" onChange={(e) => setTopic(e.target.value)}/>
                    </div>
                    <div className="mt-8 space-y-3">
                        <Space style={{ width: '100%' }} direction="vertical">
                        <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите года для сканирования уязвимостей"
                        onChange={handleChange}
                        options={options}
                        />
                        </Space>
                    </div>
                </>
                : <></>
            }
            <div className="mt-8 space-y-3">
                <button type="button"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg transition ease-in duration-300 disabled:opacity-50"
                disabled={onScanning && years && topic ? false : true}
                onClick={() => startScanning(choosenYears, file!)}>
                    {
                        onScanning ? 
                        <p className="mr-2 text-white-400">Начать сканирование</p>
                        : 
                        <>
                            <p className="mr-2 text-white-400">Сканирование</p>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />} />
                        </>
                    }
                </button>
            </div>
        </div>
    </div>

    )
}
  
export default FileUploader