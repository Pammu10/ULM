"use client";
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload, IKVideo} from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import {toast } from 'sonner';
import { cn } from '@/lib/utils';




const authenticator = async () => {
    try{
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
        
        if (!response.ok){
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
    

        const data = await response.json();
        const {signature, expire, token} = data;
        return {signature, expire, token};  
    } catch(error: any){
        throw new Error(`Failed to authenticate: ${error.message}`);
    }
};

interface Props {
    type: 'image' | 'video';
    accept: string;
    placeholder: string;
    folder: string;
    variant: 'dark' | 'light';
    onFileChange: (filePath: string) => void;
    value: string;
}

const FileUpload = ({type, accept, placeholder, folder, variant, onFileChange, value}: Props) => {
    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{filePath: string} | null>({filePath: value ?? null});
    const [progress, setProgress] = useState(0);
    const styles = {
        button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border', 
        placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500', 
        text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
    }
    const onError = (error: any)=> {
        toast.error(`${type} uploaded failed`, {
            description: `${type} upload failed. Please try again`,
        });
        console.log(error);
    };
    const onSuccess = (res:any)=> {
        setFile(res);
        onFileChange(res.filePath);
        toast.success(`${type} uploaded successfully`, {
            description: `${res.filePath} uploaded`,
        });
    };

    const onValidate = (file: File) => {
        if (type === 'image'){
            if (file.size > 20 * 1024 * 1024){
                toast.error(`Image size too large`, {
                    description: `Image size must be less than 20MB`,
                });
                return false;
            }
        }
        else if (type === 'video'){
            if (file.size > 50 * 1024 * 1024){
                toast.error(`Video size too large`, {
                    description: `Video size must be less than 50MB`,
                });
                return false;
            }
        }
        return true;
    }

  return (
    <ImageKitProvider publicKey={config.env.imagekit.publicKey} urlEndpoint={config.env.imagekit.urlEndpoint} authenticator={authenticator}>
        <IKUpload className='hidden' ref={ikUploadRef} folder={folder} onError={onError} onSuccess={onSuccess} useUniqueFileName={true} validateFile={onValidate} onUploadStart={() => setProgress(0)} 
        onUploadProgress={({loaded, total}) => {const percent = Math.round((loaded / total) * 100); setProgress(percent);}} accept={accept}/>
        <button className={cn('upload-btn', styles.button)} onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current){
                // @ts-ignore
                ikUploadRef.current?.click();
            }
                
        }}>
            <Image src="/icons/upload.svg" alt='upload-icon' width={20} height={20}/>
            <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>
            
            {file && <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>}
            
            {progress > 0 && progress !== 100 &&(
                <div className='w-full rounded-full bg-green-200'>
                    <div className='progress' style={{width: `${progress}%`}}>
                        {progress}%
                    </div>
                    </div>
            )}
        </button>
        {file?.filePath &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  )
}

export default FileUpload