// // Import necessary hooks and components from React and other libraries
// import React from 'react';
// import { BrowserRouter as Router, Route, } from 'react-router-dom';
import tw from "twin.macro";
import Skeleton from "../components/Skeleton.tsx";

import 'photoswipe/dist/photoswipe.css'

import { Gallery as GalleryComponent , Item } from 'react-photoswipe-gallery'
// import '../css/Gallery.css'; // Make sure to include your CSS file for styling
//
// // Component for the individual image thumbnail
// function ImageThumbnail({ src, alt, onClick }) {
//     return (
//         <div className="image-thumbnail" onClick={onClick}>
//             <img src={src} alt={alt} />
//         </div>
//     );
// }
//
// // Component for the grid of images on the home page
// function ImageGrid({ images, onImageClick }) {
//     return (
//         <div className="image-grid">
//             {images.map((image, index) => (
//                 <ImageThumbnail key={index} src={image.src} alt={image.alt} onClick={() => onImageClick(image.id)} />
//             ))}
//         </div>
//     );
// }
//
// // Component for the image detail view
// function ImageDetail({ imageId, images }) {
//     const image = images.find(img => img.id === imageId);
//     if (!image) return <div>Image not found</div>;
//
//     return (
//         <div className="image-detail">
//             <img src={image.src} alt={image.alt} />
//             <div className="image-metadata">
//                 <p>{image.date}</p>
//                 <p>{image.message}</p>
//             </div>
//             <div className="image-comments">
//                 {/* Render comments here */}
//             </div>
//         </div>
//     );
// }

// const PhotoList = [
//     {
//         ImageUrl:[
//             'https://gcph70ngzq52xuxm.public.blob.vercel-storage.com/photo-2A3IpPV2.jpg',
//         ],
//         id:1
//     },
//     {
//         ImageUrl:[
//             'https://gcph70ngzq52xuxm.public.blob.vercel-storage.com/photo-4nigjuzZ.jpg',
//         ],
//         id:2
//     },
//     {
//         ImageUrl:[
//             'https://gcph70ngzq52xuxm.public.blob.vercel-storage.com/photo-6bPt0T8F.jpg',
//         ],
//         id:3
//     },
//     {
//         ImageUrl:[
//             'https://gcph70ngzq52xuxm.public.blob.vercel-storage.com/photo-6vrZDhU3.jpg',
//         ],
//         id:4
//     },
//     {
//         ImageUrl:[
//             'https://gcph70ngzq52xuxm.public.blob.vercel-storage.com/photo-EOVrLmgn.jpg',
//         ],
//         id:5
//     }
// ]
// The main App component that uses React Router to navigate between the grid and detail views
const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12 `;
const Title = tw.h2`text-2xl text-slate-500`;
export default function Gallery() {
    // const [images, setImages] = React.useState([]); // Replace with your images data
    // const [selectedImageId, setSelectedImageId] = React.useState(null);
    //
    // const handleImageClick = (id) => {
    //     setSelectedImageId(id);
    //     // navigate to the detail view
    // };

    return (
        <Wrapper>
            <Skeleton tw="h-8 w-24">
                <Title>Gallery</Title>
            </Skeleton>
            <GalleryComponent>
                <Item
                    width="200"
                    height="150"
                >
                    {({ ref, open }) => (
                        <img ref={ref} onClick={open} src="https://gcph70ngzq52xuxm.public.blob.vercel-storage.com/photo-2A3IpPV2.jpg" alt=''/>
                    )}
                </Item>
                <Item

                    width="200"
                    height="150"
                >
                    {({ ref, open }) => (
                        <img ref={ref} onClick={open} src="https://gcph70ngzq52xuxm.public.blob.vercel-storage.com/photo-4nigjuzZ.jpg" alt=''/>
                    )}
                </Item>
            </GalleryComponent>
        </Wrapper>
    );
}


