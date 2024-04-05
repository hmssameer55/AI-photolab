"use client";

import { useToast } from "@/components/ui/use-toast";
import { dataUrl } from "@/libs/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { getImageSize } from "@/libs/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface MediaUploaderProps {
  onValueChange: (value: string) => void;
  setImage: (image: any) => void;
  image: string;
  publicId: string;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prev: any) => ({
      ...prev,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Success",
      description: "1 credit has been deducted from your account.",
      className: "success-toast",
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Error",
      description: "Failed to upload image",
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="jsm_ai-photolab"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>

          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="Uploaded Image"
                  sizes={"(max-width: 500px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Upload"
                  width={25}
                  height={25}
                />
              </div>
              <p className="p-14-medium">Click to upload an image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
