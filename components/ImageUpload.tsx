"use client";
import React, { useRef, useState } from 'react'
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import {toast } from 'sonner';


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


const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {
    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{filePath: string} | null>(null);
    const onError = (error: any)=> {
        toast.error("Image uploaded failed", {
            description: 'Image upload failed. Please try again',
        });
        console.log(error);
    };
    const onSuccess = (res:any)=> {
        setFile(res);
        onFileChange(res.filePath);
        toast.success("Image uploaded successfully", {
            description: `${res.filePath} uploaded`,
        });
    };
  return (
    <ImageKitProvider publicKey={config.env.imagekit.publicKey} urlEndpoint={config.env.imagekit.urlEndpoint} authenticator={authenticator}>
        <IKUpload className='hidden' ref={ikUploadRef} folder="ids" onError={onError} onSuccess={onSuccess}/>
        <button className='upload-btn' onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current){
                // @ts-ignore
                ikUploadRef.current?.click();
            }
                
        }}>
            <Image src="/icons/upload.svg" alt='upload-icon' width={20} height={20}/>
            <p className='text-base text-light-100'>Upload a File</p>
            {file && <p className='upload-filename'>{file.filePath}</p>}
        </button>
        {file && (
            <IKImage alt={file.filePath} path={file.filePath} width={500} height={300}/>
        )}
    </ImageKitProvider>
  )
}

export default ImageUpload