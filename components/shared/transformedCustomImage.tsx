import { dataUrl, debounce, getImageSize } from "@/libs/utils";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const transformedCustomImage = (props: TransformedImageProps) => {
  const {
    image,
    type,
    title,
    isTransforming,
    setIsTransforming,
    transformationConfig,
    hasDownload = false,
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Transformed</h3>
        {hasDownload && (
          <button>
            <Image
              src={"/assets/icons/download.svg"}
              alt="Download"
              width={25}
              height={25}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image?.title || title || "Transformed Image"}
            sizes={"(max-width: 500px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => setIsTransforming && setIsTransforming(false)}
            onError={() => {
              debounce(
                () => setIsTransforming && setIsTransforming(false),
                5000
              );
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                alt="Transforming..."
                width={50}
                height={50}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Transformed image</div>
      )}
    </div>
  );
};

export default transformedCustomImage;
